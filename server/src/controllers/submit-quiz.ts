import { Request as Req, Response as Res, NextFunction as Next } from "express";

//^ authRequest
import { CustomRequest as AuthRequest } from "../middlewares/is-auth";

//^ models
import Student, { StudentField } from "../models/student";
import JoinQuiz, { JoinQuizEagerField } from "../models/join-quiz";
import Quiz from "../models/quiz";

import SubmittedQuiz from "../models/submitted-quizzes";
import { error } from "console";

export const postSubmitQuizOfStudent = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next
) => {
  try {
    const { body } = req;

    //^ Getting user-id from the auth middleware
    const { userId } = req as AuthRequest;

    //^ Getting the join-subject-id and the join-quiz-id from the body
    const { joinSubjectId, joinQuizId } = body;

    //^ Getting the student data from the body request
    interface StudentAnswerField {
      questionQuizIndex: number;
      studentGivenAnswer: string;
    }
    const studentAnswers: StudentAnswerField[] = body.studentAnswers;

    //^ Checking the current user is a student or not
    const student = await Student.findOne({
      where: {
        student_id: userId,
      },
    });

    if (!student) {
      return res.status(401).json({ message: "Unauthorized student ID." });
    }

    const studentData = student as StudentField;

    //^ Checking if the given joinQuiz id really exists or not
    const studentJoinQuiz = await JoinQuiz.findOne({
      where: {
        join_quiz_id: joinQuizId,
        student_id: studentData.student_id,
      },
      include: [{ model: Quiz }],
    });

    if (!studentJoinQuiz) {
      return res.status(401).json({ message: "Unauthorized join-quiz ID." });
    }

    const studentJoinQuizData = studentJoinQuiz as JoinQuizEagerField;

    //^ Getting the quiz-questions array from the studentJoinQuiz data
    interface QuestionField {
      question: {
        enteredValue: string;
        enteredValidValue: boolean;
      };
      choices: string[];
      selectedChoice: number;
    }
    const quizQuestions: QuestionField[] | unknown =
      studentJoinQuizData.quiz?.questions;

    if (!quizQuestions) {
      return res.status(400).json({ message: "No quiz questions found." });
    }

    const quizQuestionsData = quizQuestions as QuestionField[];

    //^ Array to store the result of each student answer with marks
    interface StudentAnswerResultWithMarks {
      marks: number;
      givenAnswer: string;
      correctAnswer: string;
      questionArrayIndex?: number;
    }
    const studentAnswerResultWithMarks: StudentAnswerResultWithMarks[] = [];

    const perQuestionMarks =
      (studentJoinQuizData.quiz?.total_marks as number) /
      (quizQuestions as QuestionField[]).length;

    for (let i = 0; i < studentAnswers.length; i++) {
      const studentAnswer = studentAnswers[i];
      const { questionQuizIndex, studentGivenAnswer } = studentAnswer;

      //^ Checking if the questionQuizIndex is valid
      if (
        questionQuizIndex !== undefined &&
        questionQuizIndex >= 0 &&
        questionQuizIndex < quizQuestionsData.length
      ) {
        const question = quizQuestionsData[questionQuizIndex];
        const correctChoice = question.choices[question.selectedChoice];

        //^ Checking if the student's answer matches the correct choice
        const isCorrect = studentGivenAnswer === correctChoice;

        //^ Pushing the result with marks to the array
        studentAnswerResultWithMarks.push({
          marks: isCorrect ? perQuestionMarks : 0,
          givenAnswer: studentAnswer.studentGivenAnswer,
          correctAnswer: correctChoice,
          questionArrayIndex: questionQuizIndex,
        });
      } else {
        return res.status(400).json({ message: "Invalid quiz question data." });
      }
    }

    //^ Calculating the sum of the marks obtained by the student
    let sumOfStudentObtainedMarks = 0;
    for (const result of studentAnswerResultWithMarks) {
      sumOfStudentObtainedMarks += result.marks;
    }

    return res.status(200).json({
      studentAnswerResultWithMarks,
      sumOfStudentObtainedMarks,
      studentAnswers,
      joinQuizId,
      quizQuestions,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const postSubmitStartTimeQuiz = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next
) => {
  try {
    //^ getting the current user id from the auth middleware
    const { userId } = req as AuthRequest;

    const { body } = req as Req;

    //^ getting the joinQuizId and startTime from the body request
    const { joinQuizId, startTime } = body;

    return res.status(200).json({ message: "Bruh" });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", e: error });
  }
};
