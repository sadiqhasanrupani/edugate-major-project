import { Router, Request as Req } from "express";
import multer from "multer";

import isAuth from "../middlewares/is-auth";
import { postCreateClassroom } from "../controllers/classroom";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "classroomBackgroundImg") {
      cb(null, "images/classroom-banner-img");
    } else if (file.fieldname === "classroomProfileImg") {
      cb(null, "images/classroom-profile-img");
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req: Req, file: Express.Multer.File, cb: any) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter }).fields([
  { name: "classroomBackgroundImg", maxCount: 1 },
  { name: "classroomProfileImg", maxCount: 1 },
]);

// controller

const router = Router();

router.post("/create-classroom", isAuth, upload, postCreateClassroom);

export default router;
