import {
  Router,
  Request as Req,
  Response as Res,
  NextFunction as Next,
} from "express";
import multer from "multer";
import { body } from "express-validator";

//! middleware
import isAuth from "../middlewares/is-auth";

//! Controllers
import {
  getJoinClassroom,
  getJoinClassroomAsStudent,
  postJoinClassroomAsStudent,
  getJoinClassroomStudents,
} from "../controllers/joinClassroom";

const router = Router();

//^ get routes
router.get("/get-join-classroom-as-student", isAuth, getJoinClassroomAsStudent);
router.get("/get-join-classroom-students", isAuth, getJoinClassroomStudents);

//^ post join-classrooms
router.post("/student-join-classroom", isAuth, postJoinClassroomAsStudent);

//^ dynamic routes
router.get("/joinClassroom/:joinClassId", isAuth, getJoinClassroom);

export default router;
