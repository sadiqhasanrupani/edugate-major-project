import { Router } from "express";

//^ controller
import {
  postCreateQuiz,
  getQuizzes,
  getQuizForTeacher,
  postUpdateQuizAdminTeacher,
  getQuizzesForStudent,
  getQuizForStudent,
  getQuizzesForTeacher,
  getJoinSubmittedQuizzesLength,
  getJoinQuizStudents,
  getAttemptedStudents,
  getNotAttemptedStudents,
  getUpcomingQuizzes,
} from "../controllers/quiz";

//^ router
const router = Router();

//^ auth middleware
import isAuth from "../middlewares/is-auth";

router.post("/create-quiz", isAuth, postCreateQuiz);

//^ update the quiz router
router.post("/update-quiz", isAuth, postUpdateQuizAdminTeacher);

router.get("/get-quizzes/:subjectId", isAuth, getQuizzes);

router.get("/get-quizzes-for-teacher", isAuth, getQuizzesForTeacher);

//^ getting single quiz data through this route
router.get("/get-quiz/:quizId", isAuth, getQuizForTeacher);

//^ getting those quiz which start date has is today's date for student
router.get(
  "/get-quizzes-for-student/:joinSubjectId",
  isAuth,
  getQuizzesForStudent
);

//^ getting single quiz for student
router.get("/get-quiz-for-student/:joinQuizId", isAuth, getQuizForStudent);

//^ getting all the join-quizzes and submitted-quizzes length for teacher,
router.get(
  "/get-join-submitted-quizzes-length/:quizId",
  isAuth,
  getJoinSubmittedQuizzesLength
);

//^ getting all student which is related to the join-quiz record through this route
router.get("/get-joined-students/:quizId", isAuth, getJoinQuizStudents);

//^ getting all the quiz attempted student inside the quiz
router.get("/get-attempted-students/:quizId", isAuth, getAttemptedStudents);

//^ getting not attempted quiz data of students
router.get(
  "/get-not-attempted-students/:quizId",
  isAuth,
  getNotAttemptedStudents
);

//^ getting upcoming quizzes data from the particular student's subject.
router.get("/get-upcoming-quizzes/:joinSubjectId", isAuth, getUpcomingQuizzes);

export default router;
