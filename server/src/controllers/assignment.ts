import { Request as Req, Response as Res, NextFunction as Next } from "express";
import multer from "multer";
import { CustomRequest } from "../middlewares/is-auth";
import { log } from "console";
import { Op } from "sequelize";
import { v4 as alphaNumGenerator } from "uuid";

//^ utils
import filePathFilter from "../utils/helper/imagePathFilter";

//^ models
import Teacher, { TeacherData as TeacherField } from "../models/teacher";

import JoinSubject, {
  JoinSubjectField,
  JoinSubjectEagerField,
} from "../models/joinSubject";

import Subject, { SubjectData as SubjectField } from "../models/subject";

import Assignment, {
  AssignmentEagerField,
  AssignmentField,
} from "../models/assignment";

import Student from "../models/student";

import JoinAssignment, { JoinAssignmentField } from "../models/join-assignment";

//^ Create Assignment Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assignment-files");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req: Req, file: Express.Multer.File, cb: any) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/vnd.ms-excel" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.mimetype === "application/msword" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype === "application/vnd.ms-powerpoint" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
    file.mimetype === "image/svg+xml"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const createAssignmentUpload = multer({ storage, fileFilter });

export const postCreateAssignment = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    const {
      totalMarks,
      assignmentTopic,
      assignmentDescription,
      startTime,
      endTime,
      subjectId,
    } = (req as Req).body;

    const files = (req as Req).files;

    const filesData: Array<object> = [];

    //^ getting the current user id from the is-auth middleware.
    const userId = (req as CustomRequest).userId;

    if (!Array.isArray(files)) {
      log("\n Cannot map the file \n");
    } else {
      files.map((file) => {
        //^ filtering the file path like this, http://hostAddress/file.path.
        const filteredPath = filePathFilter(file.path);
        //^ pushing the path tot the filePaths array in every iteration.
        filesData.push({ path: filteredPath, name: file.originalname });
      });
    }

    //^ checking if the current user is teacher or not.
    const teacher: TeacherField | unknown = await Teacher.findOne({
      attributes: ["teacher_id", "teacher_first_name", "teacher_last_name"],
      where: {
        teacher_id: userId,
      },
    });

    if (!teacher) {
      return res.status(401).json({ message: "Unauthorized teacher ID." });
    }

    const teacherData = teacher as TeacherField;

    //^ checking if the subject ID is valid.
    const subject: SubjectField | unknown = await Subject.findOne({
      where: {
        subject_id: subjectId,
      },
    });

    if (!subject) {
      return res.status(401).json({ message: "Unauthorized subject ID." });
    }

    const subjectData = subject as SubjectField;

    //^ checking that the teacher is joined the current subject or not.
    const teacherJoinSubject: JoinSubjectField | unknown =
      await JoinSubject.findOne({
        where: {
          admin_teacher_id: userId,
          subject_id: subjectId,
        },
      });

    if (!teacherJoinSubject) {
      return res.status(401).json({
        message: "Unauthorized teacher which is not join the current subject",
      });
    }

    const teacherJoinSubjectData = teacherJoinSubject as JoinSubjectField;

    //^ now we will insert the data into the assignment record.
    const assignment: AssignmentField | unknown = await Assignment.create({
      assignment_id: alphaNumGenerator(),
      topic: assignmentTopic,
      total_marks: totalMarks,
      description: assignmentDescription,
      start_date: startTime,
      end_date: endTime,
      files: filesData,
      created_by: teacherData.teacher_id,
      classroom_id: teacherJoinSubjectData.classroom_id,
      subject_id: subjectData.subject_id,
    });

    if (!assignment) {
      return res.status(400).json({
        message:
          "Cannot able to create a new field inside the assignment record",
      });
    }

    const assignmentData = assignment as AssignmentField;

    //^ getting all the students which is inside the current assignment subject.
    const joinSubjectStudents: Array<JoinSubjectEagerField> | Array<unknown> =
      await JoinSubject.findAll({
        attributes: ["join_subject_id"],
        where: {
          subject_id: assignmentData.subject_id,
          classroom_id: assignmentData.classroom_id,
          admin_teacher_id: null,
          co_teacher_id: null,
        },
        include: [{ model: Student, attributes: ["student_id"] }],
      });

    const joinSubjectStudentsData =
      joinSubjectStudents as Array<JoinSubjectEagerField>;

    //^ getting all student ID.
    const studentIds: Array<string> = [];

    for (const joinSubjectStudent of joinSubjectStudentsData) {
      studentIds.push(joinSubjectStudent.student.student_id as string);
    }

    //^ also getting all students into the join-assignment which is already joined the current assignment subject.
    for (const studentId of studentIds) {
      //^ joining the student into the join-assignment record in every iteration
      JoinAssignment.create({
        join_assignment_id: alphaNumGenerator(),
        assignment_id: assignmentData.assignment_id,
        student_id: studentId,
        subject_id: subjectData.subject_id,
      });
    }

    //^ Also joining the teacher into the join_assignments record
    const joinAssignment = await JoinAssignment.create({
      join_assignment_id: alphaNumGenerator(),
      assignment_id: assignmentData.assignment_id,
      teacher_id: userId,
      subject_id: subjectData.subject_id,
    });

    return res.status(200).json({
      message: `${assignmentData.topic} assignment created successfully.`,
      studentIds,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server error", error: e });
  }
};

