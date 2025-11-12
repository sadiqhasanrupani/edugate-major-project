import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { v4 as alphaNum } from "uuid";
import { randomBytes as randomBytesAsync } from "crypto";

//* models
import Teacher, { TeacherData as TeacherField } from "../models/teacher";
import JoinClassroom, { JoinClassroomData } from "../models/joinClassroom";
import { CustomUserModel } from "./student";
import Invitation, { InviteFields } from "../models/invite";
import Notification from "../models/notification";

//* middleware
import { CustomRequest } from "../middlewares/is-auth";

//* utils
import Classroom, { ClassroomData } from "../models/classroom";
import { storageService } from "@app/service/storage.service";
import { getObjectKeyFromUrl } from "@app/contract/storage/utils/minio.util";
import { Transaction } from "sequelize";

export const getTeacher = async (
  req: Req | CustomRequest,
  res: Res,
) => {
  Teacher.findOne({
    where: {
      teacher_id: (req as CustomRequest).userId,
    },
  })
    .then(async (teacher: any) => {
      const userData: CustomUserModel = await teacher.getUser();
      if (userData.isTeacher === true) {
        res.status(200).json({
          message: "Data got successfully",
          teacher,
        });
      } else {
        res.status(401).json("UnAuthorized access");
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "UnAuthorized access", error: err })
    );
};

export const postUpdateProfile = async (
  req: Req | CustomRequest,
  res: Res
) => {
  const {
    updatedFirstName,
    updatedLastName,
    updatedDOB,
    updatedPhoneNumber,
    updatedEmailId,
    updatedBio,
  } = req.body;

  // userId from is-auth middleware (unchanged)
  const userId = (req as CustomRequest).userId;

  // Get storage singleton

  // Fetch teacher (first read)
  let teacherInstance;
  try {
    teacherInstance = await Teacher.findOne({
      where: { teacher_id: userId },
    });
  } catch (err) {
    console.error("DB lookup error:", err);
    return res.status(401).json({ error: err });
  }

  if (!teacherInstance) {
    return res.status(401).json({ message: "Unauthorized Teacher ID." });
  }

  const teacherData = teacherInstance as unknown as TeacherField;

  // The middleware should set req.fileUrl (MinIO URL or placeholder).
  const uploadedUrl = (req as any).fileUrl as string | undefined;
  let updatedImgPath: string = (teacherData.teacher_img as string) || "";

  // Decide whether uploadedUrl represents a **new** image we should persist.
  // Avoid overwriting if middleware only supplied a placeholder.
  const isPlaceholder = uploadedUrl
    ? uploadedUrl.includes("user-placeholder.png") // simple detection
    : false;

  // Only consider uploadedUrl if it exists and is not the placeholder
  const shouldReplaceImage = Boolean(uploadedUrl && !isPlaceholder && uploadedUrl !== teacherData.teacher_img);

  if (shouldReplaceImage) {
    updatedImgPath = uploadedUrl!;
  }

  // Start transaction and perform update using the instance (safer)
  // Use the model's sequelize reference; fallback to Teacher.sequelize if available
  const sequelize = (Teacher as any).sequelize;
  if (!sequelize) {
    console.error("Sequelize instance not available on Teacher model.");
    // fallback: perform non-transactional update (but we prefer transaction)
    try {
      await Teacher.update(
        {
          teacher_first_name: updatedFirstName ? updatedFirstName : teacherData.teacher_first_name,
          teacher_last_name: updatedLastName ? updatedLastName : teacherData.teacher_last_name,
          teacher_email: updatedEmailId ? updatedEmailId : teacherData.teacher_email,
          teacher_img: updatedImgPath ? updatedImgPath : teacherData.teacher_img,
          teacher_phone_number: updatedPhoneNumber ? updatedPhoneNumber : teacherData.teacher_phone_number,
          teacher_dob: updatedDOB ? updatedDOB : teacherData.teacher_dob,
          teacher_bio: updatedBio ? updatedBio : teacherData.teacher_bio,
        },
        {
          where: { teacher_id: userId },
        }
      );

      return res.status(200).json({
        message: "Teacher data updated successfully",
        updatedTeacher: null, // keep shape — original returned the update result; adjust if you want the instance
      });
    } catch (err) {
      console.error("Non-transactional update failed:", err);
      // best-effort cleanup if we uploaded a new file
      if (shouldReplaceImage) {
        try {
          const key = getObjectKeyFromUrl(uploadedUrl!);
          if (key) await storageService.deleteFiles([key]);
        } catch (cleanupErr) {
          console.error("Cleanup failed:", cleanupErr);
        }
      }
      return res.status(401).json({ message: "Cannot updated the teacher data", error: err });
    }
  }

  let transaction: Transaction | null = null;
  let updatedTeacherInstance = null;

  try {
    transaction = await sequelize.transaction() as Transaction;

    // Update the instance inside transaction
    updatedTeacherInstance = await (teacherInstance as any).update(
      {
        teacher_first_name: updatedFirstName ? updatedFirstName : teacherData.teacher_first_name,
        teacher_last_name: updatedLastName ? updatedLastName : teacherData.teacher_last_name,
        teacher_email: updatedEmailId ? updatedEmailId : teacherData.teacher_email,
        teacher_img: updatedImgPath ? updatedImgPath : teacherData.teacher_img,
        teacher_phone_number: updatedPhoneNumber ? updatedPhoneNumber : teacherData.teacher_phone_number,
        teacher_dob: updatedDOB ? updatedDOB : teacherData.teacher_dob,
        teacher_bio: updatedBio ? updatedBio : teacherData.teacher_bio,
      },
      { transaction }
    );

    // commit
    await transaction.commit();

    // Respond with updated data (matches original shape; updatedTeacher may be the instance)
    return res.status(200).json({
      message: "Teacher data updated successfully",
      updatedTeacher: updatedTeacherInstance,
    });
  } catch (err) {
    // rollback safe
    if (transaction) {
      try {
        await transaction.rollback();
      } catch (rbErr) {
        console.error("Transaction rollback failed:", rbErr);
      }
    }

    // If we uploaded a new file that is not the old DB image nor the placeholder, attempt cleanup.
    if (shouldReplaceImage && uploadedUrl) {
      try {
        const key = getObjectKeyFromUrl(uploadedUrl);
        if (key) {
          // StorageService.deleteFiles will try to remove the object(s)
          await storageService.deleteFiles([key]);
        }
      } catch (cleanupErr) {
        console.error("Failed to cleanup uploaded image after DB failure:", cleanupErr);
        // don't override original error; best-effort only
      }
    }

    console.error("DB update failed:", err);
    return res.status(401).json({ message: "Cannot updated the teacher data", error: err });
  }
};

