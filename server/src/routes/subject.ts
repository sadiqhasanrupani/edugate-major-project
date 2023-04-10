import { Router } from "express";
import { body } from "express-validator";

//* controller
import {
  postCreateSubject,
  getClassroomSubjects,
  getSubject,
  postCreateAssignment,
  getClassroomMembers
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

//^ get requests.
router.get("/classroom-subjects", isAuth, getClassroomSubjects);
router.get("/get-peoples", isAuth);
router.get("/get-classroom-members", isAuth, getClassroomMembers)

//^ post requests.
router.post("/create-assignment", isAuth, postCreateAssignment);

//^ get params requests.
router.get("/:subjectId", isAuth, getSubject);

export default router;
