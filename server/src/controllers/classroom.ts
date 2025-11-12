import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { v4 as AlphaNum } from "uuid";
import randNumGenerator from "../utils/number-generator/random-apha-num-generator";
("express-validator");
import { Error, Model, Transaction } from "sequelize";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

// interfaces
import { CustomRequest as AuthRequest } from "../middlewares/is-auth";

// sequelize
import sequelize from "../utils/database.config";

//* model
import Classroom, {
  ClassroomData as ClassroomField,
} from "../models/classroom";
import Teacher, {
  TeacherEagerField,
  TeacherData as TeacherField,
} from "../models/teacher";
import JoinClassroom, {
  JoinClassroomData as JoinClassroomField,
  JoinClassroomEagerField,
} from "../models/joinClassroom";
import Invitation, { InviteFields } from "../models/invite";
import Notification from "../models/notification";

// utils
import mailSend from "../utils/mails/mailSend.mail";
import classroomCreationMsg from "../utils/mails/messages/classroomCreated";

//^ models
import Student from "../models/student";
import User from "../models/user";
import Assignment from "../models/assignment";
import Invite from "../models/invite";
import JoinSubject from "../models/joinSubject";
import OptionalSubject from "../models/optionalSubject";
import Quiz from "../models/quiz";
import Subject from "../models/subject";
import SubmittedAssignment from "../models/submitted-assignment";
import SubmittedQuizzes from "../models/submitted-quizzes";
import { config } from "../config/config";
import { getObjectKeyFromUrl } from "@app/contract/storage/utils/minio.util";
import { storageService } from "@app/service/storage.service";

export interface FilesData {
  classroomBackgroundImg?: any;
  classroomProfileImg?: any;
}

/**
 * POST /create-classroom
 * - Uses req.uploadedFiles (set by imageUploader.uploadMany)
 * - Creates classroom + join_classroom inside a transaction
 * - On failure: best-effort cleanup of newly uploaded images
 * - Preserves original request/response fields and messages
 */
