import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { Model } from "sequelize";

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

import User from "../models/user";

export const getStudent = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  const user: CustomUserModel | unknown = await User.findOne<CustomUserModel>({
    attributes: {
      exclude: ["userPassword"]
    },
    where: { userId: (req as CustomRequest).userId },
  });

  try {
    if ((user as CustomUserModel).isStudent === true) {
      res.status(200).json({ message: "Date got successfully.", user });
    } else {
      res.status(401).json({ message: "Not Authorized" })
    }
  } catch (err) {
    res.status(401).json({ error: err });
  }
};
