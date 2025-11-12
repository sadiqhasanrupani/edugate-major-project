import { ImageUploader } from "../../common/contracts/storage/utils/image-uploader.util"
import { UploadFieldConfigs } from "../upload-fields.config";

const imageUploader = new ImageUploader()

/**
 * Creates an upload middleware from predefined config keys.
 *
 * Example:
 *  createUploadMiddleware("classroom") → handles classroomBackgroundImg & classroomProfileImg
 */
export function createUploadMiddleware(entityKey: keyof typeof UploadFieldConfigs) {
  const fields = UploadFieldConfigs[entityKey];
  if (!fields || !Array.isArray(fields)) {
    throw new Error(`Upload configuration not found for key: ${entityKey}`);
  }
  return imageUploader.uploadMany({ fields });
}