export const getAdminTeacher = async (
  req: Req | CustomRequest,
  res: Res,
) => {
  const classId = (req as Req).params.classId;
  const userId = (req as CustomRequest).userId;

  JoinClassroom.findOne({
    where: {
      classroom_id: classId,
      admin_teacher_id: userId,
    },
    include: [
      {
        model: Teacher,
        as: "adminTeacher",
      },
    ],
  })
    .then((adminJoinClassData) => {
      res
        .status(200)
        .json({ message: "Admin Data got successfully", adminJoinClassData });
    })
    .catch((err) => {
      res
        .status(401)
        .json({ errorMessage: "Cannot find the table", error: err });
    });
};

export const getCoTeachers = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  const classId = (req as Req).params.classId;
  const userId = (req as CustomRequest).userId;

  JoinClassroom.findAll({
    where: {
      classroom_id: classId,
      admin_teacher_id: null,
      student_id: null,
    },
    include: [
      {
        model: Teacher,
        as: "coTeacher",
      },
    ],
    order: [["createdAt", "ASC"]],
  })
    .then((joinClassrooms) => {
      res.status(200).json({
        message: "Join Classroom Data got successfully",
        joinClassrooms,
      });
    })
    .catch((err) => {
      res
        .status(401)
        .json({ errorMessage: "Cannot find the table", error: err });
    });
};

