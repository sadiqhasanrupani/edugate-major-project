import { Router } from "express";

//^ controller
import {
  postCreateQuiz,
  getQuizzes,
  getQuizForTeacher,
  postUpdateQuizAdminTeacher,
  getQuizzesForStudent,
  getQuizForStudent
} from "../controllers/quiz";

//^ router
const router = Router();

//^ auth middleware
import isAuth from "../middlewares/is-auth";

router.post("/create-quiz", isAuth, postCreateQuiz);

//^ update the quiz router
router.post("/update-quiz", isAuth, postUpdateQuizAdminTeacher);

router.get("/get-quizzes/:subjectId", isAuth, getQuizzes);

//^ getting single quiz data through this route
router.get("/get-quiz/:quizId", isAuth, getQuizForTeacher);

//^ getting those quiz which start date has is today's date for student
router.get("/get-quizzes-for-student/:joinSubjectId", isAuth, getQuizzesForStudent)

//^ getting single quiz for student
router.get("/get-quiz-for-student/:joinQuizId", isAuth, getQuizForStudent)

export default router;
