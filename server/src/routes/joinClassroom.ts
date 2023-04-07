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
  postJoinClassroomAsStudent,
} from "../controllers/joinClassroom";

const router = Router();

router.get("/joinClassroom/:joinClassId", isAuth, getJoinClassroom);

router.post("/student-join-classroom", isAuth, postJoinClassroomAsStudent);

export default router;
