import { Router } from "express";

//^ controller
import { postCreateQuiz, getQuizzes } from "../controllers/quiz";

//^ router
const router = Router();

//^ auth middleware
import isAuth from "../middlewares/is-auth";

router.post("/create-quiz", isAuth, postCreateQuiz);

router.get("/get-quizzes/:subjectId", isAuth, getQuizzes);

export default router;
