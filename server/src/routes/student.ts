import { Router } from "express";
import updateImageUpload from "../middlewares/teacher/update-profile-upload";

import {
  getStudent,
  getJoinedStudents,
  postUpdateProfile,
} from "../controllers/student";

import isAuth from "../middlewares/is-auth";

const router = Router();

//^ update profile route
router.post(
  "/update-profile",
  isAuth,
  updateImageUpload.single("image"),
  postUpdateProfile
);

router.get("/", isAuth, getStudent);

router.get("/get-joined-students/:classId", isAuth, getJoinedStudents);

export default router;
