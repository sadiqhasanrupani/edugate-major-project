import { Router } from "express";

import { getStudent, getJoinedStudents } from "../controllers/student";

import isAuth from "../middlewares/is-auth";

const router = Router();

router.get("/", isAuth, getStudent);

router.get("/get-joined-students/:classId", isAuth, getJoinedStudents)

export default router;
