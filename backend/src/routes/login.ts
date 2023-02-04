import { Router } from "express";

// controllers
import loginController from "../controllers/loginController";

const router = Router();

router.get("/", loginController.root);

export default router;
