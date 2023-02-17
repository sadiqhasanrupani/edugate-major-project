import {
  Request as Req,
  Response as Res,
  NextFunction as Next,
  response,
} from "express";
import { v4 as alphaNum } from "uuid";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
    const error: any = new Error("Invalid Credentials");
    error.errorStatus = 422;
    error.errorData = errors.array();
    throw error;
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
  const { userEmail, userPassword } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error: any = new Error("Invalid credentials");
    error.statusCode = 422;
    error.errorData = errors.array();
    throw error;
  } else {
    User.findOne({
      attributes: ["userEmail", "userPassword", "userId"],
      where: { userEmail },
    }).then((userData: any) => {
      const token = jwt.sign(
        {
          email: userData.userEmail,
          userId: userData.userId,
        },
        process.env.SECRET_TOKEN as string,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ token: token, userId: userData.userId });
    });
  }
};
