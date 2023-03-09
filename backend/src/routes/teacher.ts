import { Router } from "express";

import {
  getTeacher,
  postUpdateProfile,
  getAdminTeacher,
  getCoTeachers,
} from "../controllers/teacher";

//* middleware
import isAuth from "../middlewares/is-auth";
import updateImgUpload from "../middlewares/teacher/update-profile-upload";

const router = Router();

router.get("/", isAuth, getTeacher);

router.post(
  "/update-profile",
  isAuth,
  updateImgUpload.single("updatedImg"),
  postUpdateProfile
);


router.get("/get-admin-teacher/:classId", isAuth, getAdminTeacher);

router.get("/get-co-teachers/:classId", isAuth, getCoTeachers);


export default router;
