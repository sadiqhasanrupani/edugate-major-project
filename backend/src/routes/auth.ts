import { Router } from "express";
import { body } from "express-validator";
import bcrypt from "bcrypt";

import { postSignup, postLogin } from "../controllers/auth";
import User from "../models/user";
import { gmailRegex, numRegex, dateRegex } from "../utils/regex";

const router = Router();

interface loginPassword {
  userEmail: string;
  userPassword: string;
}

// signup route
router.post(
  "/signup",
  body("userName", "Username should be more then 6 character").isLength({
    min: 6,
  }),
  body("userEmail")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom(async (value, { req }) => {
      if (!gmailRegex.test(value)) {
        throw new Error("Email's domain should be GmailId");
      } else {
        return User.findOne({
          attributes: ["userEmail"],
          where: { userEmail: value },
        }).then((emailId) => {
          if (emailId) {
            return Promise.reject(
              "Email Exists already, try with another emailId."
            );
          }
        });
      }
    }),
  body(
    "userPhoneNumber",
    "Phone number should be 10 numbers"
  ).isLength({ min: 10, max: 10 }),
  body("userDOB").custom((value, { req }) => {
    if (!dateRegex.test(value)) {
      throw new Error("Enter a valid DOB");
    }
    return true;
  }),
  body(
    "userPassword",
    "Please enter a password with only number and text and also it should be more than 6 character "
  )
    .isLength({ min: 6 })
    .isAlphanumeric(),
  body("userConfirmPassword").custom((value, { req }) => {
    if (value !== req.body.userPassword) {
      throw new Error("Both password should be match.");
    } else {
      return true;
    }
  }),
  body("user"),
  postSignup
);

router.post(
  "/login",
  body("userEmail", "Please enter a valid EmailId")
    .isEmail()
    .custom(async (value, { req }) => {
      if (!gmailRegex.test(value)) {
        throw new Error("Email's domain should be GmailId");
      } else {
        return User.findOne({
          attributes: ["userEmail"],
          where: { userEmail: value },
        }).then((emailId) => {
          if (!emailId) {
            return Promise.reject("Email is not exists in the database");
          }
        });
      }
    }),
  body("userPassword", "Enter correct password")
    .not()
    .isEmpty()
    .isAlphanumeric()
    .custom(async (value, { req }) => {
      const user: any = await User.findOne({
        where: { userEmail: req.body.userEmail },
      });
      return bcrypt.compare(value, user.userPassword).then((result) => {
        if (!result) {
          return Promise.reject("password did not match");
        }
      });
    }),
  postLogin
);

export default router;
