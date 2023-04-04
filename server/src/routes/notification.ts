import { Router } from "express";

const router = Router();

//* controllers
// import { getTeacherInvitations } from "../controllers/notification";

//* middleware
import isAuth from "../middlewares/is-auth";

//* utils
import socket from "../utils/helper/socket";

// router.get("/get-teacher-invitation", isAuth, getTeacherInvitations);

export default router;
