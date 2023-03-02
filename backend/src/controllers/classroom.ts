import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { v4 as AlphaNum } from "uuid";
import randNumGenerator from "../utils/number-generator/random-apha-num-generator";
("express-validator");
import dotenv from "dotenv";
dotenv.config();

// interfaces
import { CustomRequest } from "../middlewares/is-auth";

// model
import Classroom from "../models/classroom";
import Teacher, { TeacherData } from "../models/teacher";
import { ClassroomData } from "../models/classroom";
import { Error, Model } from "sequelize";

// utils
import mailSend from "../utils/mails/mailSend.mail";
import classroomCreationMsg from "../utils/mails/messages/classroomCreated";

export interface FilesData {
  classroomBackgroundImg?: any;
  classroomProfileImg?: any;
}

export const postCreateClassroom = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  const { classroomName, classroomCategory } = req.body;

  // retrieving files
  const files: any = (req as Req).files;

  // Grabbing the separate array from the file object
  const classroomBannerImg = files.classroomBackgroundImg;
  const classroomProfileImg = files.classroomProfileImg;

  // Grabbing the path of image for the image file array.
  const classroomBannerImgPath = `${
    process.env.HOST_SITE
  }/${classroomBannerImg[0].path.replace(/\\/g, "/")}`;
  const classroomProfileImgPath = `${
    process.env.HOST_SITE
  }/${classroomProfileImg[0].path.replace(/\\/g, "/")}`;

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
      }).then((teacherData: TeacherData | any) => {
        mailSend({
          to: (teacherData as TeacherData).teacher_email,
          htmlMessage: classroomCreationMsg(
            (classroom as ClassroomData).classroom_name as string,
            teacherData.teacher_name
          ),
          subject: `${
            (classroom as ClassroomData).classroom_name as string
          } created successfully`,
        })
          .then(() => {
            res.status(200).json({
              message: "classroom Created successfully",
              classId: (classroom as ClassroomData).classroom_id,
            });
          })
          .catch((err) => {
            return res.status(401).json({
              message: "Unauthorized access",
              error: err,
            });
          });
      });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Something went wrong", error: err });
    });
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

export const getJoinedClasses = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  const userId = (req as CustomRequest).userId;

  Classroom.findAll({
    where: { co_teacher_id: userId },
    order: [["createdAt", "ASC"]],
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
