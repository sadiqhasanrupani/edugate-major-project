import { Router } from "express";

//^ controller
import {
  postCreateAssignment,
  createAssignmentUpload,
  getAssignmentForTeacher,
  getAssignment,
  getJoinAssignments,
} from "../controllers/assignment";

//^ is-auth middleware
import isAuth from "../middlewares/is-auth";

const router = Router();

router.post(
  "/create-assignment",
  isAuth,
  createAssignmentUpload.array("files", 10),
  postCreateAssignment
);

//^ /assignment/get-assignment-for-teacher
router.get(
  "/get-assignments-for-teacher/:subjectId",
  isAuth,
  getAssignmentForTeacher
);
router.get("/get-assignment/:assignmentId", isAuth, getAssignment);
router.get("/get-joined-assignment/:joinSubjectId", isAuth, getJoinAssignments);

export default router;
