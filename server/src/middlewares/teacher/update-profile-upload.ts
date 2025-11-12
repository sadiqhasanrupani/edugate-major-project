import multer from "multer";
import { Request, Response, NextFunction } from "express";
import { StorageService } from "@app/service/storage.service";
import { BadRequestException } from "@app/contract/errors/utils/errors.util";

export class ProfileImageUploader {
  private static instance: ProfileImageUploader;
  private readonly storageService: StorageService;
  private readonly defaultImageUrl: string;
  private readonly multerInstance;

  private constructor(defaultFolder = "images/user-profile") {
    this.storageService = StorageService.getInstance();
    this.defaultImageUrl = `${this.storageService["getBaseUrl"]()}/edugate-bucket/${defaultFolder}/user-placeholder.png`;

    this.multerInstance = multer({
      storage: multer.memoryStorage(),
      fileFilter: (_req, file, cb) => {
        const valid = ["image/png", "image/jpg", "image/jpeg"];
        if (valid.includes(file.mimetype)) cb(null, true);
        else cb(new BadRequestException("Only .png, .jpg, .jpeg images are allowed"));
      },
    });
  }

  public static getInstance(): ProfileImageUploader {
    if (!ProfileImageUploader.instance) {
      ProfileImageUploader.instance = new ProfileImageUploader();
    }
    return ProfileImageUploader.instance;
  }

  upload({ fieldName = "file", folderPath = "images/user-profile" }) {
    return [
      this.multerInstance.single(fieldName),
      async (req: Request, _res: Response, next: NextFunction) => {
        try {
          if (!req.file) {
            (req as any).fileUrl = this.defaultImageUrl;
            return next();
          }

          const fileName = `${folderPath}/${Date.now()}-${req.file.originalname}`;
          const imageUrl = await this.storageService.uploadFromStream(
            fileName,
            this.toReadable(req.file.buffer),
            req.file.mimetype
          );

          (req as any).fileUrl = imageUrl;
          next();
        } catch (err) {
          next(err);
        }
      },
    ];
  }

  private toReadable(buffer: Buffer) {
    const stream = new (require("stream").Readable)();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }
}

export const profileImageUploader = ProfileImageUploader.getInstance()
