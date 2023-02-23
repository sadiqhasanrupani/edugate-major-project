import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { Model } from "sequelize";

import { CustomRequest } from "../middlewares/is-auth";

export interface CustomModel extends Model {
  isTeacher: Boolean;
  isStudent: Boolean;
}

import User from "../models/user";

export const getRoleController = async (req: CustomRequest | Req, res: Res) => {
  const id = (req as CustomRequest).userId;

  try {
    const roleData: Model | unknown = await User.findOne<CustomModel | Model>({
      attributes: ["isTeacher", "isStudent"],
      where: { userId: id },
    });

    const isTeacher = (roleData as CustomModel).isTeacher;
    const isStudent = (roleData as CustomModel).isStudent;

    if (isTeacher === true) {
      return (res as Res).status(200).json({ role: "teacher" });
    }
    else if (isStudent === true) {
      return (res as Res).status(200).json({ role: "student" });
    }
    else {
      return (res as Res).status(401).json({ role: "UnAuthorized Request" })
    }
  } catch (err) {
    return (res as Res).status(401).json({ role: "UnAuthorized Request" , error: err})
  }
};
