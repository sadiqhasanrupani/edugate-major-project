import { Router } from "express";

const router = Router();

//* controllers
import {
  getStudentNotifications,
  getTeacherNotifications,
} from "../controllers/notification";

//* middleware
import isAuth from "../middlewares/is-auth";

router.get("/get-student-notifications", isAuth, getStudentNotifications);
router.get("/get-teacher-notifications", isAuth, getTeacherNotifications);

export default router;
