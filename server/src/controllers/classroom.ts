import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { v4 as AlphaNum } from "uuid";
import randNumGenerator from "../utils/number-generator/random-apha-num-generator";
("express-validator");
import { Error, Model, Op } from "sequelize";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

// interfaces
import { CustomRequest } from "../middlewares/is-auth";

//* model
import Classroom, { ClassroomData } from "../models/classroom";
import Teacher, { TeacherData } from "../models/teacher";
import JoinClassroom, { JoinClassroomData } from "../models/joinClassroom";
import Invitation from "../models/invite";
import Notification, { NotificationFields } from "../models/notification";

// utils
import mailSend from "../utils/mails/mailSend.mail";
import classroomCreationMsg from "../utils/mails/messages/classroomCreated";
import JoinClassroomMsg from "../utils/mails/messages/join-classroom-message";
import Student from "../models/student";

export interface FilesData {
  classroomBackgroundImg?: any;
  classroomProfileImg?: any;
}

export const postCreateClassroom = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    const classroomName = req.body.classroomName;
    const classroomCategory = req.body.classroomCategory;

    // retrieving files
    const files: any = (req as Req).files;

    // Grabbing the separate array from the file object
    const classroomBannerImg = files.classroomBackgroundImg;
    const classroomProfileImg = files.classroomProfileImg;

    // Grabbing the path of image for the image file array.

    const classroomBannerImgPath = `${process.env.HOST_SITE}/images/classroom-banner-img/${classroomBannerImg[0].filename}`;

    const classroomProfileImgPath = `${process.env.HOST_SITE}/images/classroom-profile-img/${classroomProfileImg[0].filename}`;

    // const classroomBannerImgPath = `${
    //   process.env.HOST_SITE
    // }/${classroomBannerImg[0].path.replace(/\\/g, "/")}`;
    // const classroomProfileImgPath = `${
    //   process.env.HOST_SITE
    // }/${classroomProfileImg[0].path.replace(/\\/g, "/")}`;

    // random code
    const code: string = randNumGenerator(6);

    Classroom.create({
      classroom_id: AlphaNum(),
      classroom_code: code,
      classroom_name: classroomName,
      classroom_category: classroomCategory,
      classroom_banner_img: classroomBannerImgPath,
      classroom_profile_img: classroomProfileImgPath,
      admin_teacher_id: (req as CustomRequest).userId,
    })
      .then((classroom: ClassroomData) => {
        Teacher.findOne({
          where: { teacher_id: classroom.admin_teacher_id },
        }).then(async (teacherData: TeacherData | any) => {
          try {
            const joinClassroom = await JoinClassroom.create({
              join_classroom_id: AlphaNum(),
              classroom_id: (classroom as ClassroomData).classroom_id,
              admin_teacher_id: (classroom as ClassroomData).admin_teacher_id,
              join_request: true,
            });

            if (joinClassroom) {
              res.status(200).json({
                message: "classroom Created successfully",
                classId: (classroom as ClassroomData).classroom_id,
              });
            }

            mailSend({
              to: (teacherData as TeacherData).teacher_email,
              htmlMessage: classroomCreationMsg(
                (classroom as ClassroomData).classroom_name as string,
                (teacherData as TeacherData).teacher_first_name as string
              ),
              subject: `${
                (classroom as ClassroomData).classroom_name as string
              } created successfully`,
            })
              .then(() => {
                console.log("Mail message sended for creation of classroom");
              })
              .catch((err) => {
                return res.status(401).json({
                  message: "Unauthorized access",
                  error: err,
                });
              });
          } catch (err) {
            return res.status(400).json({ error: err });
          }
        });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ message: "Something went wrong", error: err });
      });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

