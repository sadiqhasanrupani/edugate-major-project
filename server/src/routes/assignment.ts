import { Router } from "express";

//^ controller
import {
  postCreateAssignment,
  createAssignmentUpload,
  getAssignmentForTeacher,
  getAssignment,
  getJoinAssignments,
  uploadSubmittedAssignmentFile,
  postSubmittedAssignment,
  getSubmittedAssignments,
  getSubmittedAssignment,
  getSubmittedAssignmentBySubmit,
  postAssignSubmittedAssignment
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

router.post(
  "/submit-assignment",
  isAuth,
  uploadSubmittedAssignmentFile.array("submittedFiles", 10),
  postSubmittedAssignment
);

router.post("/assign-submitted-assignment", isAuth, postAssignSubmittedAssignment)

router.get("/get-submitted-assignment/:assignmentId", isAuth, getSubmittedAssignment);
router.get("/submitted-assignments", isAuth, getSubmittedAssignments);
router.get("/get-submitted-assignment-by-submit-id/:submittedAssignmentId", isAuth, getSubmittedAssignmentBySubmit)

//^ /assignment/get-assignment-for-teacher
router.get(
  "/get-assignments-for-teacher/:subjectId",
  isAuth,
  getAssignmentForTeacher
);
router.get("/get-assignment/:assignmentId", isAuth, getAssignment);
router.get("/get-joined-assignment/:joinSubjectId", isAuth, getJoinAssignments);

export default router;
