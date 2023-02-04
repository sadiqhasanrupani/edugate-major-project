import { Router } from "express";

// controllers
import signupController from "../controllers/signupController";

const router = Router();

router.get("/", signupController.root);

export default router;
