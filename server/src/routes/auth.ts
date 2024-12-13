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

//^ Signup route
router.post(
  "/signup",
  body("userName", "Username should be more then 6 character").isLength({
    min: 6,
  }),
  body("userEmail")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom(async (value, { req }) => {
      return User.findOne({
        attributes: ["userEmail"],
        where: { userEmail: value },
      }).then((emailId) => {
        if (emailId) {
          return Promise.reject("Email already exists.");
        }
      });
    }),
  body("userPhoneNumber", "Phone number should be 10 digits").isLength({
    min: 10,
    max: 10,
  }),
  body("userDOB").custom((value, { req }) => {
    if (!dateRegex.test(value)) {
      throw new Error("Enter a valid DOB");
    }
    return true;
  }),
  body("userPassword", "Enter a 6 character alphanumeric password.")
    .isLength({ min: 6 })
    .isAlphanumeric(),
  body("userConfirmPassword").custom((value, { req }) => {
    if (value !== req.body.userPassword) {
      throw new Error("Doesn't match with entered password");
    } else {
      return true;
    }
  }),
  body("user"),
  postSignup,
);

//^ Login route
router.post(
  "/login",
  body("userEmail", "Please enter a valid EmailId")
    .isEmail()
    .custom(async (value) => {
      return User.findOne({
        attributes: ["userEmail"],
        where: { userEmail: value },
      }).then((emailId) => {
        if (!emailId) {
          return Promise.reject("Email doesn't exist.");
        }
      });
    }),
  body("userPassword", "Enter correct password")
    .not()
    .isEmpty()
    .isAlphanumeric()
    .custom(async (value, { req }) => {
      try {
        const user: any = await User.findOne({
          where: { userEmail: req.body.userEmail },
        });
        if (user) {
          return bcrypt.compare(value, user.userPassword).then((result) => {
            if (!result) {
              return Promise.reject("password doesn't match");
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    }),
  body("userRole", "Enter valid Role").not().isEmpty(),
  postLogin,
);

export default router;
