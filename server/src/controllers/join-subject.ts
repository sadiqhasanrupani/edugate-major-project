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
import Teacher, { TeacherData as TeacherField } from "../models/teacher";
import JoinAssignment from "../models/join-assignment";
import Assignment from "../models/assignment";
import { Op } from "sequelize";
import { log } from "console";

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
          student_id: studentJoinClassData.student?.student_id,
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
        order: [["createdAt", "ASC"]],
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
          student_id: studentJoinClassData.student?.student_id,
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

export const getSubjectTeachersStudentsAssignments = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    //^ getting the join-subject-id
    const { joinSubjectId } = (req as Req).params;
    const { userId } = req as CustomRequest;

    const teacher = await Teacher.findOne({
      where: {
        teacher_id: userId,
      },
    });

    if (!teacher) {
      return res.status(401).json({ message: "Unauthorized teacher ID." });
    }

    const teacherData = teacher as TeacherField;

    const teacherJoinSubject = await JoinSubject.findOne({
      where: {
        join_subject_id: joinSubjectId,
      },
      include: [{ model: Subject }],
    });

    if (!teacherJoinSubject) {
      return res.status(401).json({ message: "Unauthorized teacher ID." });
    }

    const joinSubjectData = teacherJoinSubject as JoinSubjectEagerField;

    //^ getting all teachers from the join-subject record
    const teachersJoinSubject = await JoinSubject.findAll({
      where: {
        subject_id: joinSubjectData.subject_id,
        admin_teacher_id: null,
        student_id: null,
      },
      include: [{ model: Teacher, as: "coTeacher" }],
    });

    //^ getting all students from the join-subject record
    const studentsJoinSubject = await JoinSubject.findAll({
      where: {
        subject_id: joinSubjectData.subject_id,
        classroom_id: joinSubjectData.classroom_id,
        admin_teacher_id: null,
        co_teacher_id: null,
      },
      include: [{ model: Student }],
    });

    //^ getting all assignments inside the join-subject record
    const assignments = await JoinAssignment.findAll({
      where: {
        subject_id: joinSubjectData.subject_id,
        student_id: null,
      },
      include: [
        { model: Assignment, include: [{ model: Teacher }] },
        { model: Subject },
      ],
    });

    return res.status(200).json({
      teachers: teachersJoinSubject,
      students: studentsJoinSubject,
      assignments,
      subjectName: joinSubjectData.subject.subject_name,
      subjectId: joinSubjectData.subject.subject_id,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const getJoinSubjectData = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    const { userId } = req as CustomRequest;
    const { joinSubjectId } = (req as Req).params;

    const userJoinSubject: JoinSubjectEagerField | unknown =
      await JoinSubject.findOne({
        where: {
          join_subject_id: joinSubjectId,
          [Op.or]: {
            admin_teacher_id: userId,
            co_teacher_id: userId,
            student_id: userId,
          },
        },
        include: [{ model: Subject }],
      });

    if (!userJoinSubject) {
      return res
        .status(403)
        .json({ message: "Forbidden to using this feature" });
    }

    const userJoinSubjectData = userJoinSubject as JoinSubjectEagerField;

    return res.status(200).json({
      subjectName: userJoinSubjectData.subject.subject_name,
      subjectId: userJoinSubjectData.subject.subject_id,
      userJoinSubjectData,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const getParticipantsForStudents = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    const { userId } = req as CustomRequest;

    const { joinSubjectId } = (req as Req).params;

    const student = await Student.findOne({
      where: {
        student_id: userId,
      },
    });

    if (!student) {
      return res.status(401).json({ message: "Unauthorized student ID." });
    }

    const studentData = student as StudentField;

    const joinSubject = await JoinSubject.findOne({
      where: {
        join_subject_id: joinSubjectId,
      },
    });

    if (!joinSubject) {
      return res.status(401).json({ message: "Unauthorized join_subject ID." });
    }

    const joinSubjectData = joinSubject as JoinSubjectField;

    //^ getting teachers from the joinSubject data
    const joinSubjectTeachers = await JoinSubject.findAll({
      where: {
        student_id: null,
        subject_id: joinSubjectData.subject_id,
      },
      include: [
        { model: Teacher, as: "adminTeacher" },
        { model: Teacher, as: "coTeacher" },
      ],
    });

    const joinSubjectTeachersData =
      joinSubjectTeachers as Array<JoinSubjectEagerField>;

    //^ getting all participated students from the joinSubject Data.
    const joinSubjectStudents = await JoinSubject.findAll({
      where: {
        admin_teacher_id: null,
        co_teacher_id: null,
        subject_id: joinSubjectData.subject_id,
      },
      include: [{ model: Student }],
    });

    const joinSubjectStudentsData =
      joinSubjectStudents as Array<JoinSubjectEagerField>;

    return res
      .status(200)
      .json({
        teachersData: joinSubjectTeachersData,
        studentsData: joinSubjectStudentsData,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error });
  }
};
