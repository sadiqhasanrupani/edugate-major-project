import { Router } from "express";

//^ controller
import {
  postSubmitQuizOfStudent,
  postSubmitStartTimeQuiz,
} from "../controllers/submit-quiz";

//^ auth middleware
import isAuth from "../middlewares/is-auth";

const router = Router();

//^ submission of student quiz post route
router.post("/submit-quiz-for-student", isAuth, postSubmitQuizOfStudent);

router.post("/submit-start-time-quiz", isAuth, postSubmitStartTimeQuiz);

export default router;
