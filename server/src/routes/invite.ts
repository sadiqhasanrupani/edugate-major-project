import { Router } from "express";

const router = Router();

//! utils
import isAuth from "../middlewares/is-auth";

//* controller
import {
  getInvitations,
  patchAdminRequestAcceptedInvitation,
  patchJoinRequestAcceptedInvitation,
} from "../controllers/invite";

//^ Get routes
router.get("/get-invitations", isAuth, getInvitations);

router.post(
  "/admin-request/accept-invite",
  isAuth,
  patchAdminRequestAcceptedInvitation
);

router.get(
  "/join-request/accept-invite",
  isAuth,
  patchJoinRequestAcceptedInvitation
);
export default router;
