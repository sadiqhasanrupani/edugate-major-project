import { Router } from "express";

// controllers
import { postAddUser } from "../controllers/signupController";

const router = Router();

router.post("/createUser", postAddUser);

export default router;
