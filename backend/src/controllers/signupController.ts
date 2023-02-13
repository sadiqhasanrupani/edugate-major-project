import { Response as Res, Request as Req, NextFunction as Next } from "express";
import { v4 as generateId } from "uuid";

// model
import User from "../models/User";

export const postAddUser = async (req: Req, res: Res, next: Next) => {
  const {
    name: userName,
    emailId: userEmailId,
    phoneNumber: userPhoneNumber,
    dob: userDOB,
    password: userPassword,
  } = await req.body;

  User.create({
    id: generateId(),
    userName,
    userEmailId,
    userPhoneNumber,
    userDOB,
    userPassword,
    userImg: "http://image.png"
  })
    .then(() => {
      return res.status(200).json({ message: "User created successfully" });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "There is some issue which getting the data from body",
        error: err,
      });
    });
};
