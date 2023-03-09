import { Request as Req } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req: Req, file: Express.Multer.File, cb) => {
    cb(null, "images/user-profile-img");
  },
  filename: (req: Req, file: Express.Multer.File, cb: any) => {
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

const upload = multer({ storage, fileFilter });

export default upload;
