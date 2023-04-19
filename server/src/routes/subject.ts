import { Router } from "express";
import { body } from "express-validator";

//* controller
import {
  postCreateSubject,
  getClassroomSubjects,
  getSubject,
  postCreateAssignment,
  getClassroomMembers,
  postAddTeachers,
  postAddStudents,
  getJoinTeachersStudents,
  postRemoveJoinSubjectMember,
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
router.get("/get-classroom-members/:subjectId", isAuth, getClassroomMembers);
router.get(
  "/get-join-subject-teachers-students/:subjectId",
  isAuth,
  getJoinTeachersStudents
);

//^ post requests.
router.post("/create-assignment", isAuth, postCreateAssignment);
router.post("/add-teachers", isAuth, postAddTeachers);
router.post("/add-students", isAuth, postAddStudents);
router.post("/remove-subject-member", isAuth, postRemoveJoinSubjectMember);

//^ params requests.
router.get("/:subjectId", isAuth, getSubject);

export default router;
