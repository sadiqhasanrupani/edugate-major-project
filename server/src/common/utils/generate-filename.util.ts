import path from "path";
import { randomBytes } from "crypto";

/**
 * Generates a unique, clean, and safe filename
 * for uploaded files.
 *
 * Design:
 *  - Prevents collisions using timestamp + random hex
 *  - Normalizes original names (removes spaces and special chars)
 *  - Categorizes by type: "photo", "pdf", "xls", "other"
 *
 * Example:
 *   generateFileName(file, "photo")
 *   → "uploads/photo/2025/11/11/photo-1731351000000-7fa3b6d9d2.png"
 */

export type UploadType = "photo" | "pdf" | "xls" | "other";

export function generateFileName(
  file: Express.Multer.File,
  type: UploadType = "other",
): string {
  // Extract and normalize the original file name
  const originalName = path.basename(file.originalname);
  const ext = path.extname(originalName).toLowerCase() || ".bin";

  // Remove extension and special characters from the base name
  const baseName = path
    .basename(originalName, ext)
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .substring(0, 50); // limit length

  // Add a unique suffix (timestamp + random ID)
  const timestamp = Date.now();
  const randomId = randomBytes(4).toString("hex");

  // Optional folder structure by year/month/day (helps with organization)
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  // Create final filename and key structure
  const fileName = `${baseName}-${timestamp}-${randomId}${ext}`;
  const folder = `uploads/${type}/${year}/${month}/${day}`;
  const fullPath = `${folder}/${fileName}`;

  return fullPath;
}
