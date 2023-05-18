import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { v4 as alphaNumeric } from "uuid";

//^ AuthRequest
import { CustomRequest as AuthRequest } from "../middlewares/is-auth";

//^ model
import Teacher, { TeacherData as TeacherField } from "../models/teacher";
import Assignment, { AssignmentField } from "../models/assignment";
import JoinSubject, {
  JoinSubjectEagerField,
  JoinSubjectField,
} from "../models/joinSubject";
import Quiz, { QuizField } from "../models/quiz";
import Student from "../models/student";
import JoinQuiz from "../models/join-quiz";
import JoinAssignment, { JoinAssignmentField } from "../models/join-assignment";
import Notification from "../models/notification";

export const postCreateQuiz = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next
) => {
  try {
    //^ getting the current user id through auth request
    const { userId } = req as AuthRequest;
    const { body } = req as Req;

    //^ getting the data from the body request
    const { assignmentId, JoinSubjectId, title, choice, startDate, endDate } =
      body;

    //^ checking whether the user ID is teacher's ID or not.
    const teacher: TeacherField | unknown = await Teacher.findOne({
      where: {
        teacher_id: userId,
      },
    });

    if (!teacher) {
      return res.status(401).json({ message: "Unauthorized teacher ID." });
    }

    const teacherData = teacher as TeacherField;

    //^ checking whether the given assignment id is existed or not.
    const assignment: AssignmentField | unknown = await Assignment.findOne({
      where: {
        assignment_id: assignmentId,
      },
    });

    if (!assignment) {
      return res.status(401).json({ message: "Unauthorized assignment ID" });
    }

    const assignmentData = assignment as AssignmentField;

    //^ checking that the current teacher is joined in that classroom or not.
    const teacherJoinAssignment: JoinSubjectEagerField | unknown =
      await JoinSubject.findOne({
        where: {
          join_subject_id: JoinSubjectId,
        },
      });

    if (!teacherJoinAssignment) {
      return res.status(401).json({ message: "Unauthorized teacher" });
    }

    const teacherJoinAssignmentData =
      teacherJoinAssignment as JoinSubjectEagerField;

    const capitalizedTitle =
      (title as string).charAt(0).toUpperCase() +
      (title as string).slice(1).toLowerCase();

    //^ creating a field inside the quiz record.
    const quiz = await Quiz.create({
      quiz_id: alphaNumeric(),
      title: capitalizedTitle,
      choice,
      start_date: startDate,
      end_date: endDate,
      created_by: teacherData.teacher_id,
      assignment_id: assignmentData.assignment_id,
      subject_id: teacherJoinAssignmentData.subject_id,
      classroom_id: teacherJoinAssignmentData.classroom_id,
    });

    if (!quiz) {
      return res.status(400).json({ message: "Unable to create quiz" });
    }

    const quizData = quiz as QuizField;

    const newDate = new Date(quizData.createdAt as Date);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
    };
    const formattedDate = newDate.toLocaleString("en-US", options);

    //^ also joining all student which inside the subject of current subject
    //^ finding all student from the join_subject record
    const studentsJoinSubject: Array<JoinSubjectEagerField> | Array<unknown> =
      await JoinSubject.findAll({
        attributes: ["join_subject_id"],
        where: {
          subject_id: teacherJoinAssignmentData.subject_id,
          admin_teacher_id: null,
          co_teacher_id: null,
        },
        include: [{ model: Student, attributes: ["student_id"] }],
      });

    const studentsJoinSubjectData =
      studentsJoinSubject as Array<JoinSubjectEagerField>;

    if (studentsJoinSubjectData.length !== 0) {
      for (const joinSubject of studentsJoinSubjectData) {
        const joinAssignment: JoinAssignmentField | unknown =
          await JoinAssignment.findOne({
            where: {
              assignment_id: assignmentData.assignment_id,
              student_id: joinSubject.student_id,
            },
          });

        const joinAssignmentData = joinAssignment as JoinAssignmentField;

        JoinQuiz.create({
          join_quiz_id: alphaNumeric(),
          quiz_id: quizData.quiz_id,
          student_id: joinSubject.student.student_id,
          join_assignment_id: joinAssignmentData.join_assignment_id,
          join_subject_id: joinSubject.join_subject_id,
          join_classroom_id: joinSubject.join_classroom_id,
        });

        const notificationMsg = `<p>You have a ${quizData.title} quiz on May ${formattedDate}.</p>`;

        //^ Notifying every student that the quiz is now created in your respected subjects.
        await Notification.create({
          notification_id: alphaNumeric(),
          notification_msg: notificationMsg,
          action: "QUIZ_ANNOUNCEMENT",
          sender_teacher_id: teacherData.teacher_id,
          receiver_student_id: joinSubject.student_id,
          render_id: [
            {
              subject_id: joinSubject.subject_id,
              join_subject_id: joinSubject.join_subject_id,
              quiz_id: quizData.quiz_id,
            },
          ],
        });
      }
    }

    return res
      .status(200)
      .json({ message: `${quizData.title} quiz created Successfully.` });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};
