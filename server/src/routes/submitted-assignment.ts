import { Router } from "express";

import isAuth from "../middlewares/is-auth";

import { getSubmittedAssignments } from "../controllers/submitted-assignment";

const router = Router();

router.get("/get-joined-and-submitted-assignments/:assignmentId", isAuth, getSubmittedAssignments);

export default router;
