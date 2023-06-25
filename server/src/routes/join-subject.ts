import { Router } from "express";

//^ controllers
import {
  getJoinedSubjectsForStudent,
  getJoinSubject,
  getSubjectTeachersStudentsAssignments,
  getJoinSubjectData,
  getParticipantsForStudents
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

router.get("/get-join-subject-data/:joinSubjectId", isAuth, getJoinSubjectData);

router.get("/get-participants-for-students/:joinSubjectId", isAuth, getParticipantsForStudents)

export default router;
