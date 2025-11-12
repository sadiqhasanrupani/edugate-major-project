import { Router } from "express";
import { profileImageUploader } from "../middlewares/teacher/update-profile-upload";

import {
  getStudent,
  getJoinedStudents,
  postUpdateProfile,
} from "../controllers/student";

import isAuth from "../middlewares/is-auth";

const router = Router();

// update profile route
router.post(
  "/update-profile",
  isAuth,
  profileImageUploader.upload({ fieldName: 'image' }),
  postUpdateProfile
);

// get student router
router.get("/", isAuth, getStudent);

// get joined student route
router.get("/get-joined-students/:classId", isAuth, getJoinedStudents);

export default router;
