import { SERVER_CONFIG } from "@app/contract/server/configs/server.config";
import { MINIO_CONFIG } from "../configs/minio.config";
import path from "path";

export const uploadToMinio = async (filePath: string, userId: string): Promise<string> => {
  try {
    const fileName = path.basename(filePath);
    const objectName = `users/${userId}/${Date.now()}-${fileName}`;

    const minioClient = MINIO_CONFIG.client;

    await minioClient.fPutObject(MINIO_CONFIG.bucket, objectName, filePath, {
      "Content-Type": "image/jpeg",
    });

    console.log(`Uploaded ${objectName} to MinIO`);

    // Return a public URL (works if bucket policy allows public access)
    const publicUrl = `${SERVER_CONFIG.PROTOCOL}://${MINIO_CONFIG.endPoint}:${MINIO_CONFIG.port}/${MINIO_CONFIG.bucket}/${objectName}`;
    return publicUrl;
  } catch (error) {
    console.error("MinIO upload failed:", error);
    throw error;
  }
};
