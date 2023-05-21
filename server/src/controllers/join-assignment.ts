import { Request as Req, Response as Res, NextFunction as Next } from "express";

//^ interface
import { CustomRequest } from "../middlewares/is-auth";

//^ models
import Assignment, { AssignmentField } from "../models/assignment";
import JoinAssignment from "../models/join-assignment";
import Student from "../models/student";

export const getJoinAssignmentStudents = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    const { userId } = req as CustomRequest;
    const { assignmentId } = (req as Req).params;

    const assignment: AssignmentField | unknown = await Assignment.findOne({
      where: {
        assignment_id: assignmentId,
      },
    });

    if (!assignment) {
      return res.status(401).json({ message: "Unauthorized assignment ID." });
    }

    const assignmentData = assignment as AssignmentField;

    const joinStudentAssignment = await JoinAssignment.findAll({
      where: {
        assignment_id: assignmentData.assignment_id,
        teacher_id: null,
        subject_id: assignmentData.subject_id,
      },
      include: [{ model: Student }],
    });

    return res.status(200).json({ joinStudentAssignment });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};
