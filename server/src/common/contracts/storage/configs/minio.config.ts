import { config } from "@config/config";
import { Client } from "minio";

export const MINIO_CONFIG = {
  endPoint: config.get("MINIO_ENDPOINT", "127.0.0.1"),
  port: config.getNumber("MINIO_PORT", 9000),
  useSSL: config.getBoolean("MINIO_USE_SSL", false),
  accessKey: config.get("MINIO_ROOT_USER", "minio"),
  secretKey: config.get("MINIO_ROOT_PASSWORD", "minio123"),
  bucket: config.get("MINIO_BUCKET", "edugate-bucket"),

  /**
   * Lazy getter for MinIO client instance.
   * Ensures environment values are loaded before initialization.
   */
  get client() {
    return new Client({
      endPoint: this.endPoint,
      port: this.port,
      useSSL: this.useSSL,
      accessKey: this.accessKey,
      secretKey: this.secretKey,
    });
  },
};
