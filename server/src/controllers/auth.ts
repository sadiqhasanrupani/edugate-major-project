import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { v4 as alphaNum } from "uuid";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

// models
import User, { UserField } from "../models/user";
import Teacher from "../models/teacher";
import Student from "../models/student";

import mailSend from "../utils/mails/mailSend.mail";
import welcomeEmail from "../utils/mails/messages/welcome";
import createToken from "../utils/tokens/createToken";

//^ Sign up logic
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
          userImg: `${process.env.HOST_SITE}/images/user-profile-img/user-placeholder.png`,
        })
          .then((user: UserField) => {
            res.status(200).json({
              message: "user created successfully.",
              data: {
                id: user.userId,
              },
            });
            mailSend({
              to: userEmail,
              subject: "Welcome to Edugate",
              htmlMessage: welcomeEmail(user.userName as string),
            })
              .then(() => {
                console.log("Message sended");
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

//^ Login login
export const postLogin = (req: Req, res: Res, next: Next) => {
  const { userEmail, userRole } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "InValid credentials", error: errors.array() });
  } else {
    if (userRole === "teacher") {
      User.update({ isTeacher: true }, { where: { userEmail } }).then(() => {
        User.update({ isStudent: false }, { where: { userEmail } });

        User.findOne({
          where: { userEmail },
        })
          .then((userData: any) => {
            Teacher.findOne({ where: { teacher_email: userEmail } })
              .then((teacher: any) => {
                if (teacher) {
                  const token = createToken({
                    email: teacher.teacher_email,
                    id: teacher.teacher_id,
                  });
                  return res
                    .status(200)
                    .json({ message: "Token created successfully", token });
                } else {
                  Teacher.create({
                    teacher_id: alphaNum(),
                    teacher_first_name: userData.userName.split(" ")[0]
                      ? userData.userName.split(" ")[0]
                      : userData.userName,
                    teacher_last_name: userData.userName.split(" ")[1]
                      ? userData.userName.split(" ")[1]
                      : null,
                    teacher_email: userData.userEmail,
                    teacher_img: userData.userImg,
                    teacher_phone_number: userData.userPhoneNumber,
                    teacher_dob: userData.userDOB,
                    user_id: userData.userId,
                  })
                    .then((teacher: any) => {
                      const token = createToken({
                        email: teacher.teacher_email,
                        id: teacher.teacher_id,
                      });
                      return res.status(200).json({
                        message: "Teacher created Successfully",
                        token,
                      });
                    })
                    .catch((err) => {
                      return res.status(500).json({
                        message: "There is some issue in the database",
                        error: err,
                      });
                    });
                }
              })
              .catch((err) => {
                return res.status(500).json({
                  message: "There is some issue in the database",
                  error: err,
                });
              });
          })
          .catch((err) => {
            res.status(401).json({ err });
          });
      });
    } else if (userRole === "student") {
      User.update({ isStudent: true }, { where: { userEmail } }).then(() => {
        User.update({ isTeacher: false }, { where: { userEmail } });

        // getting the user
        User.findOne({
          where: { userEmail },
        })
          .then((userData: any) => {
            Student.findOne({
              where: { student_email: userEmail },
            })
              .then((student: any) => {
                if (student) {
                  const token = createToken({
                    email: student.student_email,
                    id: student.student_id,
                  });
                  return res
                    .status(200)
                    .json({ message: "Token created successfully", token });
                } else {
                  Student.create({
                    student_id: alphaNum(),
                    student_first_name: userData.userName.split(" ")[0]
                      ? userData.userName.split(" ")[0]
                      : userData.userName,
                    student_last_name: userData.userName.split(" ")[1]
                      ? userData.userName.split(" ")[1]
                      : null,
                    student_email: userData.userEmail,
                    student_phone_number: userData.userPhoneNumber,
                    student_dob: userData.userDOB,
                    user_id: userData.userId,
                    student_img: userData.userImg,
                  })
                    .then((student: any) => {
                      const token = createToken({
                        email: student.student_email,
                        id: student.student_id,
                      });
                      return res.status(200).json({
                        message: "Student account created successfully",
                        token,
                      });
                    })
                    .catch((err) => {
                      return res.status(500).json({
                        message: "Something went wrong into the database",
                        error: err,
                      });
                    });
                }
              })
              .catch((err) => {
                return res.status(500).json({
                  message: "Something went wrong into the database",
                  error: err,
                });
              });
          })
          .catch((err) => {
            res.status(401).json({ err });
          });
      });
    } else {
      res.status(401).json({ message: "Unauthorized Access" });
    }
  }
};
