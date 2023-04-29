import { Router } from "express";

//^ controller
import { getOptionalSubject } from "../controllers/optional-subject";

//^ auth
import isAuth from "../middlewares/is-auth";

//^ router
const router = Router();

router.get("/for-student/:joinClassId", isAuth, getOptionalSubject);

export default router;
