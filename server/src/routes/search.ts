import { Router } from "express";

import isAuth from "../middlewares/is-auth";

import { getAllSearchForAdminTeacher } from "../controllers/search";

const router = Router();

router.post(
  "/get-all-search-for-admin-teacher",
  isAuth,
  getAllSearchForAdminTeacher
);

export default router;
