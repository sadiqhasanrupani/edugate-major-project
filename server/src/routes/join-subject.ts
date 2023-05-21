import { Router } from "express";

//^ controllers
import {
  getJoinedSubjectsForStudent,
  getJoinSubject,
  getSubjectTeachersStudentsAssignments,
  getJoinSubjectData
} from "../controllers/join-subject";

//^ auth
import isAuth from "../middlewares/is-auth";

const router = Router();

router.get(
  "/get-joined-subjects-for-student/:joinClassId",
  isAuth,
  getJoinedSubjectsForStudent
);

router.get(
  "/get-subject-teachers-students-assignments/:joinSubjectId",
  isAuth,
  getSubjectTeachersStudentsAssignments
);

router.get("/:joinSubjectId", isAuth, getJoinSubject);

router.get("/get-join-subject-data/:joinSubjectId", isAuth, getJoinSubjectData)

export default router;
