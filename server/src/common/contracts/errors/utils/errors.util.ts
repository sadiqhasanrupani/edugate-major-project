import type { Request, Response, NextFunction } from "express";

/**
 * Custom HTTP Exception System
 * ----------------------------------------
 * This file defines a lightweight, expressive
 * error handling structure inspired by NestJS.
 *
 * Usage Example:
 *   throw new BadRequestException("Invalid file format");
 *   throw new UnauthorizedException("Access denied");
 */

export class HttpException extends Error {
  public readonly status: number;
  public readonly message: string;
  public readonly details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.message = message;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  toResponse() {
    const response: Record<string, any> = {
      statusCode: this.status,
      message: this.message
    };

    if (this.details !== undefined) {
      response.details = this.details
    }

    return response;
  }
}

// --------------------------------------------------------------------------
// Common HTTP Exceptions
// --------------------------------------------------------------------------

export class BadRequestException extends HttpException {
  constructor(message = "Bad Request", details?: unknown) {
    super(400, message, details);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = "Unauthorized", details?: unknown) {
    super(401, message, details);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message = "Forbidden", details?: unknown) {
    super(403, message, details);
  }
}

export class NotFoundException extends HttpException {
  constructor(message = "Not Found", details?: unknown) {
    super(404, message, details);
  }
}

export class ConflictException extends HttpException {
  constructor(message = "Conflict", details?: unknown) {
    super(409, message, details);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message = "Internal Server Error", details?: unknown) {
    super(500, message, details);
  }
}

export class ServiceUnavailableException extends HttpException {
  constructor(message = "Service Unavailable", details?: unknown) {
    super(503, message, details);
  }
}

// --------------------------------------------------------------------------
// Utility function: Unified Express error handler
// --------------------------------------------------------------------------

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof HttpException) {
    console.error(`[${err.status}] ${err.message}`);
    if (err.details) console.error("Details:", err.details);
    return res.status(err.status).json(err.toResponse());
  }

  console.error("Unhandled Error:", err);
  return res.status(500).json({
    statusCode: 500,
    message: "Internal Server Error",
    error: err?.message || "Unexpected error",
  });
}
