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

import Student from "../models/student";
import Subject from "../models/subject";

import OptionalSubject, { OptionalSubjectEagerField } from "../models/optionalSubject";

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
          },
        ],
      });

    //^ Now getting all optional subjects which is related to the current student.
    // const optionalSubject: Array<OptionalSubjectEagerField> | Array<unknown> =
    //   await JoinSubject.findAll({
    //     where: {
    //       join_classroom_id: joinClassroomData.join_classroom_id,
    //       student_id: studentJoinClassData.student.student_id,
    //     },
    //     include: [
    //       {
    //         model: Subject,
    //         where: {
    //           subject_status: "optional",
    //         },
    //       },
    //     ],
    //   });

    return res.status(200).json({
      compulsorySubjects,
      // optionalSubject,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};
