import { Router } from "express";
import { Request as Req, Response as Res, NextFunction as Next } from "express";

import isAuth from "../middlewares/is-auth";

import { getRoleController } from "../controllers/role";

import { CustomRequest } from "../middlewares/is-auth";

const router = Router();

router.get("/get-role", isAuth, getRoleController);

export default router;
