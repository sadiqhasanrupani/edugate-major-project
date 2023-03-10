import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { Model } from "sequelize";
import { v4 as alphaNum } from "uuid";

//* middleware
import { CustomRequest } from "../middlewares/is-auth";

export interface CustomUserModel extends Model {
  userId?: string;
  userName?: string;
  userImg?: string;
  userEmail?: string;
  userPhoneNumber?: string;
  userDOB?: Date;
  isTeacher?: boolean;
  isStudent?: boolean;
}

export interface CustomStudentModel extends Model {
  student_id?: string;
  student_name?: string;
  student_email?: string;
  student_img?: string;
  student_phone_number?: string;
  student_dob?: Date;
  getUser?: Function;
}

import User from "../models/user";
import Student from "../models/student";
import JoinClassroom from "../models/joinClassroom";

export const getStudent = (req: Req | CustomRequest, res: Res, next: Next) => {
  Student.findOne({
    where: {
      student_id: (req as CustomRequest).userId,
    },
  })
    .then(async (student: any) => {
      const userData: CustomUserModel = await student.getUser();
      if (userData.isStudent === true) {
        res.status(200).json({
          message: "Data got successfully",
          student,
        });
      } else {
        res.status(401).json("UnAuthorized access");
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "UnAuthorized access", error: err })
    );
};

export const getJoinedStudents = (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  const classId = (req as Req).params.classId;
  const studentId = (req as CustomRequest).userId;

  // console.log(classId, "./..,df.sfd.....................****************");

  JoinClassroom.findAll({
    where: {
      classroom_id: classId,
      admin_teacher_id: null,
      teacher_id: null,
    },
    include: {
      model: Student,
    },
  })
    .then((joinClassData) => {
      res.status(200).json({ joinClassData });
    })
    .catch((err) => {
      res.status(401).json({ error: err });
    });
};
