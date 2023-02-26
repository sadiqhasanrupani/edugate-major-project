import { Request as Req, Response as Res, NextFunction as Next } from "express";

import User from "../models/user";
import Teacher from "../models/teacher";

import { CustomRequest } from "../middlewares/is-auth";
import { CustomUserModel } from "./student";

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
