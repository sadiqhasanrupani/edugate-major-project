import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { Model, Transaction } from "sequelize";

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

import Student, { StudentField } from "../models/student";
import JoinClassroom from "../models/joinClassroom";
import { getObjectKeyFromUrl } from "@app/contract/storage/utils/minio.util";
import { storageService } from "@app/service/storage.service";

export const postUpdateProfile = async (
  req: Req | CustomRequest,
  res: Res,
) => {
  const userId = (req as CustomRequest).userId;

  // body data (unchanged keys)
  const { firstName, lastName, dob, phone, email, bio } = (req as Req).body;

  try {
    // Check if student exists
    const student = await Student.findOne({
      where: { student_id: userId },
    });

    if (!student) {
      return res.status(401).json({ message: "Unauthorized student ID." });
    }

    const studentData = student as StudentField;

    // Handle image from middleware (MinIO URL from req.fileUrl)
    const uploadedUrl = (req as any).fileUrl as string | undefined;
    let updatedImagePath: string = studentData.student_img as string;

    const isPlaceholder =
      uploadedUrl && uploadedUrl.includes("user-placeholder.png");
    const shouldReplaceImage =
      uploadedUrl &&
      !isPlaceholder &&
      uploadedUrl !== studentData.student_img;

    if (shouldReplaceImage) {
      updatedImagePath = uploadedUrl!;
    }

    // Start transaction
    const sequelize = (Student as any).sequelize;
    if (!sequelize) {
      throw new Error("Sequelize instance not found on Student model");
    }

    await sequelize.transaction(async (transaction: Transaction) => {
      // Perform update
      await Student.update(
        {
          student_first_name: firstName
            ? firstName
            : studentData.student_first_name,
          student_last_name: lastName
            ? lastName
            : studentData.student_last_name,
          student_dob: dob ? dob : studentData.student_dob,
          student_phone_number: phone
            ? phone
            : studentData.student_phone_number,
          student_email: email ? email : studentData.student_email,
          student_bio: bio ? bio : studentData.student_bio,
          student_img: updatedImagePath
            ? updatedImagePath
            : studentData.student_img,
        },
        { where: { student_id: studentData.student_id }, transaction }
      );
    });

    // Success
    return res.status(200).json({
      message: `${studentData.student_first_name} ${studentData.student_last_name} profile updated successfully`,
    });
  } catch (err) {
    // If DB update fails, and a new image was uploaded → cleanup from MinIO
    try {
      const uploadedUrl = (req as any).fileUrl as string | undefined;
      const isPlaceholder =
        uploadedUrl && uploadedUrl.includes("user-placeholder.png");
      if (uploadedUrl && !isPlaceholder) {
        const key = getObjectKeyFromUrl(uploadedUrl);
        if (key) await storageService.deleteFiles([key]);
      }
    } catch (cleanupErr) {
      console.error("Failed to cleanup uploaded file:", cleanupErr);
    }

    console.error("Student update failed:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
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
