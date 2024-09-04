import { Request as Req, Response as Res, NextFunction as Next } from "express";

//^ interface
import { CustomRequest } from "../middlewares/is-auth";

//^ models
import Student, { StudentField } from "../models/student";
import JoinClassroom, {
  JoinClassroomData as JoinClassroomField,
} from "../models/joinClassroom";
import OptionalSubject, {
  OptionalSubjectEagerField,
  OptionalSubjectField,
} from "../models/optionalSubject";
import Subject from "../models/subject";
import JoinOptionalSubject, {
  JoinOptionalSubjectField,
} from "../models/joinOptionalSubject";
import { Op } from "sequelize";

export const getOptionalSubject = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    const { joinClassId } = (req as Req).params;
    //^ getting the current user from the is-auth middleware
    const studentId = (req as CustomRequest).userId;

    //^ Checking if the current user is studentId.
    const student: StudentField | unknown = await Student.findOne({
      where: {
        student_id: studentId,
      },
    });

    if (!student) {
      return res.status(401).json({ message: "Unauthorized student id." });
    }

    //^ storing the student data into the studentData constant
    const studentData = student as StudentField;

    //^ checking that the join-class-id is exists in the join-classroom or not.
    const joinClassroom: JoinClassroomField | unknown =
      await JoinClassroom.findOne({
        where: {
          join_classroom_id: joinClassId,
        },
      });

    if (!joinClassroom) {
      return res
        .status(401)
        .json({ message: "Unauthorized join-classroom id." });
    }

    const joinClassData = joinClassroom as JoinClassroomField;

    //^ checking if there is any joinOptionalSubject record which is related to the same student id and join-class id.
    const joinOptionalSubjects:
      | Array<JoinOptionalSubjectField>
      | Array<unknown> = await JoinOptionalSubject.findAll({
      where: {
        join_classroom_id: joinClassData.join_classroom_id,
        student_id: studentData.student_id,
      },
    });

    const joinOptionalSubjectsData =
      joinOptionalSubjects as Array<JoinOptionalSubjectField>;

    let joinOptionalSubjectIds: Array<string> = [];

    if (joinOptionalSubjectsData.length !== 0) {
      for (const joinOptionalSubject of joinOptionalSubjectsData) {
        joinOptionalSubjectIds.push(
          joinOptionalSubject.optional_subject_id as string
        );
      }
    }

    //^ getting the optionalSubject from optional_subject record.
    const optionalSubject: Array<OptionalSubjectEagerField> | Array<unknown> =
      await OptionalSubject.findAll({
        where: {
          classroom_id: joinClassData.classroom_id,
          optional_subject_id: {
            [Op.notIn]: joinOptionalSubjectIds,
          },
          subject_id_1: {
            [Op.not]: null,
          },
          subject_id_2: {
            [Op.not]: null,
          },
        },
        include: [
          { model: Subject, as: "subjectOne" },
          { model: Subject, as: "subjectTwo" },
        ],
      });

    const optionalSubData = optionalSubject as Array<OptionalSubjectEagerField>;

    return res.status(200).json({ optionalSubData });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};
