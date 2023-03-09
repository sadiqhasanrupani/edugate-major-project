import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { validationResult } from "express-validator";
import { Op, where } from "sequelize";

//* models
import Teacher, { TeacherData } from "../models/teacher";
import JoinClassroom from "../models/joinClassroom";
import { CustomUserModel } from "./student";

//* middleware
import { CustomRequest } from "../middlewares/is-auth";

//* utils
import imagePathFilter from "../utils/helper/imagePathFilter";

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
        as: "adminTeacher"
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

  console.log(classId, "`````````````````````````````");

  JoinClassroom.findAll({
    where: {
      classroom_id: classId,
      admin_teacher_id: null,
      student_id: null
    },
    include: [{
      model: Teacher,
      as: "coTeacher"
    }],
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
