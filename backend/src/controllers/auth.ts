import {
  Request as Req,
  Response as Res,
  NextFunction as Next,
  response,
} from "express";
import { v4 as alphaNum } from "uuid";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// models
import User from "../models/user";

import mailSend from "../utils/mails/mailSend.mail";
import welcomeEmail from "../utils/mails/messages/welcome";

export const postSignup = async (req: Req, res: Res, next: Next) => {
  const { userName, userEmail, userPhoneNumber, userDOB, userPassword } =
    await req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res
      .status(422)
      .json({ message: "Invalid Credentials", error: errors.array() });
  } else {
    return bcrypt
      .hash(userPassword, 12)
      .then((hashPassword) => {
        User.create({
          userId: alphaNum(),
          userName,
          userEmail,
          userPhoneNumber,
          userDOB,
          userPassword: hashPassword,
        })
          .then((user: any) => {
            mailSend({
              to: userEmail,
              subject: "Welcome to Edugate",
              htmlMessage: welcomeEmail(userName),
            })
              .then(() => {
                res.status(200).json({
                  message: "user created successfully.",
                  data: {
                    id: user.userId,
                  },
                });
              })
              .catch((err) => {
                if (!err.statusCode) {
                  err.statusCode = 500;
                  err.message = "Something went wrong";
                  err.errorData = err;
                }
              });
          })
          .catch((err) => {
            if (!err.statusCode && !err.message) {
              err.statusCode = 402;
              err.message = "Cannot created a user";
              next(err);
            }
          });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
          err.message = "Something went wrong in the backend";
          err.errorData = err;
        }
      });
  }
};

export const postLogin = (req: Req, res: Res, next: Next) => {
  const { userEmail, userRole } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "InValid credentials", error: errors.array() });
  } else {
    if (userRole === "teacher") {
      User.update({ isStudent: false }, { where: { userEmail } });
      User.update({ isTeacher: true }, { where: { userEmail } }).then(() => {
        User.findOne({
          attributes: ["userId", "userEmail", "isTeacher", "isStudent"],
          where: { userEmail },
        })
          .then((userData: any) => {
            const token = jwt.sign(
              {
                id: userData.userId,
                email: userData.userEmail,
                isTeacher: userData.isTeacher,
                isStudent: userData.isStudent,
              },
              process.env.SECRET_TOKEN as string,
              {
                expiresIn: "1h",
              }
            );
            return res.status(200).json({ token });
          })
          .catch((err) => {
            res.status(401).json({ err });
          });
      });
    } else if (userRole === "student") {
      User.update({ isTeacher: false }, { where: { userEmail } });
      User.update({ isStudent: true }, { where: { userEmail } }).then(() => {
        User.findOne({
          attributes: ["userId", "userEmail", "isTeacher", "isStudent"],
          where: { userEmail },
        })
          .then((userData: any) => {
            const token = jwt.sign(
              {
                id: userData.userId,
                email: userData.userEmail,
                isStudent: userData.isStudent,
                isTeacher: userData.isTeacher,
              },
              process.env.SECRET_TOKEN as string,
              {
                expiresIn: "1h",
              }
            );
            return res.status(200).json({ token });
          })
          .catch((err) => {
            res.status(401).json({ err });
          });
      });
    } else {
      res.status(401).json({ message: "dont have a permission" });
    }
  }
};
