import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { v4 as alphaNum } from "uuid";
import crypto from "crypto";

//* models
import Teacher, { TeacherData as TeacherRecord } from "../models/teacher";
import JoinClassroom, { JoinClassroomData } from "../models/joinClassroom";
import { CustomUserModel } from "./student";
import Invitation from "../models/invite";
import Notification from "../models/notification";

//* middleware
import { CustomRequest } from "../middlewares/is-auth";

//* utils
import imagePathFilter from "../utils/helper/imagePathFilter";
import mailSend from "../utils/mails/mailSend.mail";
import Classroom, { ClassroomData } from "../models/classroom";
import inviteTeacherMail from "../utils/mails/messages/invite-teacher-mail";
import socket from "../utils/helper/socket";

export const getTeacher = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
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
  res: Res,
  next: Next
) => {
  //* body data
  const {
    updatedFirstName,
    updatedLastName,
    updatedDOB,
    updatedPhoneNumber,
    updatedEmailId,
    updatedBio,
  } = req.body;

  //* file data
  const updatedImg = (req as Req).file;
  const updatedImgPath = imagePathFilter(updatedImg?.path.toString() as string);

  //* auth token data.
  const teacherId = (req as CustomRequest).userId;

  //* here we are finding the teacher by using the token userId data.
  Teacher.findOne({
    where: {
      teacher_id: teacherId,
    },
  })
    .then((teacher: TeacherRecord | unknown) => {
      // update's query

      Teacher.update(
        {
          teacher_first_name: updatedFirstName
            ? updatedFirstName
            : (teacher as TeacherRecord).teacher_first_name,
          teacher_last_name: updatedLastName
            ? updatedLastName
            : (teacher as TeacherRecord).teacher_last_name,
          teacher_email: updatedEmailId
            ? updatedEmailId
            : (teacher as TeacherRecord).teacher_email,
          teacher_img: updatedImgPath
            ? updatedImgPath
            : (teacher as TeacherRecord).teacher_img,
          teacher_phone_number: updatedPhoneNumber
            ? updatedPhoneNumber
            : (teacher as TeacherRecord).teacher_phone_number,
          teacher_dob: updatedDOB
            ? updatedDOB
            : (teacher as TeacherRecord).teacher_dob,
          teacher_bio: updatedBio
            ? updatedBio
            : (teacher as TeacherRecord).teacher_bio,
        },
        {
          where: {
            teacher_id: teacherId,
          },
        }
      )
        //* updated the teacher data
        .then((updatedTeacher) => {
          res.status(200).json({
            message: "Teacher data updated successfully",
            updatedTeacher,
          });
        })
        //* error which doing the updating in the teacher data
        .catch((err) => {
          res
            .status(401)
            .json({ message: "Cannot updated the teacher data", error: err });
        });
    })
    .catch((err) => {
      return res.status(401).json({ error: err });
    });
};

export const getAdminTeacher = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
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
    const invitedTeacher: TeacherRecord | unknown = await Teacher.findOne({
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
        teacher_id: (invitedTeacher as TeacherRecord).teacher_id,
        classroom_id: classId,
      },
    });

    if (isJoinedClassroom) {
      return res.status(401).json({
        errorMessage: "Teacher is already joined into your classroom",
      });
    }

    //* getting the admin teacher record from the database
    const adminTeacher: TeacherRecord | unknown = await Teacher.findOne({
      where: {
        teacher_id: userId,
      },
    });

    //! Checking if the invited Mail have the admin email?
    if ((adminTeacher as TeacherRecord).teacher_email === inviteMail) {
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
    const classroom: ClassroomData | unknown = Classroom.findOne({
      attributes: ["classroom_name"],
      where: {
        classroom_id: classId,
      },
    });

    //* Else we will do this,

    //* Creating the expiry date.
    const expireAt = new Date();
    expireAt.setDate(expireAt.getDate() + 1);

    //* Creating a token
    let token;
    crypto.randomBytes(32, (err, buffer) => {
      //! If there is a error while creating the random bytes.
      if (err) {
        return res.status(401).json({ errorMessage: err.message, error: err });
      }

      const GeneratedToken = buffer.toString("hex");
      token = GeneratedToken;
    });

    //* Creating a new Invite record in the database.
    const InviteData = await Invitation.create({
      invite_id: alphaNum(),
      invite_from: (adminTeacher as TeacherRecord).teacher_email,
      invite_to: (invitedTeacher as TeacherRecord).teacher_email,
      invite_status: "pending",
      invite_token: token,
      expire_at: expireAt,
      classroom_id: classId,
      co_teacher_id: (invitedTeacher as TeacherRecord).teacher_id,
      admin_teacher_id: (adminTeacher as TeacherRecord).teacher_id,
    });

    const teacherName: string = `${
      (adminTeacher as TeacherRecord).teacher_first_name
    } ${
      (adminTeacher as TeacherRecord).teacher_last_name &&
      (adminTeacher as TeacherRecord).teacher_last_name
    }`;

    //* Notification Msg
    const NotificationMsg: string = `<h2>${teacherName} invited you to join ${
      (classroom as ClassroomData).classroom_name
    } classroom as a Co-Teacher</h2>`;

    const NotificationData = await Notification.create({
      notification_id: alphaNum(),
      notification_msg: NotificationMsg,
      action: "invitation",
      sender_teacher_id: (adminTeacher as TeacherRecord).teacher_id,
      receiver_teacher_id: (invitedTeacher as TeacherRecord).teacher_id,
    });

    const joinClassroom = await JoinClassroom.create<JoinClassroomData>({
      join_classroom_id: alphaNum(),
      join_request: "pending",
      classroom_id: classId,
      teacher_id: (invitedTeacher as TeacherRecord).teacher_id,
    });

    //* sending the 200 status response
    res.status(200).json({
      message:
        "teacher invited successfully and also joined the class successfully",
    });

    //! socket part ==========================================================
    const io = socket.getIo();

    // io.emit("invitation-received", {
    //   joinClassData,
    //   sender: adminTeacher,
    //   receiver: teacher,
    // });

    //! socket part ==========================================================
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
