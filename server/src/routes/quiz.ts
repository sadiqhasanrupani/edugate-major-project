import { Router } from "express";

//^ controller
import { postCreateQuiz } from "../controllers/quiz"

//^ router
const router = Router();

//^ auth middleware
import isAuth from "../middlewares/is-auth";

router.post("/create-route", isAuth, postCreateQuiz);

export default router;