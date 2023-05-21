import { Router } from "express";

import { getJoinAssignmentStudents } from "../controllers/join-assignment"

import isAuth from "../middlewares/is-auth";

const router = Router();

router.get("/join-assignment-students/:assignmentId", isAuth, getJoinAssignmentStudents);

export default router;