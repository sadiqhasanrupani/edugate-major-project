import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { v4 as alphaNumeric } from "uuid";
import { Op } from "sequelize";

//^ AuthRequest
import {
  CustomRequest as AuthRequest,
  CustomRequest,
} from "../middlewares/is-auth";

//^ model
import Teacher, { TeacherData as TeacherField } from "../models/teacher";
import JoinSubject, {
  JoinSubjectEagerField,
  JoinSubjectField,
} from "../models/joinSubject";
import Quiz, { QuizEagerField, QuizField } from "../models/quiz";
import Student, { StudentField } from "../models/student";
import JoinQuiz, {
  JoinQuizEagerField,
  JoinQuizField,
} from "../models/join-quiz";
import Notification from "../models/notification";
import Subject, { SubjectData as SubjectField } from "../models/subject";

import SubmittedQuizzes, {
  SubmittedQuizEagerField,
  SubmittedQuizField,
} from "../models/submitted-quizzes";

//^ helper
import getDateRange from "../utils/helper/get-date-range";
import Classroom from "../models/classroom";
import JoinClassroom from "../models/joinClassroom";
import { JoinClassroomEagerField } from "../models/joinClassroom";
import { SubmittedAssignEagerField } from "../models/submitted-assignment";

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

    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);

    //^ creating a field inside the quiz record.
    const quiz = await Quiz.create({
      quiz_id: alphaNumeric(),
      title: capitalizedTitle,
      questions: questionsData,
      duration: quizDuration,
      total_marks: quizTotalMarks,
      start_date: `${newStartDate.getFullYear()}-${
        newStartDate.getMonth() + 1
      }-${newStartDate.getDate()}`,
      end_date: `${newEndDate.getFullYear()}-${
        newEndDate.getMonth() + 1
      }-${newEndDate.getDate()}`,
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
      order: [
        ["end_date", "ASC"],
        ["start_date", "ASC"],
      ],
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

    console.log(
      `\n${new Date(startDate).getFullYear()}-${
        new Date(startDate).getMonth() + 1
      }-${new Date(startDate).getDate()}\n`
    );

    //^ know updating the quiz.
    const updateQuiz = await Quiz.update(
      {
        title: quizTitle ? quizTitle : quizData.title,
        questions: questionsData ? questionsData : quizData.questions,
        start_date: `${new Date(startDate).getFullYear()}-${
          new Date(startDate).getMonth() + 1
        }-${24} 00:00:00`,
        end_date: endDate
          ? `${new Date(endDate).getFullYear()}-${
              new Date(endDate).getMonth() + 1
            }-${new Date(endDate).getDate()}`
          : quizData.end_date,
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

    //^ getting all submittedQuiz data
    const submittedQuizzes = await SubmittedQuizzes.findAll({
      where: {
        student_id: studentData.student_id,
      },
      include: [{ model: JoinQuiz, include: [{ model: Quiz }] }],
    });

    const submittedQuizzesData =
      submittedQuizzes as Array<SubmittedQuizEagerField>;

    //^ getting the quizzesIds from submittedQuiz record

    let quizzesIds: Array<string> = [];

    if (submittedQuizzes.length > 0) {
      for (const submittedQuiz of submittedQuizzesData) {
        quizzesIds.push(submittedQuiz.join_quiz?.quiz?.quiz_id as string);
      }
    }

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
              quiz_id: {
                [Op.notIn]: quizzesIds,
              },
            },
          },
        ],
      });

    const quizzesData = quizzes as Array<JoinQuizEagerField>;

    let filteredQuizzesData: Array<any> = [];

    const todaysDate = new Date();
    if (quizzesData.length > 0) {
      for (const quiz of quizzesData) {
        const startDate = new Date(quiz.quiz?.start_date?.toString() as string);
        const endDate = new Date(quiz.quiz?.end_date?.toString() as string);

        const dateRange = getDateRange(startDate, endDate);

        if (
          dateRange.includes(todaysDate.toDateString()) &&
          dateRange.includes(endDate.toDateString())
        ) {
          filteredQuizzesData.push(quiz);
        }
      }
    }

    return res.status(200).json({ quizzesData: filteredQuizzesData });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const getQuizForStudent = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    //^ getting user id from the AuthRequest
    const { userId } = req as CustomRequest;

    //^ getting the joinQuizId form the params request
    const { joinQuizId } = (req as Req).params;

    //^ checking the current user id is student id or not
    const student = await Student.findOne({
      where: {
        student_id: userId,
      },
    });

    if (!student) {
      return res.status(401).json({ message: "Unauthorized student ID." });
    }

    const studentData = student as StudentField;

    //^ checking the received join-quiz-id is valid or not.
    const joinQuiz = await JoinQuiz.findOne({
      where: {
        join_quiz_id: joinQuizId,
        student_id: studentData.student_id,
      },
      include: [{ model: Quiz }],
    });

    if (!joinQuiz) {
      return res.status(401).json({ message: "Unauthorized join-quiz-id" });
    }

    const joinQuizData = joinQuiz as JoinQuizEagerField;

    return res.status(200).json({ joinQuizData });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const getQuizzesForTeacher = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next
) => {
  try {
    //^ getting user id from the AuthRequest
    const { userId } = req as AuthRequest;

    //^ checking that the current user is teacher or not.
    const teacher = await Teacher.findOne({
      where: {
        teacher_id: userId,
      },
    });

    if (!teacher) {
      return res.status(401).json({ message: "Unauthorized teacher ID." });
    }

    const teacherData = teacher as TeacherField;

    //^ getting all classrooms
    const classrooms = await JoinClassroom.findAll({
      where: {
        [Op.or]: {
          admin_teacher_id: userId,
          teacher_id: userId,
        },
      },
      include: [{ model: Classroom }],
    });

    const classroomsData = classrooms as Array<JoinClassroomEagerField>;

    let quizzesData: any;

    if (classrooms.length > 0) {
      for (const classroom of classroomsData) {
        const quiz = await Quiz.findAll({
          where: {
            classroom_id: classroom.classroom?.classroom_id,
          },
          include: [
            {
              model: Classroom,
              where: {
                admin_teacher_id: teacherData.teacher_id,
              },
            },
            { model: Subject },
          ],
        });

        const quizData = quiz as Array<QuizEagerField>;

        quizzesData = quizData;
      }
    }

    return res.status(200).json({ quizzesData });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const getJoinSubmittedQuizzesLength = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next
) => {
  try {
    //^ getting user-id from the middleware
    const { userId } = req as AuthRequest;

    //^ getting the quizId from the params request
    const { quizId } = (req as Req).params;

    //^ checking that is current user id is teacher or not.
    const teacher = await Teacher.findOne({
      where: {
        teacher_id: userId,
      },
    });

    if (!teacher) {
      return res.status(401).json({ message: "Unauthorized Teacher ID." });
    }

    const teacherData = teacher as TeacherField;

    //^ checking the quiz-id is really exists or not.
    const quiz = await Quiz.findOne({
      where: {
        quiz_id: quizId,
      },
    });

    if (!quiz) {
      return res.status(401).json({ message: "Unauthorized quiz ID." });
    }

    const quizData = quiz as QuizField;

    //^ getting the joinQuiz data
    const joinQuizzes = await JoinQuiz.findAll({
      where: {
        quiz_id: quizData.quiz_id,
      },
    });

    const joinQuizzesData = joinQuizzes as Array<JoinQuizField>;

    // let submittedQuizzes: any = [];

    let submittedJoinQuizzes: Array<object> = [];

    const submittedQuizzes = await SubmittedQuizzes.findAll({
      where: {
        quiz_id: quizData.quiz_id,
      },
      include: [{ model: JoinQuiz }],
    });

    const submittedQuizzesData =
      submittedQuizzes as Array<SubmittedQuizEagerField>;

    for (const submittedQuiz of submittedQuizzesData) {
      submittedJoinQuizzes.push(submittedQuiz.join_quiz as object);
    }

    return res.status(200).json({
      submittedQuizzesLen: submittedQuizzesData.length,
      joinQuizzesLen: joinQuizzesData.length,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const getJoinQuizStudents = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next
) => {
  try {
    const { userId } = req as AuthRequest;

    //^ getting the quiz id from the params request
    const { quizId } = (req as Req).params;

    //^ Checking that the current user is teacher or not.
    const teacher = await Teacher.findOne({
      where: {
        teacher_id: userId,
      },
    });

    let studentData: any = {};

    if (!teacher) {
      const student = await Student.findOne({
        where: {
          student_id: userId,
        },
      });

      if (!student) {
        return res.status(200).json({ message: "Unauthorized user-id" });
      }

      studentData = student as StudentField;
    }

    //^ checking if the quiz id is really exists or not.
    const quiz = await Quiz.findOne({
      where: {
        quiz_id: quizId,
      },
    });

    if (!quiz) {
      return res.status(200).json({ message: "Unauthorized user-id" });
    }

    const quizData = quiz as QuizField;

    //^ getting all student which is inside the join-quizzes data.
    const joinQuizStudents = await JoinQuiz.findAll({
      where: {
        quiz_id: quizData.quiz_id,
      },
      include: [{ model: Student, attributes: ["student_id", "student_img"] }],
    });

    const joinQuizStudentsData = joinQuizStudents as Array<JoinQuizEagerField>;

    return res.status(200).json({ students: joinQuizStudentsData });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const getAttemptedStudents = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next
) => {
  try {
    const { userId } = req as AuthRequest;

    const { quizId } = (req as Req).params;

    const teacher = await Teacher.findOne({
      attributes: ["teacher_id", "teacher_first_name", "teacher_last_name"],
      where: {
        teacher_id: userId,
      },
    });

    if (!teacher) {
      return res.status(401).json({ message: "Unauthorized teacher ID." });
    }

    const teacherData = teacher as TeacherField;

    const quiz: QuizField | unknown = await Quiz.findOne({
      where: {
        quiz_id: quizId,
      },
    });

    if (!quiz) {
      return res.status(401).json({ message: "Unauthorized quiz ID." });
    }

    const quizData = quiz as QuizField;

    const attemptedQuizStudents = await SubmittedQuizzes.findAll({
      where: {
        quiz_id: quizData.quiz_id,
      },
      include: [
        {
          model: Student,
          attributes: ["student_id", "student_first_name", "student_last_name"],
        },
        { model: Quiz },
      ],
      order: [["obtained_marks", "DESC"]],
    });

    const attemptedQuizStudentsData =
      attemptedQuizStudents as Array<SubmittedQuizEagerField>;

    return res
      .status(200)
      .json({ attemptedStudents: attemptedQuizStudentsData });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const getNotAttemptedStudents = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next
) => {
  try {
    const { userId } = req as AuthRequest;

    const { quizId } = (req as Req).params;

    const teacher = await Teacher.findOne({
      where: {
        teacher_id: userId,
      },
    });

    if (!teacher) {
      return res.status(401).json({ message: "Unauthorized teacher ID." });
    }

    const teacherData = teacher as TeacherField;

    const quiz = await Quiz.findOne({
      where: {
        quiz_id: quizId,
      },
    });

    if (!quiz) {
      return res.status(401).json({ message: "Unauthorized quiz ID." });
    }

    const quizData = quiz as QuizField;

    //^ getting all the submitted quiz data
    const submittedQuizzes = await SubmittedQuizzes.findAll({
      where: {
        quiz_id: quizId,
      },
      include: [{ model: Student, attributes: ["student_id"] }],
    });

    const submittedQuizzesData =
      submittedQuizzes as Array<SubmittedQuizEagerField>;

    let submittedStudentsIds: Array<string> = [];

    if (submittedQuizzesData.length > 0) {
      for (const submittedQuiz of submittedQuizzesData) {
        submittedStudentsIds.push(submittedQuiz.student?.student_id as string);
      }
    }

    //^ getting the join-quiz data
    const joinQuizzes = await JoinQuiz.findAll({
      where: {
        quiz_id: quizId,
      },
      include: [
        {
          model: Student,
          where: {
            student_id: {
              [Op.notIn]: submittedStudentsIds,
            },
          },
        },
        { model: Quiz, include: [{ model: Subject }, { model: Classroom }] },
      ],
    });

    const joinQuizzesData = joinQuizzes as Array<JoinQuizField>;

    return res.status(200).json({ joinQuizzes });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const getUpcomingQuizzes = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next
) => {
  try {
    // Getting user id from the auth middleware
    const { userId } = req as AuthRequest;

    // Getting join-subject-id from the params request
    const { joinSubjectId } = (req as Req).params;

    // Identifying that the current user is a student or not.
    const student = await Student.findOne({ where: { student_id: userId } });

    if (!student) {
      return res.status(401).json({ message: "Unauthorized student ID." });
    }

    const studentData = student as StudentField;

    // Identifying the joinSubjectId from the join_subjects record.
    const joinSubject = await JoinSubject.findOne({
      where: { join_subject_id: joinSubjectId },
      include: [{ model: Subject }],
    });

    if (!joinSubject) {
      return res.status(401).json({ message: "Unauthorized join_subject ID." });
    }

    const joinSubjectData = joinSubject as JoinSubjectEagerField;

    //^ getting those join quizzes data which has already submitted the quiz
    const submittedJoinQuizzesID: Array<string> = [];

    const submittedQuizzes = await SubmittedQuizzes.findAll({
      attributes: ["submitted_quiz_id"],
      where: {
        subject_id: joinSubjectData.subject_id,
        student_id: studentData.student_id,
      },
      include: [{ model: JoinQuiz, attributes: ["join_quiz_id"] }],
    });

    const submittedQuizzesData: Array<SubmittedQuizEagerField> =
      submittedQuizzes as Array<SubmittedQuizEagerField>;

    if (submittedQuizzesData.length > 0) {
      for (const quiz of submittedQuizzesData) {
        submittedJoinQuizzesID.push(quiz.join_quiz?.join_quiz_id as string);
      }
    }

    const currentDate = new Date();

    const upcomingQuizzes = await JoinQuiz.findAll({
      where: {
        join_subject_id: joinSubjectData.join_subject_id,
        student_id: studentData.student_id,
        join_quiz_id: {
          [Op.notIn]: submittedJoinQuizzesID,
        },
      },
      include: [
        {
          model: Quiz,
          where: {
            [Op.or]: [
              { start_date: { [Op.gt]: currentDate } },
              { start_date: { [Op.eq]: currentDate } },
            ],
          },
          order: [["createdAt", "ASC"]],
        },
      ],
    });

    return res.status(200).json({ upcomingQuizzes });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};
