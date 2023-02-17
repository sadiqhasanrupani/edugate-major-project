import { Request as Req, Response as Res, NextFunction as Next } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isAuth = (req: { userId: string; Req: Req }, res: Res, next: Next) => {
  const authHeader = req.Req.get("Authorization");

  if (!authHeader) {
    const error: any = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader?.toString().split(" ")[1];
  let decodedToken: any;
  try {
    decodedToken = jwt.verify(
      token as string,
      process.env.SECRET_TOKEN as string
    );
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error: Error | any = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};

export default isAuth;
