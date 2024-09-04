import { Router } from "express";

//^ controller
import { postJoinOptionalSubjectsForStudent } from "../controllers/join-optional-subject";

//^ auth
import isAuth from "../middlewares/is-auth";

//^ router
const router = Router();

//^ post route to add optional subjects into the join-optional-subject record
router.post("/add-optional-subject-as-student", isAuth, postJoinOptionalSubjectsForStudent)

export default router;