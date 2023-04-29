import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { v4 as alphaNumGenerator } from "uuid";

//^ interface
import { CustomRequest } from "../middlewares/is-auth";

//^ models
import JoinOptionalSubject, {
  JoinOptionalSubjectField,
} from "../models/joinOptionalSubject";

import Student, { StudentField } from "../models/student";

import JoinClassroom, {
  JoinClassroomData as JoinClassroomField,
} from "../models/joinClassroom";
import JoinSubject, { JoinSubjectField } from "../models/joinSubject";

export const postJoinOptionalSubjectsForStudent = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    interface optionalSubjectBodyData {
      subjectId?: string;
      subjectName?: string;
      optionalSubjectId?: string;
    }

    const optionalSubjects: Array<optionalSubjectBodyData> = (req as Req).body
      .optionalSubjects;
    const { joinClassId } = (req as Req).body;

    console.log(`\n${joinClassId}\n`);
    console.log(optionalSubjects);

    //^ getting the current user from the is-auth middleware
    const userId = (req as CustomRequest).userId;

    //^ Checking that the userId is student-id or not.
    const student: StudentField | unknown = await Student.findOne({
      where: {
        student_id: userId,
      },
    });

    if (!student) {
      return res.status(401).json({ message: "Unauthorized student ID." });
    }

    const studentData = student as StudentField;

    //^ checking that the join-optional-subject-id is real or not.
    const joinClassroom: JoinClassroomField | unknown =
      await JoinClassroom.findOne({
        where: {
          join_classroom_id: joinClassId,
        },
      });

    if (!joinClassroom) {
      return res
        .status(401)
        .json({ message: "Unauthorized join-classroom ID." });
    }

    const joinClassroomData = joinClassroom as JoinClassroomField;

    //^ also checking that the current student is joined in the respected joinClassroom record.
    const studentJoinClassroom: JoinClassroomField | unknown =
      await JoinClassroom.findOne({
        where: {
          join_classroom_id: joinClassId,
          student_id: studentData.student_id,
        },
      });

    if (!studentJoinClassroom) {
      return res.status(401).json({
        message:
          "Current user is not authorized to work in the given the join-classroom-id",
      });
    }

    //^ If everything is all ok then the below code will execute.

    //^ creating a messageResult variable
    let messageData: string = "";

    //^ creating a for-of loop for iterate the optionalSubjects array given by the user.
    for (const optionalSubject of optionalSubjects) {
      //^ inserting the data into the join-optional-subject record on every iteration.
      const joinOptionalSubject: JoinOptionalSubjectField | unknown =
        await JoinOptionalSubject.create({
          join_optional_subject: alphaNumGenerator(),
          optional_subject_id: optionalSubject.optionalSubjectId,
          chosen_subject_id: optionalSubject.subjectId,
          student_id: studentData.student_id,
          join_classroom_id: joinClassroomData.join_classroom_id,
        });

      if (!joinOptionalSubject) {
        return res.status(400).json({
          message: "Can't able to add records in join-optional-subject record.",
        });
      }

      //^ also inserting the data into the join-subject record.
      const studentJoinSubject: JoinSubjectField | unknown =
        await JoinSubject.create({
          join_subject_id: alphaNumGenerator(),
          subject_id: optionalSubject.subjectId,
          join_classroom_id: joinClassroomData.join_classroom_id,
          classroom_id: joinClassroomData.classroom_id,
          student_id: studentData.student_id,
        });

      if (!studentJoinSubject) {
        return res.send(400).json({
          message: "Can't able to add records join subject record.",
        });
      }

      messageData += `${optionalSubject.subjectName}, `;
    }

    return res.status(200).json({
      message: `${messageData}optional subjects joined successfully by ${studentData.student_first_name} ${studentData.student_last_name}`,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};
