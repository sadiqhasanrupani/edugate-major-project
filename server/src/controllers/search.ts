import { Request as Req, Response as Res, NextFunction as Next } from "express";

import { Op } from "sequelize";

import { CustomRequest as AuthRequest } from "../middlewares/is-auth";

//^ models
import Teacher, { TeacherData as TeacherField } from "../models/teacher";
import Classroom from "../models/classroom";
import Assignment from "../models/assignment";
import Quiz from "../models/quiz";
import JoinSubject from "../models/joinSubject";
import Subject from "../models/subject";

export const getAllSearchForAdminTeacher = async (
  req: AuthRequest | Req,
  res: Res,
  next: Next
) => {
  try {
    const { userId } = req as AuthRequest;

    const { searchData } = (req as Req).body;

    const teacher = await Teacher.findOne({
      where: {
        teacher_id: userId,
      },
    });

    if (!teacher) {
      return res.status(401).json({ message: "Unauthorized teacher ID." });
    }

    const teacherData = teacher as TeacherField;

    const classrooms = await Classroom.findAll({
      where: {
        classroom_name: {
          [Op.like]: `%${searchData}%`,
        },
        admin_teacher_id: teacherData.teacher_id,
      },
    });

    const subjects = await JoinSubject.findAll({
      where: {
        student_id: null,
        co_teacher_id: null,
      },
      include: [
        {
          model: Subject,
          where: {
            subject_name: { [Op.like]: `%${searchData}%` },
            teacher_id: teacherData.teacher_id,
          },
        },
        {
          model: Classroom,
          attributes: [
            "classroom_id",
            "classroom_name",
            "classroom_profile_img",
          ],
          where: { admin_teacher_id: teacherData.teacher_id },
        },
      ],
    });

    const assignments = await Assignment.findAll({
      where: {
        topic: {
          [Op.like]: `%${searchData}%`,
        },
      },
      include: [
        {
          model: Classroom,
          attributes: [
            "classroom_id",
            "classroom_name",
            "classroom_profile_img",
          ],
          where: { admin_teacher_id: teacherData.teacher_id },
        },
        { model: Subject, attributes: ["subject_id", "subject_name"] },
      ],
    });

    const quizzes = await Quiz.findAll({
      where: {
        title: {
          [Op.like]: `%${searchData}%`,
        },
      },

      include: [
        {
          model: Classroom,
          attributes: [
            "classroom_id",
            "classroom_name",
            "classroom_profile_img",
          ],
          where: { admin_teacher_id: teacherData.teacher_id },
        },
        { model: Subject, attributes: ["subject_id", "subject_name"] },
      ],
    });

    return res.status(200).json({ classrooms, subjects, assignments, quizzes });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
