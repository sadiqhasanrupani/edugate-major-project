import { Request as Req, Response as Res, NextFunction as Next } from "express";

//* middleware
import { CustomRequest } from "../middlewares/is-auth";

//^ models
import Teacher, { TeacherData as TeacherField } from "../models/teacher";
import Classroom from "../models/classroom";
import Notification, { NotificationFields } from "../models/notification";

export const getTeacherNotifications = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    //^ getting the current user through the is-auth middleware
    const { userId } = req as CustomRequest;

    //^ checking whether the current user is teacher or not.
    const teacher: TeacherField | unknown = await Teacher.findOne({
      where: {
        teacher_id: userId,
      },
    });

    if (!teacher) {
      return res.status(401).json({ message: "Unauthorized teacher ID." });
    }

    const teacherData = teacher as TeacherField;

    //^ getting all the notifications related to the current teacher.
    const notifications: NotificationFields | unknown =
      await Notification.findAll({
        where: {
          receiver_teacher_id: teacherData.teacher_id,
        },
      });

    return res.status(200).json({ notifications });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const getStudentNotifications = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    //^ getting the current user through the is-auth middleware
    const { userId } = req as CustomRequest;

    return res.status(200).json({ message: "Bruh" });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};
