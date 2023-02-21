import {
  Request as Req,
  Response as Res,
  NextFunction as Next,
} from "express"
export const getTeacher = (req: Req, res: Res, next: Next) => {
  res.json({message: "Teacher Logged in successfully."})
}