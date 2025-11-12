import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_CONFIG } from "../common/contracts/jwt/configs/jwt.config";

export interface AuthPayload extends JwtPayload {
  id: string;
  email?: string;
  isTeacher?: boolean;
  isStudent?: boolean;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthPayload;
}

export interface CustomRequest extends Request {
  token: string | JwtPayload;
  userId: string | JwtPayload;
}

/**
 * Middleware: Verify JWT and attach user payload to request.
 */
export const isAuth = (req: CustomRequest | Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader) {
      res.status(401).json({ message: "No authorization header found" });
      return;
    }

    // Extract token (Bearer <token>)
    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Token not provided" });
      return;
    }

    // Verify token validity
    const decoded = jwt.verify(token, JWT_CONFIG.SECRETS, JWT_CONFIG.VERIFY_OPTIONS) as AuthPayload;

    // Attach decoded user data to request
    (req as CustomRequest).userId = decoded.id as unknown as string;

    // Proceed to next middleware or controller
    next();
  } catch (err: any) {
    console.error("JWT verification failed:", err.message);

    if (err.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token expired" });
      return;
    }

    if (err.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    res.status(500).json({ message: "Internal authentication error", error: err.message });
  }
};

export default isAuth;