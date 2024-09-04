import { Request as Req, Response as Res, NextFunction as Next } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export interface CustomRequest extends Request {
  token: string | JwtPayload;
  userId: string | JwtPayload;
}

const isAuth = (req: CustomRequest | Req, res: Res, next: Next) => {
  const authHeader = (req as Req).get("Authorization");

  if (!authHeader) {
    res.status(401).json({ message: "Not authenticated" });
  }

  const token = authHeader?.toString().split(" ")[1];
  let decodedToken: any;
  try {
    decodedToken = jwt.verify(
      token as string,
      process.env.SECRET_TOKEN as string
    );
  } catch (err) {
    res.status(500).json({ error: err });
  }

  if (!decodedToken) {
    res.status(401).json({ message: "Not authenticated" });
  }

  (req as CustomRequest).userId = decodedToken.id;

  next();
};

export default isAuth;