export const postInviteTeacher = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  const { inviteMail, classId } = (req as Req).body;
  const userId = (req as CustomRequest).userId;

  //* getting the teacher data.
  try {
    //* Fetching single field from the Teacher table where the teacher_email is exactly equal to inviteMail.
    const invitedTeacher: TeacherField | unknown = await Teacher.findOne({
      where: {
        teacher_email: inviteMail,
      },
    });

    //! If teacher email doesn't exists then we will give 401 status error.
    if (!invitedTeacher) {
      return res
        .status(401)
        .json({ errorMessage: "Teacher email doesn't exists", invitedTeacher });
    }

    const isInvite = await Invitation.findOne({
      where: {
        invite_to: inviteMail,
        classroom_id: classId,
      },
    });

    if (isInvite) {
      return res
        .status(401)
        .json({ errorMessage: "Teacher is already invited" });
    }

    const isJoinedClassroom = await JoinClassroom.findOne({
      where: {
        teacher_id: (invitedTeacher as TeacherField).teacher_id,
        classroom_id: classId,
      },
    });

    if (isJoinedClassroom) {
      return res.status(401).json({
        errorMessage: "Teacher is already joined into your classroom",
      });
    }

    //* getting the admin teacher record from the database
    const adminTeacher: TeacherField | unknown = await Teacher.findOne({
      where: {
        teacher_id: userId,
      },
    });

    //! Checking if the invited Mail have the admin email?
    if ((adminTeacher as TeacherField).teacher_email === inviteMail) {
      return res
        .status(401)
        .json({ errorMessage: "Can't add the admin into their own classroom" });
    }

    //! If there is no record inside the database related to the given userId.
    if (!adminTeacher) {
      return res
        .status(401)
        .json({ message: `There is no record related to this ${userId} id` });
    }

    //* getting the classroom record from the database
    const classroom: ClassroomData | unknown = await Classroom.findOne({
      // attributes: ["classroom_name"],
      where: {
        classroom_id: classId,
      },
    });

    //* Else we will do this,

    //* Creating the expiry date.
    const expireAt = new Date();
    expireAt.setHours(expireAt.getHours() + 1);

    const teacherName: string = `${(adminTeacher as TeacherField).teacher_first_name
      } ${(adminTeacher as TeacherField).teacher_last_name &&
      (adminTeacher as TeacherField).teacher_last_name
      }`;

    //* request Msg
    const requestMsg: string = `<p><b>${teacherName}</b> invited you to join <b>${(classroom as ClassroomData).classroom_name
      }</b> classroom as a <b>Co-Teacher</b></p>`;

    //* Creating a token
    const tokenBuffer = randomBytesAsync(32);
    const token = tokenBuffer.toString("hex");

    // Creating a new Invite record in the database.
    const inviteData: InviteFields = await Invitation.create({
      invite_id: alphaNum(),
      invite_from: (adminTeacher as TeacherField).teacher_email,
      invite_to: (invitedTeacher as TeacherField).teacher_email,
      invite_msg: requestMsg,
      invite_status: "adminRequest",
      invite_token: token,
      expire_at: expireAt,
      classroom_id: classId,
      invite_to_id: (invitedTeacher as TeacherField).teacher_id,
      invite_from_id: (adminTeacher as TeacherField).teacher_id,
    });

    // Creating a Notification record in the database.
    const notificationData = await Notification.create({
      notification_id: alphaNum(),
      notification_msg: requestMsg,
      action: "invitation",
      sender_teacher_id: (adminTeacher as TeacherField).teacher_id,
      receiver_teacher_id: (invitedTeacher as TeacherField).teacher_id,
      invite_id: inviteData.invite_id,
      expire_at: expireAt,
    });

    // return res.json({ inviteId: invite_id });

    //* Creating a joinClassroom record in the database for temporarily util the invited
    //* teacher doesn't accept the request.
    const joinClassroom = await JoinClassroom.create<JoinClassroomData>({
      join_classroom_id: alphaNum(),
      join_request: false,
      classroom_id: classId,
      teacher_id: (invitedTeacher as TeacherField).teacher_id,
      expire_at: expireAt,
    });

    //* sending the 200 status response
    res.status(200).json({
      message:
        "teacher invited successfully and also joined the class successfully",
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
