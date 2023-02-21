import { Router } from "express";

import { getTeacher } from "../controllers/teacher";

import isAuth from "../middlewares/is-auth";

const router = Router();

router.get("/", isAuth, getTeacher);

export default router;
