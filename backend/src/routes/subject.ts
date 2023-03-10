import { Router } from "express";
import { body } from "express-validator";

//* controller
import {
  postCreateSubject,
  getClassroomSubjects,
  getSubject,
} from "../controllers/subject";

//* middleware
import isAuth from "../middlewares/is-auth";

const router = Router();

router.post(
  "/create-subject",
  body("subjectName").notEmpty().withMessage("Enter valid subject name"),
  isAuth,
  postCreateSubject
);

router.get("/classroom-subjects", isAuth, getClassroomSubjects);

router.get("/:subjectId", isAuth, getSubject);

export default router;
