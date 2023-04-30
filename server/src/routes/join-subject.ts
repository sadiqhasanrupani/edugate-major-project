import { Router } from "express";

//^ controllers
import { getJoinedSubjectsForStudent, getJoinSubject } from "../controllers/join-subject";

//^ auth
import isAuth from "../middlewares/is-auth";

const router = Router();

router.get(
  "/get-joined-subjects-for-student/:joinClassId",
  isAuth,
  getJoinedSubjectsForStudent
);

router.get("/:joinSubjectId", isAuth, getJoinSubject)

export default router;
