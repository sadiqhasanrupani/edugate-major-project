import { Request as Req, Response as Res, NextFunction as Next } from "express";

//^ interface
import { CustomRequest } from "../middlewares/is-auth";

//^ models
import JoinSubject, {
  JoinSubjectField,
  JoinSubjectEagerField,
} from "../models/joinSubject";

import JoinClassroom, {
  JoinClassroomEagerField,
  JoinClassroomData as JoinClassroomField,
} from "../models/joinClassroom";

import Student, { StudentField } from "../models/student";
import Subject from "../models/subject";

import OptionalSubject, {
  OptionalSubjectEagerField,
} from "../models/optionalSubject";

export const getJoinedSubjectsForStudent = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    /*
      ^ getting the join-class-id from the params request 
      ^ and also getting the current student id from the isAuth middleware
    */
    const { joinClassId } = (req as Req).params;
    const studentId = (req as CustomRequest).userId;

    //^ Checking weather the join-class-id is exists in the join-classroom.
    const joinClassroom: JoinClassroomField | unknown =
      await JoinClassroom.findOne({
        attributes: ["join_classroom_id"],
        where: {
          join_classroom_id: joinClassId,
        },
      });

    if (!joinClassroom) {
      return res
        .status(401)
        .json({ message: "Unauthorized join-classroom id." });
    }

    //^ all good then storing the joinClassroom data into the joinClassroomData constant
    const joinClassroomData = joinClassroom as JoinClassroomField;

    //^ Also checking that the current student id is inside the join-classroom record.

    const studentJoinClass: JoinClassroomEagerField | unknown =
      await JoinClassroom.findOne({
        attributes: ["join_classroom_id"],
        where: {
          join_classroom_id: joinClassId,
          student_id: studentId,
        },
        include: [{ model: Student }],
      });

    if (!studentJoinClass) {
      return res.status(401).json({ message: "Unauthorized ID access." });
    }

    //^ If all good then will store the data into the StudentJoinClassData constant
    const studentJoinClassData = studentJoinClass as JoinClassroomEagerField;

    //^ now getting all compulsory subject which is related to the current student.
    const compulsorySubjects: Array<JoinSubjectEagerField> | Array<unknown> =
      await JoinSubject.findAll({
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "admin_teacher_id",
            "co_teacher_id",
          ],
        },
        where: {
          join_classroom_id: joinClassroomData.join_classroom_id,
          student_id: studentJoinClassData.student.student_id,
        },
        include: [
          {
            model: Subject,
            where: {
              subject_status: "compulsory",
            },
            attributes: ["subject_id", "subject_name", "subject_status"],
          },
        ],
        order: [["createdAt", "ASC"]]
      });

    //^ Now getting all optional subjects which is related to the current student.
    const optionalSubjects: Array<OptionalSubjectEagerField> | Array<unknown> =
      await JoinSubject.findAll({
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "admin_teacher_id",
            "co_teacher_id",
          ],
        },
        where: {
          join_classroom_id: joinClassroomData.join_classroom_id,
          student_id: studentJoinClassData.student.student_id,
        },
        include: [
          {
            model: Subject,
            where: {
              subject_status: "optional",
            },
            attributes: ["subject_id", "subject_name", "subject_status"],
          },
        ],
        order: [["createdAt", "ASC"]],
      });

    return res.status(200).json({
      compulsorySubjects,
      optionalSubjects,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const getJoinSubject = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    const { joinSubjectId } = (req as Req).params;
    const userId = (req as CustomRequest).userId;

    //^ checking whether the userId is student Id or not.
    const student: StudentField | unknown = await Student.findOne({
      where: {
        student_id: userId,
      },
    });

    if (!student) {
      return res.status(401).json({ message: "Unauthorized Student ID." });
    }

    const studentData = student as StudentField;

    //^ checking whether the given joinSubjectId is real or not in inside the joinSubject record and also checking the the current student is joined into that joinSubject record.
    const studentJoinSubject: JoinSubjectEagerField | unknown =
      await JoinSubject.findOne({
        where: {
          join_subject_id: joinSubjectId,
          student_id: studentData.student_id,
        },
        include: [{ model: Subject }],
      });

    if (!studentJoinSubject) {
      return res.status(401).json({
        message: "Unauthorized student to get into the given join-subject ID.",
      });
    }

    const subjectJoinSubjectData = studentJoinSubject as JoinSubjectEagerField;

    //^ Also checking that the join-subject ID is real or not
    const joinSubject: JoinSubjectField | unknown = await JoinSubject.findOne({
      where: {
        join_subject_id: joinSubjectId,
      },
    });

    if (!joinSubject) {
      return res.status(401).json({ message: "Unauthorized join subject ID." });
    }

    return res.status(200).json({
      subject: subjectJoinSubjectData.subject,
      join_classroom_id: subjectJoinSubjectData.join_classroom_id,
      classroom_id: subjectJoinSubjectData.classroom_id,
    });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
