import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { CustomRequest } from "../middlewares/is-auth";

//^ model
import SubmittedAssignment, {
  SubmittedAssignEagerField,
} from "../models/submitted-assignment";
import Teacher, { TeacherData as TeacherField } from "../models/teacher";
import Assignment, { AssignmentField } from "../models/assignment";
import JoinAssignment, {
  JoinAssignmentEagerField,
} from "../models/join-assignment";
import Subject from "../models/subject";
import Student from "../models/student";
import Classroom from "../models/classroom";

export const getSubmittedAssignments = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    //^ getting the user-id
    const { userId } = req as CustomRequest;
    //^ grabbing the assignment id from the params request.
    const { params } = req as Req;
    const { assignmentId } = params;

    //^ checking that whether the current user is a teacher or not.
    const teacher: TeacherField | unknown = await Teacher.findOne({
      where: {
        teacher_id: userId,
      },
    });

    if (!teacher) {
      return res.status(401).json({ message: "Unauthorized teacher ID." });
    }

    const teacherData = teacher as TeacherField;

    const assignment: AssignmentField | unknown = await Assignment.findOne({
      where: {
        assignment_id: assignmentId,
      },
    });

    if (!assignment) {
      return res.status(401).json({ message: "Unauthorized assignment ID." });
    }

    const assignmentData = assignment as AssignmentField;

    //^ getting the submitted assignment by using the assignment id.
    const submittedAssignments: Array<SubmittedAssignEagerField> | unknown =
      await SubmittedAssignment.findAll({
        where: {
          assignment_id: assignmentData.assignment_id,
        },
        include: [
          { model: Teacher },
          { model: Assignment },
          {
            model: Subject,
            attributes: ["subject_id", "subject_name"],
            include: [
              {
                model: Classroom,
                attributes: ["classroom_id", "classroom_name"],
              },
            ],
          },
          { model: Student },
        ],
        order: [["grade", "DESC"]],
      });

    //^ getting all joined-assignment by using the assignment id.
    const joinedAssignments: Array<JoinAssignmentEagerField> | unknown =
      await JoinAssignment.findAll({
        where: {
          assignment_id: assignmentData.assignment_id,
          teacher_id: null,
          subject_id: assignmentData.subject_id,
        },
        include: [
          { model: Assignment },
          {
            model: Subject,
            attributes: ["subject_name"],
            include: [{ model: Classroom, attributes: ["classroom_name"] }],
          },
          {
            model: Student,
            attributes: [
              "student_id",
              "student_first_name",
              "student_last_name",
              "student_email",
            ],
          },
          {
            model: SubmittedAssignment,
            attributes: ["submitted_assignment_id"],
          },
        ],
      });

    return res.status(200).json({ submittedAssignments, joinedAssignments });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};
