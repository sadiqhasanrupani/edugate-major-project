import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { Model } from "sequelize";
import { v4 as alphaNum } from "uuid";

//* middleware
import { CustomRequest } from "../middlewares/is-auth";

//^ utils
import updateImagePath from "../utils/helper/imagePathFilter";

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
import Student, { StudentField } from "../models/student";
import JoinClassroom from "../models/joinClassroom";

export const postUpdateProfile = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    //^ getting the current user id from the is-auth middleware
    const userId = (req as CustomRequest).userId;

    const { firstName, lastName, dob, phone, email, bio } = await (req as Req)
      .body;

    const image = (req as Req).file;

    const updatedImagePath = updateImagePath(image?.path as string);

    //^ checking whether the id is of student's or not.
    const student: StudentField | unknown = await Student.findOne({
      where: {
        student_id: userId,
      },
    });

    if (!student) {
      return res.status(401).json({ message: "Unauthorized student ID." });
    }

    //^ storing the student data into the studentData constant
    const studentData = student as StudentField;

    //^ updating the student data
    const studentUpdateProfile = await Student.update(
      {
        student_first_name: firstName
          ? firstName
          : studentData.student_first_name,
        student_last_name: lastName ? lastName : studentData.student_last_name,
        student_dob: dob ? dob : studentData.student_dob,
        student_phone_number: phone ? phone : studentData.student_phone_number,
        student_email: email ? email : studentData.student_email,
        student_bio: bio ? bio : studentData.student_bio,
        student_img: updatedImagePath
          ? updatedImagePath
          : studentData.student_img,
      },
      {
        where: {
          student_id: studentData.student_id,
        },
      }
    );

    if (!studentUpdateProfile) {
      return res
        .status(400)
        .json({ message: "Can't able to update the student data." });
    }

    return res.status(200).json({
      message: `${studentData.student_first_name} ${studentData.student_last_name} profile updated successfully`,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

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
