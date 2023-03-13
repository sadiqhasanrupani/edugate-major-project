import { Request as Req, Response as Res, NextFunction as Next } from "express";

//* middleware
import { CustomRequest } from "../middlewares/is-auth";
import Classroom from "../models/classroom";

//* models
import Teacher from "../models/teacher";

//* utils
import socket from "../utils/helper/socket";

// export const getTeacherInvitations = async (
//   req: Req | CustomRequest,
//   res: Res,
//   next: Next
// ) => {
//   const userId = (req as CustomRequest).userId;

//   try {
//     const notificationData = await Notification.findAll({
//       where: {
//         teacher_id: userId,
//       },
//       include: [{ model: Teacher }, { model: Classroom }],
//     });

//     if (!notificationData) {
//       return res
//         .status(401)
//         .json({ errorMessage: "Cannot find the data in the database" });
//     }

//     res
//       .status(200)
//       .json({ message: "Data got successfully", notificationData });
//   } catch (err) {
//     return res.status(500).json({ error: err });
//   }
// };
