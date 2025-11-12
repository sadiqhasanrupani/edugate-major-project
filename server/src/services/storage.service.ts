import { Client as MinioClient } from "minio";
import { Readable } from "stream";
import { BadRequestException } from "@app/contract/errors/utils/errors.util";
import { generateFileName } from "@app/utils/generate-filename.util";
import { MINIO_CONFIG } from "@app/contract/storage/configs/minio.config";

/**
 * StorageService
 * ----------------------------------------
 * Handles all file storage operations using MinIO
 * (upload, download, delete, move).
 *
 * Design:
 * - S3-compatible using MinIO client
 * - Centralized, safe-by-default
 * - Logs every storage action
 * - Extensible for different file types (pdf, xls, images)
 */
export class StorageService {
  private static instance: StorageService;
  private readonly minio: MinioClient;
  private readonly bucket: string;
  private readonly endpoint: string;
  private readonly port: number;
  private readonly useSSL: boolean;

  private constructor() {
    this.endpoint = MINIO_CONFIG.endPoint;
    this.port = MINIO_CONFIG.port;
    this.useSSL = MINIO_CONFIG.useSSL;
    this.bucket = MINIO_CONFIG.bucket;
    this.minio = MINIO_CONFIG.client;

    console.log(`MinIO Client initialized → ${this.endpoint}:${this.port}`);
  }

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  // --------------------------------------------------------------------------
  // UPLOAD METHODS
  // --------------------------------------------------------------------------

  /**
   * Upload a single file (buffer-based)
   */
  async uploadFile(file: Express.Multer.File, type: UploadType = "other"): Promise<string> {
    if (!file) throw new BadRequestException("File is required");

    this.validateFileType(file, type);

    const fileName = generateFileName(file, type);
    const metaData = { "Content-Type": file.mimetype };

    await this.ensureBucketExists();

    try {
      await this.minio.putObject(
        this.bucket,
        fileName,
        file.buffer,
        file.size,
        metaData
      );

      const url = `${this.getBaseUrl()}/${this.bucket}/${fileName}`;
      console.log(`Uploaded: ${fileName}`);
      return url;
    } catch (error) {
      this.logStorageError(error, fileName);
      throw error;
    }
  }

  /**
   * Upload multiple files concurrently
   */
  async uploadFiles(files: Express.Multer.File[], type: UploadType = "other"): Promise<string[]> {
    if (!files?.length) throw new BadRequestException("No files provided");
    return Promise.all(files.map((file) => this.uploadFile(file, type)));
  }

  /**
   * Upload from raw buffer
   */
  async uploadFromStream(
    key: string,
    stream: Readable | Buffer,
    contentType: string
  ): Promise<string> {
    await this.ensureBucketExists();
    const metaData = { "Content-Type": contentType };

    if (Buffer.isBuffer(stream)) {
      await this.minio.putObject(this.bucket, key, stream, stream.length, metaData);
    } else {
      await this.minio.putObject(this.bucket, key, stream, undefined, metaData);
    }

    return `${this.getBaseUrl()}/${this.bucket}/${key}`;
  }

  // --------------------------------------------------------------------------
  // RETRIEVE METHODS
  // --------------------------------------------------------------------------

  async getFile(key: string): Promise<Readable> {
    if (!key) throw new BadRequestException("File key is required");
    try {
      const stream = await this.minio.getObject(this.bucket, key);
      return stream;
    } catch (error) {
      this.logStorageError(error, key);
      throw new BadRequestException(`File not found: ${key}`);
    }
  }

  // --------------------------------------------------------------------------
  // DELETE METHODS
  // --------------------------------------------------------------------------

  async deleteFiles(keys: string[]): Promise<{ deleted: string[]; failed: string[] }> {
    const deleted: string[] = [];
    const failed: string[] = [];

    if (!keys?.length) throw new BadRequestException("No file keys provided");

    for (const key of keys) {
      try {
        await this.minio.removeObject(this.bucket, key);
        deleted.push(key);
      } catch (error) {
        failed.push(key);
        this.logStorageError(error, key);
      }
    }

    console.log(`Deleted ${deleted.length} files, ${failed.length} failed.`);
    return { deleted, failed };
  }

  // --------------------------------------------------------------------------
  // MOVE / COPY METHODS
  // --------------------------------------------------------------------------

  async moveFiles(keys: string[], destinationPrefix: string): Promise<{ moved: string[]; failed: string[] }> {
    const moved: string[] = [];
    const failed: string[] = [];

    if (!keys?.length) throw new BadRequestException("No file keys provided for moving");

    for (const key of keys) {
      const destinationKey = `${destinationPrefix}${key}`;
      try {
        await this.minio.copyObject(
          this.bucket,
          destinationKey,
          `/${this.bucket}/${key}`
        );
        await this.minio.removeObject(this.bucket, key);
        moved.push(destinationKey);
        console.log(`Moved ${key} → ${destinationKey}`);
      } catch (error) {
        failed.push(key);
        this.logStorageError(error, key);
      }
    }

    return { moved, failed };
  }

  // --------------------------------------------------------------------------
  // UTILITIES
  // --------------------------------------------------------------------------

  private async ensureBucketExists() {
    const exists = await this.minio.bucketExists(this.bucket).catch(() => false);
    if (!exists) {
      console.log(`Bucket "${this.bucket}" not found, creating...`);
      await this.minio.makeBucket(this.bucket, "us-east-1");
      console.log(`Bucket "${this.bucket}" created.`);
    }
  }

  private getBaseUrl() {
    return `${this.useSSL ? "https" : "http"}://${this.endpoint}:${this.port}`;
  }

  private validateFileType(file: Express.Multer.File, type: UploadType): void {
    const allowedTypes: Record<UploadType, string[]> = {
      photo: ["image/jpeg", "image/png", "image/webp"],
      pdf: ["application/pdf"],
      xls: [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ],
      other: [],
    };

    if (allowedTypes[type].length && !allowedTypes[type].includes(file.mimetype)) {
      throw new BadRequestException(`Invalid file type for ${type}`);
    }
  }

  private logStorageError(error: any, key: string) {
    console.error(`Storage operation failed for ${key}`);
    console.error(error?.message || error);
  }
}

// --------------------------------------------------------------------------
// Types
// --------------------------------------------------------------------------

export type UploadType = "photo" | "pdf" | "xls" | "other";


// --------------------------------------------------------------------------
// Singleton storageService
// --------------------------------------------------------------------------
export const storageService = StorageService.getInstance()
