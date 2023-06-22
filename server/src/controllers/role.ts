import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { Model } from "sequelize";

import { CustomRequest } from "../middlewares/is-auth";

export interface CustomModel extends Model {
  isTeacher: Boolean;
  isStudent: Boolean;
}

import Teacher from "../models/teacher";
import Student from "../models/student";

export const getRoleController = async (req: CustomRequest | Req, res: Res) => {
  const id = (req as CustomRequest).userId;

  try {
    Teacher.findOne({ where: { teacher_id: id } })
      .then(async (teacher: any) => {
        if (teacher) {
          const userData: CustomModel = await teacher.getUser();
          if (userData.isTeacher) {
            res.status(200).json({
              message: "Role got successfully.",
              role: "teacher",
            });
          } else {
            res.status(401).json({ message: "Unauthorized access" });
          }
        } else {
          Student.findOne({ where: { student_id: id } })
            .then(async (student: any) => {
              if (student) {
                const userData: CustomModel = await student.getUser();
                if (userData.isStudent) {
                  res.status(200).json({
                    message: "Role got successfully.",
                    role: "student",
                  });
                } else {
                  res.status(401).json({ message: "Unauthorized access" });
                }
              } else {
                res.status(401).json({ message: "Unauthorized access " });
              }
            })
            .catch((err) => {
              res.status(500).json({ error: err });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } catch (err) {
    return (res as Res)
      .status(401)
      .json({ role: "UnAuthorized Request", error: err });
  }
};
