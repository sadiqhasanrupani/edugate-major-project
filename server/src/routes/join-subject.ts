import { Router } from "express";

//^ controllers
import { getJoinedSubjectsForStudent } from "../controllers/join-subject";

//^ auth
import isAuth from "../middlewares/is-auth";

const router = Router();

router.get(
  "/get-joined-subjects-for-student/:joinClassId",
  isAuth,
  getJoinedSubjectsForStudent
);

export default router;