export const getAssignmentForTeacher = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    const { subjectId } = (req as Req).params;
    const userId = (req as CustomRequest).userId;

    //^ checking that the current userId is teacher's ID or not.
    const teacher: TeacherField | unknown = await Teacher.findOne({
      where: {
        teacher_id: userId,
      },
    });

    if (!teacher) {
      return res.status(401).json({ message: "Unauthorized teacher ID." });
    }

    const teacherData = teacher as TeacherField;

    //^ checking that the received subjectId is real or not.
    const subject: SubjectField | unknown = await Subject.findOne({
      where: {
        subject_id: subjectId,
      },
    });

    if (!subject) {
      return res.status(401).json({ message: "Unauthorized subject ID." });
    }

    const subjectData = subject as SubjectField;

    //^ checking that the current teacher is added into the current subject.
    const teacherJoinSubject: JoinSubjectField | unknown =
      await JoinSubject.findOne({
        where: {
          [Op.or]: {
            admin_teacher_id: userId,
            co_teacher_id: userId,
          },
          subject_id: subjectId,
        },
      });

    if (!teacherJoinSubject) {
      return res
        .status(401)
        .json({ message: "Unauthorized to get the assignment data." });
    }

    const teacherJoinSubjectData = teacherJoinSubject as JoinSubjectField;

    //^ getting all the assignments record which is related to given subject ID and the teacher ID.

    interface assignmentsObj {
      rows?: Array<AssignmentEagerField>;
      count?: number;
    }

    const assignments: assignmentsObj = await Assignment.findAndCountAll({
      attributes: ["assignment_id", "topic", "end_date"],
      where: {
        created_by: teacherData.teacher_id,
        subject_id: subjectData.subject_id,
        classroom_id: teacherJoinSubjectData.classroom_id,
      },
      order: [["createdAt", "ASC"]],
    });

    if (!assignments) {
      return res
        .status(401)
        .json({ message: "Unauthorized to get the assignment record." });
    }

    const assignmentData = assignments as assignmentsObj;

    return res.status(200).json({
      assignmentData: assignmentData.rows,
      count: assignmentData.count,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const getAssignment = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    const { assignmentId } = (req as Req).params;
    const userId = (req as CustomRequest).userId;

    //^ checking whether the assignmentId is their in the assignment record or not.
    const assignment: AssignmentField | unknown = await Assignment.findOne({
      where: {
        assignment_id: assignmentId,
      },
    });

    if (!assignment) {
      return res.status(401).json({ message: "Unauthorized assignment ID." });
    }

    const assignmentData = assignment as AssignmentField;

    //^ checking whether the current user-id is joined in the current subject
    const userJoinSubject: JoinSubjectField | unknown =
      await JoinSubject.findOne({
        where: {
          [Op.or]: {
            admin_teacher_id: userId,
            co_teacher_id: userId,
            student_id: userId,
          },
          classroom_id: assignmentData.classroom_id,
          subject_id: assignmentData.subject_id,
        },
      });

    if (!userJoinSubject) {
      return res
        .status(403)
        .json({ message: "You are forbidden to get the assignment data." });
    }

    const userJoinSubjectData = userJoinSubject as JoinSubjectField;

    //^ Also checking that the current person is joined in the current assignment.
    const joinAssignment: JoinAssignmentField | unknown =
      await JoinAssignment.findOne({
        where: {
          [Op.or]: {
            student_id: userId,
            teacher_id: userId,
          },
          subject_id: userJoinSubjectData.subject_id,
        },
      });

    if (!joinAssignment) {
      return res.status(403).json({ message: "Forbidden" });
    }

    return res.status(200).json({
      assignment: assignmentData,
      assignmentName: assignmentData.topic,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};
