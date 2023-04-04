import { Request as Req, Response as Res, NextFunction as Next } from "express";
import multer, { Multer } from "multer";
import path from "path";

//^ Create Assignment Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__filename, "../../public/assignment-files"))
  },
  filename: (req, file, callback) => {},
});

// const fileFilter = (req: Req, file: Express.Multer.File, cb: any) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === ""
//   ) {
//   }
// };

export const createAssignmentUpload = multer({ storage });

export const postCreateAssignment = async (req: Req, res: Res, next: Next) => {
  
  console.log(`\n ${path.join(__filename, "../../public/assignment-files")} \n`);

  res.status(200).json("bruh");
};
