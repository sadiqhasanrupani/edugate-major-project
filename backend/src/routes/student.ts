import { Router } from "express";

import { getStudent } from "../controllers/student";

import isAuth from "../middlewares/is-auth";

const router = Router();

router.get("/", isAuth, getStudent);

export default router;
