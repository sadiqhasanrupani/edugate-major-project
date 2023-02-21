import { Request as Req, Response as Res, NextFunction as Next } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isAuth = (req: any, res: Res, next: Next) => {
  const authHeader = req.get("Authorization");  

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

  req.userId = decodedToken.userId;
  next();
};

export default isAuth;