//* controller for to join a class as a teacher.
export const postJoinClassroomAsTeacher = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  const { classCode } = (req as Req).body;
  const userId = (req as CustomRequest).userId;

  try {
    //^ Getting the classroom_id
    const classroom: ClassroomData | unknown = await Classroom.findOne({
      where: { classroom_code: classCode },
    });

    if (!classroom) {
      return res.status(403).json({
        errorMessage: "Can't find the classroom code in the database.",
      });
    }

    //* classroom Id
    const classroomId = (classroom as ClassroomData).classroom_id;

    const joinClassroom: JoinClassroomData | unknown =
      await JoinClassroom.findOne({
        where: {
          teacher_id: userId,
          classroom_id: classroomId,
        },
      });

    //* Checking if the teacher already joined the classroom or not.
    if (joinClassroom) {
      if ((joinClassroom as JoinClassroomData).join_request === true) {
        return res
          .status(403)
          .json({ errorMessage: "You already joined the classroom" });
      }
    }

    //* Checking if the admin_teacher is joining his/her classroom or not.
    if ((classroom as ClassroomData).admin_teacher_id === userId) {
      return res.status(403).json({
        errorMessage: "Can't add the admin into their classroom",
      });
    }

    //^ If the join Id is already exists in the record but the join_request is false, then this condition will run
    try {
      if (
        (joinClassroom as JoinClassroomData).join_request === false &&
        (joinClassroom as JoinClassroomData).teacher_id === userId
      ) {
        const updatedJoinClass: JoinClassroomData | unknown =
          await JoinClassroom.update(
            {
              join_request: true,
            },
            {
              where: {
                teacher_id: userId,
              },
            }
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
      teacher_id: userId,
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
      const teacherRecord: TeacherData | unknown = await Teacher.findOne({
        attributes: [
          "teacher_id",
          "teacher_email",
          "teacher_first_name",
          "teacher_last_name",
        ],
        where: {
          teacher_id: userId,
        },
      });

      const teacherName: string = `${
        (teacherRecord as TeacherData).teacher_first_name
      } ${(teacherRecord as TeacherData).teacher_last_name}`;

      //* request message
      const requestMessage = `<p><b>${teacherName}</b> send a request to join <b>${
        (classroom as ClassroomData).classroom_name
      }</b> classroom as a <b>Co-Teacher</b></p>`;

      crypto.randomBytes(32, async (err, buffer) => {
        if (err) {
          return res.status(500).json({ message: err.message, error: err });
        }
        const generatedToken: string = buffer.toString("hex");

        const inviteData = await Invitation.create({
          invite_id: AlphaNum(),
          invite_to: adminTeacher.adminTeacher.teacher_email,
          invite_from: (teacherRecord as TeacherData).teacher_email,
          invite_msg: requestMessage,
          invite_status: "joinRequest",
          invite_token: generatedToken,
          expire_at: expireAt,
          classroom_id: classroomId,
          invite_to_id: adminTeacher.admin_teacher_id,
          invite_from_id: (teacherRecord as TeacherData).teacher_id,
        });
      });

      const notification = await Notification.create({
        notification_id: AlphaNum(),
        notification_msg: requestMessage,
        action: "joinRequest",
        sender_teacher_id: (teacherRecord as TeacherData).teacher_id,
        receiver_teacher_id: adminTeacher.admin_teacher_id,
        expire_at: expireAt,
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
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  const classId = (req as Req).params.classId;

  try {
    const classroomData: ClassroomData | Model | unknown =
      await Classroom.findOne({ where: { classroom_id: classId } });

    if (
      (classroomData as ClassroomData).admin_teacher_id ===
      (req as CustomRequest).userId
    ) {
      res.status(200).json({
        message: "Successfully got the classroom data.",
        classroomData,
      });
    } else {
      res.status(401).json({
        message: "Unauthorized access",
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

export const getAdminClasses = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  const admin_id = (req as CustomRequest).userId;

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
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  const userId = (req as CustomRequest).userId;

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
    .then((classrooms: ClassroomData | any) => {
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
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  const teacherId = (req as CustomRequest).userId;
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
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  const classId = (req as Req).query.classId;
  const userId = (req as CustomRequest).userId;

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
  req: Req | CustomRequest,
  res: Res,
  next: Next
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
