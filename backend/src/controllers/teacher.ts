import { Request as Req, Response as Res, NextFunction as Next } from "express";

//* models
import Teacher, { TeacherData } from "../models/teacher";
import JoinClassroom from "../models/joinClassroom";
import { CustomUserModel } from "./student";

//* middleware
import { CustomRequest } from "../middlewares/is-auth";

//* utils
import imagePathFilter from "../utils/helper/imagePathFilter";
import mailSend from "../utils/mails/mailSend.mail";
import Classroom from "../models/classroom";
import inviteTeacherMail from "../utils/mails/messages/invite-teacher-mail";

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
    .then((teacher: TeacherData | unknown) => {
      // update's query

      Teacher.update(
        {
          teacher_first_name: updatedFirstName
            ? updatedFirstName
            : (teacher as TeacherData).teacher_first_name,
          teacher_last_name: updatedLastName
            ? updatedLastName
            : (teacher as TeacherData).teacher_last_name,
          teacher_email: updatedEmailId
            ? updatedEmailId
            : (teacher as TeacherData).teacher_email,
          teacher_img: updatedImgPath
            ? updatedImgPath
            : (teacher as TeacherData).teacher_img,
          teacher_phone_number: updatedPhoneNumber
            ? updatedPhoneNumber
            : (teacher as TeacherData).teacher_phone_number,
          teacher_dob: updatedDOB
            ? updatedDOB
            : (teacher as TeacherData).teacher_dob,
          teacher_bio: updatedBio
            ? updatedBio
            : (teacher as TeacherData).teacher_bio,
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
  const { TeacherEmail } = (req as Req).body;
  const userId = (req as CustomRequest).userId;
  // const classId = (req as Req).params.classId;
  const classId = "d3db0fa1-e585-4589-8ad0-7e20ab520d83";

  //* getting the teacher data.
  try {
    const teacher = await Teacher.findOne({
      where: {
        teacher_email: TeacherEmail,
      },
    });

    //* If teacher doesn't exists
    if (!teacher) {
      return res
        .status(401)
        .json({ errorMessage: "Can't find the teacher email" });
    }

    //* else we do this

    const joinClassData: any = await JoinClassroom.findOne({
      where: {
        admin_teacher_id: userId,
        classroom_id: classId,
      },
      include: [{ model: Teacher, as: "adminTeacher" }, { model: Classroom }],
    });

    if (joinClassData) {
      const inviteMail = await mailSend({
        to: (teacher as TeacherData).teacher_email,
        subject: `Invitation to Join ${joinClassData.classroom.classroom_name} Classroom as a Co-Teacher on Edugate Webapp`,
        htmlMessage: inviteTeacherMail({
          admin_teacher_name: `${joinClassData.adminTeacher.teacher_first_name} ${joinClassData.adminTeacher.teacher_last_name}`,
          classroom_name: joinClassData.classroom.classroom_name,
          teacher_name: `${(teacher as TeacherData).teacher_first_name} ${
            (teacher as TeacherData).teacher_last_name
          }`,
          invite_link: "http://localhost:8080/acceptInvite",
        }),
      });

      res
        .status(200)
        .json({ message: "data got successfully", teacher, joinClassData });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
