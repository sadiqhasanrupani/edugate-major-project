import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { v4 as AlphaNum } from "uuid";
import randNumGenerator from "../utils/number-generator/random-apha-num-generator";
("express-validator");
import { Error, Model, Op } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// interfaces
import { CustomRequest } from "../middlewares/is-auth";

//* model
import Classroom, { ClassroomData } from "../models/classroom";
import Teacher, { TeacherData } from "../models/teacher";
import JoinClassroom, { JoinClassroomData } from "../models/joinClassroom";

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

export const postJoinClassroomAsTeacher = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  const { classCode } = (req as Req).body;
  const userId = (req as CustomRequest).userId;

  Classroom.findOne({
    attributes: ["classroom_code"],
    where: { classroom_code: classCode },
  })
    .then((classroom: any) => {
      JoinClassroom.findOne({
        where: { teacher_id: userId, classroom_id: classroom.classroom_code },
      })
        .then((joinClassroom) => {
          if (joinClassroom) {
            return res.status(401).json({
              errorMessage: "You joined already in the classroom",
            });
          }
          Classroom.findOne({ where: { classroom_code: classCode } }).then(
            (classroom: ClassroomData | unknown) => {
              if (classroom) {
                if ((classroom as ClassroomData).admin_teacher_id === userId) {
                  return res.status(401).json({
                    errorMessage: "Cannot Add the admin into their classroom",
                  });
                } else {
                  JoinClassroom.create({
                    join_classroom_id: AlphaNum(),
                    classroom_id: (classroom as ClassroomData).classroom_id,
                    teacher_id: userId,
                  }).then((joinClassroom: JoinClassroomData | unknown) => {
                    if (joinClassroom) {
                      JoinClassroom.findOne({
                        where: {
                          classroom_id: (classroom as ClassroomData)
                            .classroom_id,
                        },
                        include: [Classroom, Teacher],
                      }).then((joinClassroomData: any) => {
                        Teacher.findOne({
                          where: {
                            teacher_id:
                              joinClassroomData.classroom.admin_teacher_id,
                          },
                        }).then((admin: any) => {
                          const admin_name = admin.teacher_name;
                          const admin_email = admin.teacher_email;
                          const teacher_name =
                            joinClassroomData.teacher.teacher_name;
                          const classroom_name =
                            joinClassroomData.classroom.classroom_name;

                          mailSend({
                            to: admin_email,
                            subject: `${teacher_name} Successfully joined the Classroom`,
                            htmlMessage: JoinClassroomMsg(
                              admin_name,
                              teacher_name,
                              classroom_name
                            ),
                          })
                            .then(() => {
                              res.status(200).json({
                                message: "Teacher join the class successfully",
                              });
                            })
                            .catch((err) => {
                              return res.status(401).json({
                                message: "Cannot send the mail",
                                error: err,
                              });
                            });
                        });
                      });
                    } else {
                      return res
                        .status(401)
                        .json({ errorMessage: "Cannot join the classroom" });
                    }
                  });
                }
              } else {
                res
                  .status(401)
                  .json({ errorMessage: "Cannot find the class codes" });
              }
            }
          );
        })
        .catch((err) => {
          return res
            .status(500)
            .json({ message: "Something went wrong", error: err });
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

export const getJoinedClassesForTeacher = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  const userId = (req as CustomRequest).userId;

  JoinClassroom.findAll({
    where: { teacher_id: userId },
    order: [["createdAt", "ASC"]],
    include: [Teacher, Classroom, Student],
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
    include: [Teacher, Student, Classroom],
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
