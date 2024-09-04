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

import Student, { StudentField } from "../models/student";

import JoinAssignment, {
  JoinAssignmentEagerField,
  JoinAssignmentField,
} from "../models/join-assignment";

import Notification, { NotificationFields } from "../models/notification";

import SubmittedAssignment, {
  SubmittedAssignEagerField,
  SubmittedAssignmentField,
} from "../models/submitted-assignment";
import Classroom, {
  ClassroomData as ClassroomField,
} from "../models/classroom";

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

const submittedAssignmentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/submitted-assignment-files");
  },
  filename: (req, file, callback) => {
    const date = new Date().toISOString().slice(0, 10);
    callback(null, `${date}-${file.originalname}`);
  },
});

export const uploadSubmittedAssignmentFile = multer({
  storage: submittedAssignmentStorage,
  fileFilter,
});

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
        filesData.push({
          path: filteredPath,
          name: file.filename,
          original_name: file.originalname,
        });
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

    //^ now getting the current assignment which we have created.
    const getAssignment: AssignmentEagerField | unknown =
      await Assignment.findOne({
        where: {
          assignment_id: assignmentData.assignment_id,
        },
        include: [{ model: Teacher }],
      });

    const getAssignmentData = getAssignment as AssignmentEagerField;

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

    //^ Notification message
    const notificationMsg = `<p>You have got a ${assignmentData.topic} assignment from ${getAssignmentData.teacher?.teacher_first_name} ${getAssignmentData.teacher?.teacher_last_name} in ${subjectData.subject_name}</p>`;

    //^ also getting all students into the join-assignment which is already joined the current assignment subject.
    for (const studentId of studentIds) {
      //^ joining the student into the join-assignment record in every iteration
      JoinAssignment.create({
        join_assignment_id: alphaNumGenerator(),
        assignment_id: assignmentData.assignment_id,
        student_id: studentId,
        subject_id: subjectData.subject_id,
      });

      const notification = await Notification.create({
        notification_id: alphaNumGenerator(),
        notification_msg: notificationMsg,
        action: "ASSIGNED_ASSIGNMENT",
        sender_teacher_id: assignmentData.created_by,
        receiver_student_id: studentId,
        read: false,
        render_ids: { assignment_id: assignmentData.assignment_id },
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

    const assignments: AssignmentField | unknown =
      await Assignment.findAndCountAll({
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
      include: [{ model: Classroom }, { model: Subject }],
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

export const getJoinedAssignmentStudents = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    const { joinSubjectId } = (req as Req).params;

    //^ getting the current user data
    const userId = (req as CustomRequest).userId;

    //^ checking if the received join_subject_id is present in the join_subject record;
    const joinSubject: JoinSubjectField | unknown = await JoinSubject.findOne({
      attributes: ["join_subject_id"],
      where: {
        join_subject_id: joinSubjectId,
      },
    });

    if (!joinSubject) {
      return res.status(401).json({ message: "Unauthorized join_subject ID." });
    }

    //^ checking if the current user joined in the current subject.
    const userJoinSubject: JoinSubjectEagerField | unknown =
      await JoinSubject.findOne({
        where: {
          join_subject_id: joinSubjectId,
          [Op.or]: {
            co_teacher_id: userId,
            student_id: userId,
          },
        },
        include: [{ model: Subject }],
      });

    if (!userJoinSubject) {
      return res
        .status(403)
        .json({ message: "Current user is forbidden to use this feature" });
    }

    const joinSubjectData = userJoinSubject as JoinSubjectEagerField;

    //^ now getting all the assignment which is related to the current user.
    const userJoinedAssignment:
      | Array<JoinAssignmentEagerField>
      | Array<unknown> = await JoinAssignment.findAll({
      where: {
        [Op.or]: {
          teacher_id: userId,
          student_id: userId,
        },
        subject_id: joinSubjectData.subject.subject_id,
      },
      include: [
        { model: Assignment, order: [["end_date", "DESC"]] },
        { model: Subject },
      ],
    });

    const userJoinedAssignmentData =
      userJoinedAssignment as Array<JoinAssignmentEagerField>;

    const today = new Date();
    const filteredUserJoinedAssignment = userJoinedAssignmentData.filter(
      (join) => {
        const startDate = new Date(join.assignment.start_date as Date);
        const endDate = new Date(join.assignment.end_date as Date);
        return startDate <= today && endDate >= today;
      }
    );

    return res.status(200).json({
      userJoinedAssignmentData: filteredUserJoinedAssignment,
      joinSubjectData,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const postSubmittedAssignment = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    const { assignmentId, joinSubjectId, submittedDate } = (req as Req).body;
    const { userId } = req as CustomRequest;

    //^ getting the files from the files
    const files = (req as Req).files;

    const filesData: Array<object> = [];

    if (!Array.isArray(files)) {
      log("\n Cannot map the file \n");
    } else {
      files.map((file) => {
        //^ filtering the file path like this, http://hostAddress/file.path.
        const filteredPath = filePathFilter(file.path);
        //^ pushing the path tot the filePaths array in every iteration.
        filesData.push({
          path: filteredPath,
          name: file.filename,
          original_name: file.originalname,
        });
      });
    }

    //^ checking if the current use is student or not.
    const student: StudentField | unknown = await Student.findOne({
      where: {
        student_id: userId,
      },
    });

    if (!student) {
      return res.status(401).json({ message: "Unauthorized student ID." });
    }

    const studentData = student as StudentField;

    //^ checking if the received assignmentId is valid or not.
    const assignment: AssignmentField | unknown = await Assignment.findOne({
      where: {
        assignment_id: assignmentId,
      },
    });

    if (!assignment) {
      return res.status(401).json({ message: "Unauthorized assignment ID." });
    }

    const assignmentData = assignment as AssignmentField;

    //^ checking if the current student is joined the current assignment's subject or not.
    const studentJoinSubject: JoinSubjectField | unknown =
      await JoinSubject.findOne({
        where: {
          join_subject_id: joinSubjectId,
        },
      });

    if (!studentJoinSubject) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const studentJoinSubjectData = studentJoinSubject as JoinSubjectField;

    //^ checking if the current student is joined the current assignment or not.
    const studentJoinAssignment: JoinAssignmentEagerField | unknown =
      await JoinAssignment.findOne({
        where: {
          student_id: studentData.student_id,
          assignment_id: assignmentId,
          subject_id: studentJoinSubjectData.subject_id,
        },
        include: [{ model: Subject }],
      });

    if (!studentJoinAssignment) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const studentJoinAssignmentData =
      studentJoinAssignment as JoinAssignmentEagerField;

    //^ checking whether the current user already submitted the assignment or not.
    const studentSubmittedAssignment: SubmittedAssignmentField | unknown =
      await SubmittedAssignment.findOne({
        where: {
          student_id: userId,
          assignment_id: assignmentId,
        },
      });

    if (studentSubmittedAssignment) {
      return res
        .status(401)
        .json({ message: "You already submitted the assignment." });
    }

    //^ now we will create a new field inside the submitted_assignment record
    const submittedAssignment: SubmittedAssignmentField | unknown =
      await SubmittedAssignment.create({
        submitted_assignment_id: alphaNumGenerator(),
        submitted_files: filesData,
        submitted_on: submittedDate,
        student_id: studentData.student_id,
        assignment_id: assignmentData.assignment_id,
        subject_id: studentJoinSubjectData.subject_id,
        classroom_id: studentJoinSubjectData.classroom_id,
      });

    if (!submittedAssignment) {
      return res.status(400).json({
        message: "Can't create a new field in submitted assignment record",
      });
    }

    const submittedAssignmentData =
      submittedAssignment as SubmittedAssignmentField;

    //^ now we will update the join-assignment table where we will add the submitted assignment id into the respected student's join-assignment record
    const updateStudentJoinAssignment = await JoinAssignment.update(
      {
        submitted_assignment_id:
          submittedAssignmentData.submitted_assignment_id,
      },
      {
        where: {
          student_id: studentData.student_id,
          subject_id: studentJoinSubjectData.subject_id,
          join_assignment_id: studentJoinAssignmentData.join_assignment_id,
        },
      }
    );

    //^ giving the notification to the teacher which is responsible for assigning the assignment for the submission of the assignment by the student.

    const notificationMsg = `<p>${studentData.student_first_name} ${
      studentData.student_last_name && studentData.student_last_name
    } submitted the ${assignmentData.topic} assignment of ${
      studentJoinAssignmentData.subject.subject_name
    } subject.</p>`;

    const notification = await Notification.create({
      notification_id: alphaNumGenerator(),
      notification_msg: notificationMsg,
      action: "ASSIGNMENT_SUBMISSIONS",
      render_id: {
        assignment_id: assignmentData.assignment_id,
        subject_id: studentJoinSubjectData.subject_id,
      },
      sender_student_id: studentData.student_id,
      receiver_teacher_id: assignmentData.created_by,
    });

    return res.status(200).json({
      message: `${assignmentData.topic} assignment submitted successfully.`,
      notification,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const getSubmittedAssignment = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    const { assignmentId } = (req as Req).params;
    const { userId } = req as CustomRequest;

    //^ checking whether the assignment id is valid in assignment record
    const assignment: AssignmentField | unknown = await Assignment.findOne({
      where: {
        assignment_id: assignmentId,
      },
    });

    if (!assignment) {
      return res.status(401).json({ message: "Unauthorized assignment ID." });
    }

    const assignmentData = assignment as AssignmentField;

    let submittedAssignment: SubmittedAssignEagerField | unknown =
      await SubmittedAssignment.findOne({
        where: {
          assignment_id: assignmentId,
          student_id: userId,
        },
        include: [
          { model: Teacher },
          { model: Assignment },
          { model: Student },
        ],
      });

    if (!submittedAssignment) {
      submittedAssignment = null;
    }

    const submittedAssignmentData =
      submittedAssignment !== null
        ? (submittedAssignment as SubmittedAssignEagerField)
        : null;

    return res.status(200).json({
      submittedAssignment,
      submittedAssignmentData,
      teacher:
        submittedAssignmentData !== null && submittedAssignmentData.teacher,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const getSubmittedAssignments = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    const { assignmentId, subjectId } = (req as Req).query;
    const { userId } = req as CustomRequest;

    //^ checking the user is teacher or not.
    const teacher: TeacherField | unknown = await Teacher.findOne({
      where: {
        teacher_id: userId,
      },
    });

    if (!teacher) {
      return res.status(401).json({ message: "Unauthorized teacher ID." });
    }

    const teacherData = teacher as TeacherField;

    //^ checking that the received assignment is exists or not.
    const assignment: AssignmentField | unknown = await Assignment.findOne({
      where: {
        assignment_id: assignmentId,
        created_by: teacherData.teacher_id,
      },
    });

    if (!assignment) {
      return res.status(401).json({ message: "Unauthorized assignment ID." });
    }

    const assignmentData = assignment as AssignmentField;

    //^ getting the submitted assignment records according to the assignment-id
    const submittedAssignments: Array<SubmittedAssignmentField> | unknown =
      await SubmittedAssignment.findAll({
        attributes: [
          "submitted_assignment_id",
          "assignment_id",
          "student_id",
          "subject_id",
          "assignment_id",
          "submitted_on",
          "grade",
        ],
        where: {
          assignment_id: assignmentData.assignment_id,
        },
        include: [
          {
            model: Student,
            attributes: ["student_first_name", "student_last_name"],
          },
          { model: Assignment, attributes: ["total_marks"] },
        ],
      });

    const submittedAssignmentsData =
      submittedAssignments as Array<SubmittedAssignmentField>;

    return res
      .status(200)
      .json({ submittedAssignments: submittedAssignmentsData });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const getSubmittedAssignmentBySubmit = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    const { submittedAssignmentId } = (req as Req).params;
    const { userId } = req as CustomRequest;

    //^ checking whether the received submittedAssignmentId is valid or not.
    const submittedAssignment: SubmittedAssignEagerField | unknown =
      await SubmittedAssignment.findOne({
        where: {
          submitted_assignment_id: submittedAssignmentId,
        },
        include: [
          {
            model: Student,
            attributes: [
              "student_first_name",
              "student_last_name",
              "student_img",
            ],
          },
          { model: Teacher },
          { model: Assignment },
        ],
      });

    if (!submittedAssignment) {
      return res
        .status(401)
        .json({ message: "Unauthorized submitted assignment ID." });
    }

    const submittedAssignmentData =
      submittedAssignment as SubmittedAssignEagerField;

    return res.status(200).json({
      studentFullName: `${submittedAssignmentData.student?.student_first_name} ${submittedAssignmentData.student?.student_last_name}`,
      assignment: submittedAssignmentData.assignment,
      student: submittedAssignmentData.student,
      Teacher: submittedAssignmentData.teacher,
      submittedAssignment: submittedAssignmentData,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const postAssignSubmittedAssignment = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    //^ getting the grade and feedback
    const { feedback, submittedAssignmentId } = (req as Req).body;
    const grade: number = (req as Req).body.grade;
    //^ getting the user-id
    const { userId } = req as CustomRequest;

    //^ checking that the current user-id is teacher or not.
    const teacher: TeacherField | unknown = await Teacher.findOne({
      where: {
        teacher_id: userId,
      },
    });

    if (!teacher) {
      return res.status(401).json({ message: "Unauthorized Teacher ID." });
    }

    const teacherData = teacher as TeacherField;

    //^ checking that the submitted_assignment id is valid or not.
    const submittedAssignment: SubmittedAssignEagerField | unknown =
      await SubmittedAssignment.findOne({
        where: {
          submitted_assignment_id: submittedAssignmentId,
        },
        include: [{ model: Assignment }],
      });

    if (!submittedAssignment) {
      return res
        .status(401)
        .json({ message: "Unauthorized submitted assignment ID." });
    }

    const submittedAssignmentData =
      submittedAssignment as SubmittedAssignEagerField;

    //^ getting joined subject data
    const joinedSubject: JoinSubjectField | unknown = await JoinSubject.findOne(
      {
        where: {
          subject_id: submittedAssignmentData.subject_id,
          student_id: submittedAssignmentData.student_id,
        },
      }
    );

    if (!joinedSubject) {
      return res
        .status(401)
        .json({ message: "Unauthorized joined subject ID." });
    }

    const joinSubjectData = joinedSubject as JoinSubjectField;

    //^ updating the submitted assignment record.
    const updatedSubmittedAssignment: SubmittedAssignmentField | unknown =
      SubmittedAssignment.update(
        {
          grade: grade,
          feedback: feedback,
          checked_by: teacherData.teacher_id,
        },
        {
          where: {
            submitted_assignment_id:
              submittedAssignmentData.submitted_assignment_id,
          },
        }
      );

    if (!updatedSubmittedAssignment) {
      return res
        .status(400)
        .json({ message: "Cannot update the submitted assignment record." });
    }

    const notificationMsg = `Your ${submittedAssignmentData.assignment?.topic} assignment is now graded.`;

    const notification: NotificationFields | unknown =
      await Notification.create({
        notification_id: alphaNumGenerator(),
        notification_msg: notificationMsg,
        action: "ASSIGNED ASSIGNMENT",
        render_ids: {
          join_subject_id: joinSubjectData.join_subject_id,
          assignment_id: submittedAssignmentData.assignment_id,
        },
        sender_teacher_id: teacherData.teacher_id,
        receiver_student_id: submittedAssignmentData.student_id,
      });

    return res.status(200).json({ message: `Graded the Assignment.` });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const postUpdateSubmittedAssignment = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    const { assignmentId, joinSubjectId } = (req as Req).body;
    const userId = (req as CustomRequest).userId;

    //^ getting the files from the files
    const files = (req as Req).files;

    const student: StudentField | unknown = await Student.findOne({
      where: {
        student_id: userId,
      },
    });

    if (!student) {
      return res.status(401).json({ message: "Unauthorized student ID." });
    }

    const studentData = student as StudentField;

    //^ checking whether the assignment id is in assignment record.
    const assignment: AssignmentField | unknown = await Assignment.findOne({
      where: {
        assignment_id: assignmentId,
      },
    });

    if (!assignment) {
      return res.status(401).json({ message: "Unauthorized assignment ID." });
    }

    const assignmentData = assignment as AssignmentField;

    const joinSubject = await JoinSubject.findOne({
      where: {
        join_subject_id: joinSubjectId,
      },
    });

    if (!joinSubject) {
      return res.status(401).json({ message: "Unauthorized join-subject ID." });
    }

    const joinSubjectData = joinSubject as JoinSubjectField;

    //^ finding the submitted assignment data using assignment ID and also the subject ID
    const submittedAssignment: SubmittedAssignmentField | unknown =
      await SubmittedAssignment.findOne({
        where: {
          student_id: studentData.student_id,
          assignment_id: assignmentId,
          subject_id: joinSubjectData.subject_id,
          classroom_id: joinSubjectData.classroom_id,
        },
      });

    if (!submittedAssignment) {
      return res
        .status(401)
        .json({ message: "Unauthorized submitted-subject-id ID." });
    }

    const submittedAssignmentData =
      submittedAssignment as SubmittedAssignmentField;

    const filesData: Array<object> = submittedAssignmentData.submitted_files;

    if (!Array.isArray(files)) {
      log("\n Cannot map the file \n");
    } else {
      files.map((file) => {
        //^ filtering the file path like this, http://hostAddress/file.path.
        const filteredPath = filePathFilter(file.path);
        //^ pushing the path tot the filePaths array in every iteration.
        filesData.push({
          path: filteredPath,
          name: file.filename,
          original_name: file.originalname,
        });
      });
    }

    //^ Checking if the submitted assignment has already been graded.
    if (submittedAssignmentData.grade) {
      return res.status(401).json({
        message:
          "Cannot update the assignment because it has already been graded.",
      });
    }

    const updateSubmittedAssign: AssignmentField | unknown =
      await SubmittedAssignment.update(
        {
          submitted_files: filesData,
        },
        {
          where: {
            submitted_assignment_id:
              submittedAssignmentData.submitted_assignment_id,
          },
        }
      );

    if (!updateSubmittedAssign) {
      return res.status(400).json({ message: "Cannot updated the assignment" });
    }

    return res.status(200).json({
      message: `Your ${assignmentData.topic} assignment has been successfully resubmitted!`,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const getAssignmentsForAdmin = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    const { userId } = req as CustomRequest;

    //^ checking the user id is teacher or not.
    const teacher = await Teacher.findOne({
      where: {
        teacher_id: userId,
      },
    });

    if (!teacher) {
      return res.status(500).json({ message: "Unauthorized teacher ID" });
    }

    const teacherData = teacher as TeacherField;

    //^ getting the classroom data using the current user id.
    const classrooms = await Classroom.findAll({
      where: {
        admin_teacher_id: userId,
      },
    });

    const classroomsData = classrooms as Array<ClassroomField>;

    interface assignmentDataField {
      assignmentName?: string;
      classroomName?: string;
      subjectName?: string;
      subjectID?: string;
      assignmentID?: string;
      classroomID?: string;
    }

    let assignments: Array<assignmentDataField> = [];

    if (classroomsData.length > 0) {
      for (const classroom of classroomsData) {
        const totalAssignments = await Assignment.findAll({
          where: {
            classroom_id: classroom.classroom_id,
          },
          include: [
            {
              model: Classroom,
              attributes: ["classroom_id", "classroom_name"],
              where: {
                admin_teacher_id: teacherData.teacher_id,
              },
            },
            { model: Subject, attributes: ["subject_id", "subject_name"] },
          ],
        });

        const assignmentsData = totalAssignments as Array<AssignmentEagerField>;

        if (assignmentsData.length !== 0) {
          for (const assignment of assignmentsData) {
            assignments.push({
              assignmentName: assignment.topic,
              classroomName: assignment.classroom?.classroom_name,
              subjectName: assignment.subject?.subject_name,
              subjectID: assignment.subject_id,
              assignmentID: assignment.assignment_id,
              classroomID: assignment.classroom_id,
            });
          }
        }
      }
    }

    return res.status(200).json({ assignments });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const getUpcomingAssignment = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    //^ getting current user-id from the auth middleware.
    const { userId } = req as CustomRequest;

    //^ getting the joinSubjectId from the params request
    const { joinSubjectId, studentId } = (req as Req).params;

    let studId;

    if (studentId) {
      studId = studentId;
    }

    //^ Identifying that the current user is student or not.
    const student = await Student.findOne({ where: { student_id: userId } });

    if (!student) {
      const teacher = await Teacher.findOne({ where: { teacher_id: userId } });

      if (!teacher) {
        return res.status(401).json({ message: "Unauthorized user ID." });
      }
    }

    const studentData = student as StudentField;

    studId = studentData.student_id;

    //^ Identifying the joinSubjectId from the join_subjects record.
    const joinSubject = await JoinSubject.findOne({
      where: { join_subject_id: joinSubjectId },
      include: [{ model: Subject }],
    });

    if (!joinSubject) {
      return res.status(401).json({ message: "Unauthorized join_subject ID." });
    }

    const joinSubjectData = joinSubject as JoinSubjectEagerField;

    console.log(`\n ${studId} \n`)

    //^ Get the upcoming assignments
    const currentDate = new Date();
    const upcomingAssignments = await JoinAssignment.findAll({
      where: {
        subject_id: joinSubjectData.subject_id,
        student_id: studId,
        // '$assignment.start_date$': { [Op.gt]: currentDate },
      },
      include: [
        {
          model: Assignment,
          as: "assignment",
          where: {
            start_date: { [Op.gt]: currentDate },
          },
          order: [["start_date", "DESC"]],
        },
      ],
    });

    return res.status(200).json({ upcomingAssignments });
  } catch (e) {
    res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const getAllAssignmentsStudentsScore = async (
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
      attributes: ["join_subject_id"],
      where: {
        join_subject_id: joinSubjectId,
      },
      include: [{ model: Subject, attributes: ["subject_id"] }],
    });

    if (!joinSubject) {
      return res.status(401).json({
        message: `Unauthorized to get data because current user is not a participant of the subject.`,
      });
    }

    const joinSubjectData = joinSubject as JoinSubjectEagerField;

    //^ getting joined assignment data.
    const studentJoinAssignments = await JoinAssignment.findAll({
      where: {
        subject_id: joinSubjectData.subject.subject_id,
        student_id: studentData.student_id,
      },
      include: [{ model: SubmittedAssignment }, { model: Assignment }],
      order: [["createdAt", "ASC"]],
    });

    const studentJoinAssignmentsData =
      studentJoinAssignments as Array<JoinAssignmentEagerField>;

    //^ getting the submitted assignment
    const stuSubmittedAssign = await SubmittedAssignment.findAll({
      where: {
        subject_id: joinSubjectData.subject.subject_id,
        student_id: studentData.student_id,
      },
      include: [{ model: Assignment }],
      order: [["submitted_on", "ASC"]],
    });

    // const studentSubmittedAssignment = stuSubmittedAssign as Array<SubmittedAssignEagerField>;

    //^ student all submitted assignment score array.
    const studentAssignmentsData = [];

    if (studentJoinAssignmentsData.length > 0) {
      for (const joinAssignment of studentJoinAssignmentsData) {
        let grade: number = 0;

        if (!joinAssignment.submitted_assignment_id) {
          grade = 0;
        } else {
          if (joinAssignment.submitted_assignment.grade) {
            grade = joinAssignment.submitted_assignment.grade as number;
          } else {
            grade = 0;
          }
        }

        studentAssignmentsData.push({
          grade: grade,
          totalMarks: joinAssignment.assignment.total_marks,
          assignmentName: joinAssignment.assignment.topic,
          assignmentId: joinAssignment.assignment_id,
        });
      }
    }

    return res.status(200).json({ studentAssignmentsData });
  } catch (e) {
    console.log(`\n ${e} \n`);
    res.status(500).json({ message: "Internal server error", error: e });
  }
};
