import multer from "multer";
import { Request, Response, NextFunction } from "express";
import { StorageService } from "@app/service/storage.service";
import { BadRequestException } from "@app/contract/errors/utils/errors.util";

/**
 * Universal Image Upload Utility
 * -------------------------------------------------------------------
 * Handles single or multiple file uploads for any entity (teacher, student, classroom, etc.)
 *
 * Features:
 * - Dynamic folder mapping per field
 * - Optional global default folder
 * - Placeholder handling (folder-aware, customizable)
 * - Buffer-based MinIO upload
 * - Clean request extensions:
 *     req.fileUrl         → single upload URL
 *     req.uploadedFiles   → multi-field upload URLs (map)
 */
export class ImageUploader {
  private readonly storageService: StorageService;
  private readonly multerInstance;
  private readonly baseFolder: string;
  private readonly defaultPlaceholderFile: string;

  constructor(baseFolder = "images/user-profile", defaultPlaceholderFile = "user-placeholder.png") {
    this.storageService = StorageService.getInstance();
    this.baseFolder = baseFolder;
    this.defaultPlaceholderFile = defaultPlaceholderFile;

    this.multerInstance = multer({
      storage: multer.memoryStorage(),
      fileFilter: (_req, file, cb) => {
        const valid = ["image/png", "image/jpg", "image/jpeg", "image/svg+xml"];
        if (valid.includes(file.mimetype)) cb(null, true);
        else cb(new BadRequestException("Only .png, .jpg, .jpeg, .svg files are allowed"));
      },
    });
  }

  // --------------------------------------------------------------------
  // SINGLE FILE UPLOAD
  // --------------------------------------------------------------------
  public upload({
    fieldName = "file",
    folderPath = this.baseFolder,
    fileName,
    placeholderImg = this.defaultPlaceholderFile,
  }: {
    fieldName?: string;
    folderPath?: string;
    fileName?: string;
    placeholderImg?: string;
  }) {
    return [
      this.multerInstance.single(fieldName),
      async (req: Request, _res: Response, next: NextFunction) => {
        try {
          // No file uploaded → use folder-specific placeholder
          if (!req.file) {
            (req as any).fileUrl = this.getPlaceholderUrl(folderPath, placeholderImg);
            return next();
          }

          const finalFileName =
            fileName || `${Date.now()}-${req.file.originalname}`;
          const key = `${folderPath}/${finalFileName}`;

          const imageUrl = await this.storageService.uploadFromStream(
            key,
            req.file.buffer,
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

  // --------------------------------------------------------------------
  // MULTIPLE FIELD UPLOADS (PER-FIELD FOLDER + PLACEHOLDER)
  // --------------------------------------------------------------------
  /**
   * Supports flexible folder + placeholder per field.
   *
   * Example:
   * imageUploader.uploadMany({
   *   fields: [
   *     { name: "classroomBackgroundImg", folderPath: "images/classroom-banner-img", placeholderImg: "banner-placeholder.png" },
   *     { name: "classroomProfileImg", folderPath: "images/classroom-profile-img", placeholderImg: "profile-placeholder.png" },
   *   ],
   * });
   */
  public uploadMany({
    fields,
    defaultFolder = this.baseFolder,
    defaultPlaceholderImg = this.defaultPlaceholderFile,
  }: {
    fields: { name: string; maxCount?: number; folderPath?: string; placeholderImg?: string }[];
    defaultFolder?: string;
    defaultPlaceholderImg?: string;
  }) {
    return [
      this.multerInstance.fields(fields.map((f) => ({ name: f.name, maxCount: f.maxCount ?? 1 }))),
      async (req: Request, _res: Response, next: NextFunction) => {
        try {
          const files = req.files as Record<string, Express.Multer.File[]> | undefined;
          if (!files) {
            (req as any).uploadedFiles = {};
            return next();
          }

          const uploadedUrls: Record<string, string> = {};

          for (const field of fields) {
            const fileArr = files[field.name];
            const folder = field.folderPath || defaultFolder;
            const placeholderImg = field.placeholderImg || defaultPlaceholderImg;

            if (!fileArr || fileArr.length === 0) {
              uploadedUrls[field.name] = this.getPlaceholderUrl(folder, placeholderImg);
              continue;
            }

            const file = fileArr[0];
            const key = `${folder}/${Date.now()}-${file.originalname}`;

            const url = await this.storageService.uploadFromStream(
              key,
              file.buffer,
              file.mimetype
            );

            uploadedUrls[field.name] = url;
          }

          (req as any).uploadedFiles = uploadedUrls;
          next();
        } catch (err) {
          next(err);
        }
      },
    ];
  }

  // --------------------------------------------------------------------
  // UTILITIES
  // --------------------------------------------------------------------
  private getPlaceholderUrl(folder: string, placeholderImg: string): string {
    const baseUrl = (this.storageService as any).getBaseUrl();
    const bucket = (this.storageService as any).bucket;
    return `${baseUrl}/${bucket}/${folder}/${placeholderImg}`;
  }
}

// --------------------------------------------------------------------
// Export default instance
// --------------------------------------------------------------------
export const imageUploader = new ImageUploader();
