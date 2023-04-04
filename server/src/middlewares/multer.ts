import { Request as Req } from "express";
import multer from "multer";

export interface StoreImageData {
  destination?: string;
}

const storeImage = (storeImageData: StoreImageData) => {
  const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, storeImageData.destination as string);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const fileFilter = (req: Req, file: any, cb: any) => {
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

  return multer({ storage: fileStorage, fileFilter: fileFilter });
};

export default storeImage;