export const postCreateClassroom = async (
  req: Req | any,
  res: Res,
) => {
  let transaction: Transaction | null = null;

  // keep original destructuring / body usage
  const classroomName = req.body.classroomName;
  const classroomCategory = req.body.classroomCategory;
  const userId = (req as any).userId;

  // uploadedFiles provided by middleware (or undefined)
  const uploaded = (req as any).uploadedFiles || {};
  // keys used by previous code: classroomBackgroundImg, classroomProfileImg
  const uploadedBanner = uploaded.classroomBackgroundImg as string | undefined;
  const uploadedProfile = uploaded.classroomProfileImg as string | undefined;

  // fallback placeholders same as old behaviour (host-site based)
  const defaultBanner = `${config.get("HOST_SITE")}/images/classroom-banner-img/banner-placeholder.png`;
  const defaultProfile = `${config.get("HOST_SITE")}/images/classroom-profile-img/profile-placeholder.png`;

  // compute final values (if middleware produced placeholder URL, it will be used)
  const classroomBannerImgPath = uploadedBanner ?? defaultBanner;
  const classroomProfileImgPath = uploadedProfile ?? defaultProfile;

  // keep track of which MinIO keys we uploaded in this request (for cleanup on failure)
  const uploadedKeysToCleanup: string[] = [];
  if (uploadedBanner && !uploadedBanner.includes("banner-placeholder.png")) {
    const k = getObjectKeyFromUrl(uploadedBanner);
    if (k) uploadedKeysToCleanup.push(k);
  }
  if (uploadedProfile && !uploadedProfile.includes("profile-placeholder.png")) {
    const k = getObjectKeyFromUrl(uploadedProfile);
    if (k) uploadedKeysToCleanup.push(k);
  }

  try {
    transaction = await sequelize.transaction();

    // validate teacher existence (same as before)
    const teacher: TeacherField | null = (await Teacher.findOne({
      where: { teacher_id: userId },
      transaction,
    })) as TeacherField | null;

    if (!teacher) {
      await transaction.rollback();
      return res.status(400).json({ message: "Unauthorized teacher ID." });
    }

    // create classroom
    const classroom = (await Classroom.create(
      {
        classroom_id: AlphaNum(),
        classroom_code: randNumGenerator(6),
        classroom_name: classroomName,
        classroom_category: classroomCategory,
        classroom_banner_img: classroomBannerImgPath,
        classroom_profile_img: classroomProfileImgPath,
        admin_teacher_id: teacher.teacher_id,
      },
      { transaction }
    )) as unknown as ClassroomField;

    // create join_classroom record
    const joinClassroom = await JoinClassroom.create(
      {
        join_classroom_id: AlphaNum(),
        classroom_id: classroom.classroom_id,
        admin_teacher_id: teacher.teacher_id,
        join_request: true,
      },
      { transaction }
    );

    if (!joinClassroom) {
      await transaction.rollback();
      return res
        .status(400)
        .json({ message: "Can't able to add new field into join_classroom" });
    }

    await transaction.commit();

    // respond (keep original message/shape)
    res.status(200).json({
      message: "classroom Created successfully",
      classId: classroom.classroom_id,
    });

    // fire-and-forget mail (do not block response)
    mailSend({
      to: teacher.teacher_email,
      htmlMessage: classroomCreationMsg(
        classroom.classroom_name as string,
        teacher.teacher_first_name as string
      ),
      subject: `${classroom.classroom_name as string} created successfully`,
    });
  } catch (err) {
    // rollback if transaction started
    if (transaction) {
      try {
        await transaction.rollback();
      } catch (rbErr) {
        console.error("Transaction rollback failed:", rbErr);
      }
    }

    // best-effort cleanup: remove any newly uploaded objects
    if (uploadedKeysToCleanup.length) {
      try {
        await storageService.deleteFiles(uploadedKeysToCleanup);
      } catch (cleanupErr) {
        console.error("Failed to cleanup uploaded images after create failure:", cleanupErr);
      }
    }

    console.error("postCreateClassroom error:", err);
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};

/**
 * POST /update-classroom
 * - Uses req.uploadedFiles (set by imageUploader.uploadMany)
 * - Validates teacher/admin ownership
 * - Performs update in a transaction
 * - On failure: best-effort cleanup of newly uploaded images
 * - Keeps response messages and fields intact
 */
export const postUpdateClassroom = async (req: Req | any, res: Res) => {
  let transaction: Transaction | null = null;

  try {
    const { userId } = req as any;
    const { classroomName, classroomId } = req.body;

    // Uploaded files from middleware (bannerImg, profileImg)
    const uploaded = (req as any).uploadedFiles || {};
    const uploadedBanner = uploaded.bannerImg as string | undefined;
    const uploadedProfile = uploaded.profileImg as string | undefined;

    // Helper to detect placeholder images
    const isPlaceholder = (url?: string) => {
      if (!url) return true;
      return (
        url.includes("banner-placeholder.png") ||
        url.includes("profile-placeholder.png") ||
        url.includes("user-placeholder.png")
      );
    };

    // Track uploaded keys for cleanup if DB fails
    const uploadedKeysToCleanup: string[] = [];
    if (uploadedBanner && !isPlaceholder(uploadedBanner)) {
      const k = getObjectKeyFromUrl(uploadedBanner);
      if (k) uploadedKeysToCleanup.push(k);
    }
    if (uploadedProfile && !isPlaceholder(uploadedProfile)) {
      const k = getObjectKeyFromUrl(uploadedProfile);
      if (k) uploadedKeysToCleanup.push(k);
    }

    transaction = await sequelize.transaction();

    // Step 1: Validate Teacher
    const teacher = await Teacher.findOne({
      where: { teacher_id: userId },
      transaction,
    });
    if (!teacher) {
      await transaction.rollback();
      return res.status(401).json({ message: "Unauthorized Teacher ID." });
    }

    const teacherData = teacher as TeacherField;

    // Step 2: Validate Classroom
    const classroom = await Classroom.findOne({
      where: { classroom_id: classroomId },
      transaction,
    });
    if (!classroom) {
      await transaction.rollback();
      return res.status(401).json({ message: "Unauthorized classroom ID." });
    }

    // Step 3: Verify Admin Ownership
    const adminTeacherClassroom = await Classroom.findOne({
      where: {
        classroom_id: classroomId,
        admin_teacher_id: teacherData.teacher_id,
      },
      transaction,
    });
    if (!adminTeacherClassroom) {
      await transaction.rollback();
      return res
        .status(403)
        .json({ message: "Only Admin can update the classroom." });
    }

    const adminTeacherClassroomData = adminTeacherClassroom as ClassroomField;

    // Step 4: Compute final image paths
    const currentBanner = adminTeacherClassroomData.classroom_banner_img as string;
    const currentProfile = adminTeacherClassroomData.classroom_profile_img as string;

    // Only replace image if a non-placeholder upload exists
    const bannerPath =
      uploadedBanner && !isPlaceholder(uploadedBanner)
        ? uploadedBanner
        : currentBanner;

    const profilePath =
      uploadedProfile && !isPlaceholder(uploadedProfile)
        ? uploadedProfile
        : currentProfile;

    // Step 5: Update Classroom
    await Classroom.update(
      {
        classroom_name:
          classroomName || adminTeacherClassroomData.classroom_name,
        classroom_banner_img: bannerPath,
        classroom_profile_img: profilePath,
      },
      {
        where: { classroom_id: adminTeacherClassroomData.classroom_id },
        transaction,
      }
    );

    await transaction.commit();

    return res.status(200).json({
      message: "Classroom updated successfully.",
    });
  } catch (err) {
    if (transaction) {
      try {
        await transaction.rollback();
      } catch (rbErr) {
        console.error("Transaction rollback failed:", rbErr);
      }
    }

    // Cleanup newly uploaded files on failure
    try {
      const uploaded = (req as any).uploadedFiles || {};
      const uploadedBanner = uploaded.bannerImg as string | undefined;
      const uploadedProfile = uploaded.profileImg as string | undefined;

      const keysToCleanup: string[] = [];
      const isPlaceholder = (url?: string) =>
        !!url &&
        (url.includes("banner-placeholder.png") ||
          url.includes("profile-placeholder.png") ||
          url.includes("user-placeholder.png"));

      if (uploadedBanner && !isPlaceholder(uploadedBanner)) {
        const k = getObjectKeyFromUrl(uploadedBanner);
        if (k) keysToCleanup.push(k);
      }
      if (uploadedProfile && !isPlaceholder(uploadedProfile)) {
        const k = getObjectKeyFromUrl(uploadedProfile);
        if (k) keysToCleanup.push(k);
      }

      if (keysToCleanup.length) {
        await storageService.deleteFiles(keysToCleanup);
      }
    } catch (cleanupErr) {
      console.error(
        "Failed to cleanup uploaded images after update failure:",
        cleanupErr
      );
    }

    console.error("postUpdateClassroom error:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};

/**
 * POST /remove-classroom
 *
 * - Validates teacher and admin privileges
 * - Deletes classroom and related records inside a transaction
 * - After successful commit, attempts best-effort cleanup of classroom images from MinIO
 * - Preserves original request/response shapes and messages
 */
export const postRemoveClassroom = async (req: Req | any, res: Res) => {
  let transaction: Transaction | null = null;

  try {
    const { userId } = req as any;
    const { classroomId } = (req as Req).body;

    // start transaction early
    transaction = await sequelize.transaction();

    // verify teacher existence
    const teacher = await Teacher.findOne({
      attributes: ["teacher_id"],
      where: { teacher_id: userId },
      transaction,
    });

    if (!teacher) {
      await transaction.rollback();
      return res.status(401).json({ message: "Unauthorized Teacher ID." });
    }

    const teacherData = teacher as TeacherField;

    // verify classroom existence
    const classroom = await Classroom.findOne({
      attributes: ["classroom_id", "classroom_name", "classroom_banner_img", "classroom_profile_img"],
      where: { classroom_id: classroomId },
      transaction,
    });

    if (!classroom) {
      await transaction.rollback();
      return res.status(401).json({ message: "Unauthorized classroom ID." });
    }

    const classroomData = classroom as ClassroomField;

    // verify admin ownership
    const adminTeacherClassroom = await Classroom.findOne({
      where: {
        classroom_id: classroomData.classroom_id,
        admin_teacher_id: teacherData.teacher_id,
      },
      transaction,
    });

    if (!adminTeacherClassroom) {
      await transaction.rollback();
      return res.status(401).json({
        message: `Only Admin can delete this ${classroomData.classroom_id} classroom.`,
      });
    }

    const adminTeacherClassroomData = adminTeacherClassroom as ClassroomField;

    // Keep list of storage keys to cleanup AFTER successful DB commit.
    // Only include classroom's banner/profile images here; extend later if needed.
    const storageKeysToCleanup: string[] = [];

    // If classroom has banner/profile images that are not placeholders, collect keys.
    // We treat placeholders as local host-site placeholders (as in original code).
    const bannerImg = adminTeacherClassroomData.classroom_banner_img as string | undefined;
    const profileImg = adminTeacherClassroomData.classroom_profile_img as string | undefined;

    // Use same placeholder detection as previous code (host-based paths)
    const siteHost = config.get("HOST_SITE") as string;
    const bannerPlaceholder = `${siteHost}/images/classroom-banner-img/banner-placeholder.png`;
    const profilePlaceholder = `${siteHost}/images/classroom-profile-img/profile-placeholder.png`;

    if (bannerImg && bannerImg !== bannerPlaceholder) {
      const key = getObjectKeyFromUrl(bannerImg);
      if (key) storageKeysToCleanup.push(key);
    }

    if (profileImg && profileImg !== profilePlaceholder) {
      const key = getObjectKeyFromUrl(profileImg);
      if (key) storageKeysToCleanup.push(key);
    }

    // -------------------------
    // Perform deletions (all within the same transaction)
    // -------------------------
    // The order follows dependency: submitted items -> items -> joins -> classroom
    // Each destroy uses force: true as in your original code and passes the transaction.

    await SubmittedQuizzes.destroy({
      where: { classroom_id: adminTeacherClassroomData.classroom_id },
      force: true,
      transaction,
    });

    await Quiz.destroy({
      where: { classroom_id: adminTeacherClassroomData.classroom_id },
      force: true,
      transaction,
    });

    await SubmittedAssignment.destroy({
      where: { classroom_id: adminTeacherClassroomData.classroom_id },
      force: true,
      transaction,
    });

    await Assignment.destroy({
      where: { classroom_id: adminTeacherClassroomData.classroom_id },
      force: true,
      transaction,
    });

    await JoinSubject.destroy({
      where: { classroom_id: adminTeacherClassroomData.classroom_id },
      force: true,
      transaction,
    });

    await Subject.destroy({
      where: { class_id: adminTeacherClassroomData.classroom_id },
      force: true,
      transaction,
    });

    await OptionalSubject.destroy({
      where: { classroom_id: adminTeacherClassroomData.classroom_id },
      force: true,
      transaction,
    });

    await Invite.destroy({
      where: { classroom_id: adminTeacherClassroomData.classroom_id },
      force: true,
      transaction,
    });

    await JoinClassroom.destroy({
      where: { classroom_id: adminTeacherClassroomData.classroom_id },
      force: true,
      transaction,
    });

    await Classroom.destroy({
      where: { classroom_id: adminTeacherClassroomData.classroom_id },
      force: true,
      transaction,
    });

    // commit the transaction before touching external storage
    await transaction.commit();
    transaction = null;

    // After successful commit: best-effort cleanup of object storage
    if (storageKeysToCleanup.length) {
      try {
        const { deleted, failed } = await storageService.deleteFiles(storageKeysToCleanup);
        if (failed.length) {
          // log failed deletions - not failing the API response
          console.error("Some classroom storage keys failed to delete:", failed);
        }
        // optionally log deleted keys
        console.log("Deleted classroom storage keys:", deleted);
      } catch (storageErr) {
        // log but do not fail response
        console.error("Failed to cleanup classroom images from storage:", storageErr);
      }
    }

    return res.status(200).json({
      message: `${adminTeacherClassroomData.classroom_name} Classroom and related data have been destroyed successfully.`,
    });
  } catch (e) {
    // rollback if transaction still open
    if (transaction) {
      try {
        await transaction.rollback();
      } catch (rbErr) {
        console.error("Transaction rollback failed:", rbErr);
      }
    }

    console.error("postRemoveClassroom error:", e);
    return res.status(500).json({ message: "Something went wrong", error: e });
  }
};

//* controller for to join a class as a teacher.
export const postJoinClassroomAsTeacher = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next,
) => {
  /*
    TODO: Check that the joining teacher is student of the respected classroom or not.
  */

  const { classCode } = (req as Req).body;
  const teacherId = (req as AuthRequest).userId;

  try {
    //^ Getting the classroom_id
    const classroom: ClassroomField | unknown = await Classroom.findOne({
      where: { classroom_code: classCode },
    });

    if (!classroom) {
      return res.status(403).json({
        errorMessage: "Can't find the classroom code in the database.",
      });
    }

    //* classroom Id
    const classroomId = (classroom as ClassroomField).classroom_id;

    const joinClassroom: JoinClassroomField | unknown =
      await JoinClassroom.findOne({
        where: {
          teacher_id: teacherId,
          classroom_id: classroomId,
        },
      });

    //* Checking if the teacher already joined the classroom or not.
    if (joinClassroom) {
      if ((joinClassroom as JoinClassroomField).join_request === true) {
        return res
          .status(403)
          .json({ errorMessage: "You already joined the classroom" });
      }
    }

    //* Checking if the admin_teacher is joining his/her classroom or not.
    if ((classroom as ClassroomField).admin_teacher_id === teacherId) {
      return res.status(403).json({
        errorMessage: "Can't add the admin into their classroom",
      });
    }

    //^ Finding the teacher's user-id according to it's id.
    const teacher: TeacherField | unknown = await Teacher.findOne({
      where: {
        teacher_id: teacherId,
      },
      include: [{ model: User }],
    });

    if (!teacher) {
      return res.status(401).json({ message: "Unauthorized teacher" });
    }
    const teacherData = teacher as TeacherEagerField;
    const teacherUserId = teacherData.user.userId;

    /*
      ^ Checking that if there is a userId in student field where the teacher selected
      ^ teacher user id match or not. 
    */

    //^ First getting all the students which is inside in the join classroom.

    const getAllStudents: Array<JoinClassroomEagerField> | unknown =
      await JoinClassroom.findAll({
        attributes: ["join_classroom_id"],
        where: {
          admin_teacher_id: null,
          teacher_id: null,
          classroom_id: classroomId,
        },
        include: [
          {
            model: Student,
            attributes: [
              "student_first_name",
              "student_last_name",
              "student_id",
              "user_id",
            ],
          },
        ],
      });

    //^ getting the student data where the co_teacher user id matched to the student's userId.
    const getStudents = getAllStudents as Array<JoinClassroomEagerField>;

    getStudents.filter((getStudent) => {
      if (teacherUserId === getStudent.student?.user_id) {
        return getStudent;
      }
    });

    if (getStudents[0]) {
      if (teacherUserId === getStudents[0].student?.user_id) {
        console.log(`\n ${getStudents[0].student?.user_id}\n`);
        return res.status(401).json({
          errorMessage:
            "Unable to join classroom bcz you are already join this classroom as student",
        });
      }
    }

    //^ If the join Id is already exists in the record but the join_request is false, then this condition will run
    try {
      if (
        (joinClassroom as JoinClassroomField).join_request === false &&
        (joinClassroom as JoinClassroomField).teacher_id === teacherId
      ) {
        const updatedJoinClass: JoinClassroomField | unknown =
          await JoinClassroom.update(
            {
              join_request: true,
            },
            {
              where: {
                teacher_id: teacherId,
              },
            },
          );
        if (updatedJoinClass) {
          return res
            .status(200)
            .json({ message: "join request is updated successfully." });
        }
      }
    } catch (err) {
      console.log(`\n ${err} \n`);
    }

    //^ ExpireAt logic.
    const expireAt = new Date();
    expireAt.setHours(expireAt.getHours() + 1);

    //^ Creating a joinClassroom record here
    const createJoinClassroom = await JoinClassroom.create({
      join_classroom_id: AlphaNum(),
      join_request: false,
      classroom_id: classroomId,
      teacher_id: teacherId,
      expire_at: expireAt,
    });

    /*
      ^ sending the join request to the admin of the classroom_id,
      * for that first we need to find the admin_teacher from the join classroom record.
    */

    interface AdminTeacherRecord extends Model {
      admin_teacher_id: string;
      adminTeacher: {
        teacher_first_name?: string;
        teacher_last_name?: string;
        teacher_email?: string;
        createdAt?: string;
        updatedAt?: string;
        user_id?: string;
      };
    }

    //* Getting the adminTeacherData using eager loading.
    const adminTeacherData: AdminTeacherRecord | unknown =
      await JoinClassroom.findOne({
        attributes: ["admin_teacher_id"],
        where: {
          classroom_id: classroomId,
          teacher_id: null,
          student_id: null,
        },
        include: [
          {
            model: Teacher,
            as: "adminTeacher",
            attributes: {
              exclude: [
                "teacher_id",
                "teacher_img",
                "teacher_phone_number",
                "teacher_dob",
                "teacher_bio",
              ],
            },
          },
        ],
      });

    //^ Storing the adminTeacherData into adminTeacher for simplicity.
    const adminTeacher = adminTeacherData as AdminTeacherRecord;

    //? Getting the teacher Data.

    try {
      const teacherRecord: TeacherField | unknown = await Teacher.findOne({
        attributes: [
          "teacher_id",
          "teacher_email",
          "teacher_first_name",
          "teacher_last_name",
        ],
        where: {
          teacher_id: teacherId,
        },
      });

      const teacherName: string = `${(teacherRecord as TeacherField).teacher_first_name
        } ${(teacherRecord as TeacherField).teacher_last_name}`;

      //* request message
      const requestMessage = `<p><b>${teacherName}</b> send a request to join <b>${(classroom as ClassroomField).classroom_name
        }</b> classroom as a <b>Co-Teacher</b></p>`;

      crypto.randomBytes(32, async (err, buffer) => {
        if (err) {
          return res.status(500).json({ message: err.message, error: err });
        }
        const generatedToken: string = buffer.toString("hex");

        const inviteData: InviteFields = await Invitation.create({
          invite_id: AlphaNum(),
          invite_to: adminTeacher.adminTeacher.teacher_email,
          invite_from: (teacherRecord as TeacherField).teacher_email,
          invite_msg: requestMessage,
          invite_status: "joinRequest",
          invite_token: generatedToken,
          expire_at: expireAt,
          classroom_id: classroomId,
          invite_to_id: adminTeacher.admin_teacher_id,
          invite_from_id: (teacherRecord as TeacherField).teacher_id,
        });

        const notification = await Notification.create({
          notification_id: AlphaNum(),
          notification_msg: requestMessage,
          action: "joinRequest",
          sender_teacher_id: (teacherRecord as TeacherField).teacher_id,
          receiver_teacher_id: adminTeacher.admin_teacher_id,
          invite_id: inviteData.invite_id,
          expire_at: expireAt,
        });
      });

      res.status(200).json({
        message: "user join request sended to the owner successfully.",
        joinClassroom: createJoinClassroom,
      });
    } catch (err) {
      console.log(`\n ${err} \n`);
    }
  } catch (err) {
    res.status(500).json({ errorMessage: "Internal Server error", error: err });
  }
};

export const getClassroom = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next,
) => {
  const classId = (req as Req).params.classId;

  try {
    //^ Checking if the classroom id really exists in the classroom record.
    const classroom: ClassroomField | unknown = await Classroom.findOne({
      where: {
        classroom_id: classId,
      },
    });

    if (!classroom) {
      return res.status(401).json({ message: "Unauthorized classroom id." });
    }

    //^ If all right then will insert the data of classroom inside the classroomData constant
    const classroomData = classroom as ClassroomField;

    return res.status(200).json({
      message: "Successfully got the classroom data.",
      classroomData,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

export const getAdminClasses = async (req: Req | AuthRequest, res: Res) => {
  const admin_id = (req as AuthRequest).userId;

  try {
    const getClassrooms = await Classroom.findAll({
      where: { admin_teacher_id: admin_id },
      order: [["createdAt", "ASC"]],
    });

    if (getClassrooms) {
      res
        .status(200)
        .json({ message: "Classrooms got successfully.", getClassrooms });
    } else {
      res.status(401).json({ message: "Unauthorized access" });
    }
  } catch (err: Error | any) {
    res
      .status(500)
      .json({ message: "Something went wrongs", error: err as Error });
  }
};

export const getJoinedClassesForTeacher = async (
  req: Req | AuthRequest,
  res: Res,
) => {
  const userId = (req as AuthRequest).userId;

  `SELECT classroom_name from join_classrooms 
      INNER JOIN classrooms 
      WHERE classrooms.classroom_id = join_classrooms.classroom_id 
      AND join_classrooms.teacher_id = '9f29caa6-2f9e-4526-a71b-feb037cf6016'
      AND join_classrooms.join_request = 1;`;


  JoinClassroom.findAll({
    where: { teacher_id: userId, join_request: true },
    order: [["createdAt", "ASC"]],
    include: [
      {
        model: Teacher,
        as: "coTeacher",
      },
      {
        model: Teacher,
        as: "adminTeacher",
      },
      {
        model: Student,
      },
      { model: Classroom },
    ],
  })
    .then((classrooms: ClassroomField | any) => {
      if (classrooms) {
        res.status(200).json({
          message: "Classes got successfully.",
          joinedClassrooms: classrooms,
        });
      } else {
        res.status(401).json({ message: "Cannot find the Data" });
      }
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Something went wrong", error: err });
    });
};

export const getJoinClassroomForTeacher = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next,
) => {
  const teacherId = (req as AuthRequest).userId;
  const joinClassroomId = (req as Req).params.joinClassroomId;

  JoinClassroom.findOne({
    where: {
      join_classroom_id: joinClassroomId,
      teacher_id: teacherId,
    },
    include: [
      { model: Teacher, as: "coTeacher" },
      { model: Student },
      { model: Classroom },
    ],
  })
    .then((joinClassroomData: any) => {
      res.status(200).json({ joinClassroomData });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Something went wrong", error: err });
    });
};

export const getJoinedClassroomTeachers = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next,
) => {
  const classId = (req as Req).query.classId;
  const userId = (req as AuthRequest).userId;

  JoinClassroom.findAndCountAll({
    where: {
      classroom_id: classId,
      join_request: true,
    },
    order: [["createdAt", "ASC"]],
    include: [
      {
        model: Teacher,
        as: "coTeacher",
      },
    ],
  })
    .then((TeacherJoinClassroomData) => {
      res.status(200).json({ TeacherJoinClassroomData });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Something went wrong", error: err });
    });
};

export const getJoinClassroomStudents = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next,
) => {
  const classId = (req as Req).query.classId;

  JoinClassroom.findAndCountAll({
    attributes: ["join_classroom_id", "student_id"],
    where: {
      join_request: true,
      classroom_id: classId,
    },
    order: [["createdAt", "ASC"]],
    include: [
      {
        model: Student,
        attributes: ["student_img"],
      },
    ],
  })
    .then((studentsData) => {
      res.status(200).json({ studentsData });
    })
    .catch();
};

export const getClassrooms = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next,
) => {
  try {
    //^ getting the current user
    const { userId } = req as AuthRequest;

    //^ checking that the current user is teacher or not.
    const teacher: TeacherField | unknown = await Teacher.findOne({
      where: { teacher_id: userId },
    });

    if (!teacher) {
      return res.status(401).json({ message: "Unauthorized teacher ID." });
    }

    const teacherData = teacher as TeacherField;

    //^ getting all the current teacher's created classrooms
    const createdClassrooms: Array<ClassroomField> | Array<unknown> =
      await Classroom.findAll({
        where: {
          admin_teacher_id: teacherData.teacher_id,
        },
        order: [["createdAt", "ASC"]],
      });

    const createdClassroomData = createdClassrooms as Array<ClassroomField>;

    //^ getting all the current teacher's joined classrooms
    const joinedClassrooms: Array<JoinClassroomEagerField> | Array<unknown> =
      await JoinClassroom.findAll({
        where: {
          teacher_id: teacherData.teacher_id,
        },
        include: [{ model: Classroom }],
        order: [["createdAt", "ASC"]],
      });

    const joinedClassroomData =
      joinedClassrooms as Array<JoinClassroomEagerField>;

    return res.status(200).json({
      createdClassroom: createdClassroomData,
      joinedClassroom: joinedClassroomData,
      // classroomsByMonth
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const getClassroomTeacherStudents = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next,
) => {
  try {
    const { classroomId } = (req as Req).params;
    const { userId } = req as AuthRequest;

    //^ checking the current user is teacher
    const teacher: TeacherField | unknown = await Teacher.findOne({
      where: {
        teacher_id: userId,
      },
    });

    if (!teacher) {
      const student = await Student.findOne({
        where: {
          student_id: userId,
        },
      });

      if (!student) {
        return res.status(401).json({ message: "Unauthorized user ID." });
      }
    }

    const teacherData = teacher as TeacherField;

    //^ checking that the received classroom id exists in the record or not.
    const classroom: ClassroomField | unknown = await Classroom.findOne({
      where: {
        classroom_id: classroomId,
      },
    });

    if (!classroom) {
      return res.status(401).json({ message: "Unauthorized classroom ID." });
    }

    const classroomData = classroom as ClassroomField;

    //^ getting all the teacher's data which is joined to the current classroom.
    const teachersClassData: Array<JoinClassroomEagerField> | Array<unknown> =
      await JoinClassroom.findAll({
        where: {
          classroom_id: classroomId,
          student_id: null,
          admin_teacher_id: null,
          join_request: true,
        },
        include: [{ model: Teacher, as: "coTeacher" }, { model: Classroom }],
        order: [["createdAt", "ASC"]],
      });

    const teachersData = teachersClassData as Array<JoinClassroomEagerField>;

    //^ getting all the student's data which is joined to the current classroom.
    const studentsClassData: Array<JoinClassroomEagerField> | Array<unknown> =
      await JoinClassroom.findAll({
        where: {
          classroom_id: classroomId,
          teacher_id: null,
          admin_teacher_id: null,
          join_request: true,
        },
        include: [{ model: Student }, { model: Classroom }],
        order: [["createdAt", "ASC"]],
      });

    const studentsData = studentsClassData as Array<JoinClassroomEagerField>;

    return res.status(200).json({
      teachersJoinClass: teachersData,
      studentsJoinClass: studentsData,
      classroom: classroomData,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};
