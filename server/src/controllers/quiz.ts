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
import Student, { StudentField } from "../models/student";
import JoinQuiz, {
  JoinQuizEagerField,
  JoinQuizField,
} from "../models/join-quiz";
import Notification from "../models/notification";
import Subject, { SubjectData as SubjectField } from "../models/subject";
import { Op } from "sequelize";

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
    const {
      subjectId,
      quizTitle,
      quizDuration,
      quizTotalMarks,
      startDate,
      endDate,
      questionsData,
    } = body;

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
    const subject: SubjectField | unknown = await Subject.findOne({
      where: {
        subject_id: subjectId,
      },
    });

    if (!subject) {
      return res.status(401).json({ message: "Unauthorized subject ID" });
    }

    const subjectData = subject as SubjectField;

    //^ checking that the current teacher is joined in that classroom or not.
    const teacherJoinSubject: JoinSubjectEagerField | unknown =
      await JoinSubject.findOne({
        where: {
          subject_id: subjectId,
          [Op.or]: {
            co_teacher_id: teacherData.teacher_id,
            admin_teacher_id: teacherData.teacher_id,
          },
          classroom_id: subjectData.class_id,
        },
      });

    if (!teacherJoinSubject) {
      return res.status(401).json({ message: "Unauthorized teacher" });
    }

    const teacherJoinSubjectData = teacherJoinSubject as JoinSubjectEagerField;

    const capitalizedTitle =
      (quizTitle as string).charAt(0).toUpperCase() +
      (quizTitle as string).slice(1).toLowerCase();

    //^ creating a field inside the quiz record.
    const quiz = await Quiz.create({
      quiz_id: alphaNumeric(),
      title: capitalizedTitle,
      questions: questionsData,
      duration: quizDuration,
      total_marks: quizTotalMarks,
      start_date: new Date(startDate).getDate,
      end_date: new Date(endDate).getDate,
      created_by: teacherData.teacher_id,
      subject_id: subjectData.subject_id,
      classroom_id: teacherJoinSubjectData.classroom_id,
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
          subject_id: subjectData.subject_id,
          admin_teacher_id: null,
          co_teacher_id: null,
        },
        include: [{ model: Student, attributes: ["student_id"] }],
      });

    const studentsJoinSubjectData =
      studentsJoinSubject as Array<JoinSubjectEagerField>;

    if (studentsJoinSubjectData.length !== 0) {
      for (const joinStudentSubject of studentsJoinSubjectData) {
        JoinQuiz.create({
          join_quiz_id: alphaNumeric(),
          quiz_id: quizData.quiz_id,
          student_id: joinStudentSubject.student.student_id,
          join_subject_id: joinStudentSubject.join_subject_id,
          join_classroom_id: joinStudentSubject.join_classroom_id,
        });

        const notificationMsg = `<p>You have a ${quizData.title} quiz on May ${formattedDate}.</p>`;

        //^ Notifying every student that the quiz is now created in your respected subjects.
        await Notification.create({
          notification_id: alphaNumeric(),
          notification_msg: notificationMsg,
          action: "QUIZ_ANNOUNCEMENT",
          sender_teacher_id: teacherData.teacher_id,
          receiver_student_id: joinStudentSubject.student.student_id,
          render_id: [
            {
              subject_id: joinStudentSubject.subject_id,
              join_subject_id: joinStudentSubject.join_subject_id,
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

export const getQuizzes = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next
) => {
  try {
    //^ getting the user id
    const { userId } = req as AuthRequest;
    const { subjectId } = (req as Req).params;

    //^ checking whether the user id is teacher id or not.
    const teacher: TeacherField | unknown = await Teacher.findOne({
      where: {
        teacher_id: userId,
      },
    });

    if (!teacher) {
      return res.status(401).json({ message: "Unauthorized teacher ID" });
    }

    const teacherData = teacher as TeacherField;

    //^ checking that the subject id is really exist or not.
    const subject: SubjectField | unknown = await Subject.findOne({
      where: {
        subject_id: subjectId,
      },
    });

    if (!subject) {
      return res.status(401).json({ message: "Unauthorized subject ID" });
    }

    const subjectData = subject as SubjectField;

    //^ getting all quiz data which is related to the subject and the teacher.
    const quizzes: QuizField | unknown = await Quiz.findAll({
      where: {
        subject_id: subjectId,
      },
    });

    return res.status(200).json({ quizzes });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const getQuizForTeacher = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next
) => {
  try {
    //^ getting the user-id
    const { userId } = req as AuthRequest;
    //^ getting the quiz id from the params request
    const { params } = req as Req;
    const { quizId } = params;

    //^ Checking whether the current user is teacher or not.
    const teacher: TeacherField | unknown = await Teacher.findOne({
      where: {
        teacher_id: userId,
      },
    });

    if (!teacher) {
      return res.status(401).json({ message: "Unauthorized teacher ID." });
    }

    const teacherData = teacher as TeacherField;

    //^ checking whether the quiz id is really  exists or not.
    const quiz: QuizField | unknown = await Quiz.findOne({
      where: {
        quiz_id: quizId,
      },
    });

    if (!quiz) {
      return res.status(401).json({ message: "Unauthorized quiz ID." });
    }

    const quizData = quiz as QuizField;

    return res.status(200).json({ quizData });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const postUpdateQuizAdminTeacher = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next
) => {
  try {
    const { userId } = req as AuthRequest;
    const { body } = req as Req;

    //^ getting the data from the body request,
    const {
      quizTitle,
      quizDuration,
      quizTotalMarks,
      startDate,
      endDate,
      questionsData,
      subjectId,
      quizId,
    } = body;

    //^ checking that the current user id is teacher's id
    const teacher: TeacherField | unknown = await Teacher.findOne({
      where: {
        teacher_id: userId,
      },
    });

    if (!teacher) {
      return res.status(401).json({ message: "Unauthorized teacher ID" });
    }

    const teacherData = teacher as TeacherField;

    //^ checking that the quiz id is really exists or not.
    const quiz = await Quiz.findOne({
      where: {
        quiz_id: quizId,
      },
    });

    if (!quiz) {
      return res.status(401).json({ message: "Unauthorized quiz ID" });
    }

    const quizData = quiz as QuizField;

    //^ checking the subject id is really real or not.
    const subject: SubjectField | unknown = await Subject.findOne({
      where: {
        subject_id: subjectId,
      },
    });

    if (!subject) {
      return res.status(401).json({ message: "Unauthorized subject ID" });
    }

    const subjectData = subject as SubjectField;

    //^ know updating the quiz.
    const updateQuiz = await Quiz.update(
      {
        title: quizTitle ? quizTitle : quizData.title,
        questions: questionsData ? questionsData : quizData.questions,
        start_date: startDate ? startDate : quizData.start_date,
        end_date: endDate ? endDate : quizData.end_date,
        duration: quizDuration ? parseInt(quizDuration) : quizData.duration,
        total_marks: quizTotalMarks
          ? parseInt(quizTotalMarks)
          : quizData.total_marks,
      },
      {
        where: {
          quiz_id: quizData.quiz_id,
          subject_id: subjectData.subject_id,
        },
      }
    );

    if (!updateQuiz) {
      return res
        .status(400)
        .json({ message: "Unable to update the quiz record" });
    }

    const updatedQuiz: QuizField | unknown = await Quiz.findOne({
      where: {
        quiz_id: quizId,
      },
    });

    const updateQuizData = updatedQuiz as QuizField;

    return res
      .status(200)
      .json({ message: `${updateQuizData.title} updated successfully.` });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const getQuizzesForStudent = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next
) => {
  try {
    const { userId } = req as AuthRequest;
    const { joinSubjectId } = (req as Req).params;

    const student: StudentField | unknown = await Student.findOne({
      where: {
        student_id: userId,
      },
    });

    if (!student) {
      return res.status(401).json({ message: "Unauthorized student ID" });
    }

    const studentData = student as StudentField;

    const joinSubject: JoinSubjectField | unknown = await JoinSubject.findOne({
      where: {
        join_subject_id: joinSubjectId,
      },
    });

    if (!joinSubject) {
      return res
        .status(401)
        .json({ message: "Unauthorized join-subject-id ID" });
    }

    const joinSubjectData = joinSubject as JoinSubjectField;

    const today = new Date();
    const endOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59
    );

    const quizzes: Array<JoinQuizEagerField> | Array<unknown> =
      await JoinQuiz.findAll({
        where: {
          join_subject_id: joinSubjectData.join_subject_id,
          student_id: studentData.student_id,
        },
        include: [
          {
            model: Quiz,
            where: {
              start_date: {
                [Op.lte]: endOfToday, //^ Compare with the end of today's date
              },
              end_date: {
                [Op.gte]: today, //^ Compare with today's date
              },
            },
          },
        ],
      });

    const quizzesData = quizzes as Array<JoinQuizEagerField>;

    return res.status(200).json({ quizzesData });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};
