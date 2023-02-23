import {
  Request as Req,
  Response as Res,
  NextFunction as Next,
} from "express"

import User from "../models/user";

import { CustomRequest } from "../middlewares/is-auth";
import { CustomUserModel } from "./student";

export const getTeacher = async (req: Req | CustomRequest, res: Res, next: Next) => {
  const user: CustomUserModel | unknown = await User.findOne<CustomUserModel>({
    attributes: {
      exclude: ["userPassword"]
    },
    where: { userId: (req as CustomRequest).userId },
  });

  try {
    if ((user as CustomUserModel).isTeacher === true) {
      res.status(200).json({ message: "Date got successfully.", user });
    } else {
      res.status(401).json({ message: "Not Authorized" })
    }
  } catch (err) {
    res.status(401).json({ error: err });
  }
}