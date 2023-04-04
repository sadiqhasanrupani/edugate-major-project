import { Router } from "express";

//^ controller
import { postCreateAssignment, createAssignmentUpload } from "../controllers/assignment";

const router = Router();

router.post("/create-assignment", postCreateAssignment);

export default router;