import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { v4 as alphaNum } from "uuid";

//^ authRequest
import { CustomRequest as AuthRequest } from "../middlewares/is-auth";

//^ models
import Student, { StudentField } from "../models/student";
import JoinQuiz, { JoinQuizEagerField } from "../models/join-quiz";
import Quiz from "../models/quiz";

import SubmittedQuiz from "../models/submitted-quizzes";
import { error } from "console";
import SubmittedQuizzes from "../models/submitted-quizzes";

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
    const { joinQuizId, endTime, submittedOn, studentAnswers, answer } = body;

    //^ Getting the student data from the body request
    interface StudentAnswerField {
      questionQuizIndex: number;
      studentGiveAnswer: string;
    }
    const studentAnswersData: StudentAnswerField[] = await body.studentAnswers;

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
      marks?: number;
      givenAnswer?: string;
      correctAnswer?: string;
      questionArrayIndex?: number;
    }
    const studentAnswerResultWithMarks: StudentAnswerResultWithMarks[] = [];

    const perQuestionMarks =
      (studentJoinQuizData.quiz?.total_marks as number) /
      (quizQuestions as QuestionField[]).length;

    // return res.status(200).json({ studentAnswers })

    console.log(
      `\n ${studentAnswersData.map((studentAnswer) => {
        return studentAnswer.studentGiveAnswer;
      })} \n`
    );

    for (let i = 0; i < studentAnswersData.length; i++) {
      const studentAnswer = studentAnswersData[i];
      const { questionQuizIndex, studentGiveAnswer } = studentAnswer;

      console.log(`\n ${JSON.stringify(studentAnswer)} \n`);

      //^ Checking if the questionQuizIndex is valid
      if (
        questionQuizIndex !== undefined &&
        questionQuizIndex >= 0 &&
        questionQuizIndex < quizQuestionsData.length
      ) {
        const question = quizQuestionsData[questionQuizIndex];
        const correctChoice = question.choices[question.selectedChoice];

        //^ Checking if the student's answer matches the correct choice
        const isCorrect = studentGiveAnswer === correctChoice;

        //^ Pushing the result with marks to the array
        studentAnswerResultWithMarks.push({
          marks: isCorrect ? perQuestionMarks : 0,
          givenAnswer: studentGiveAnswer ? studentGiveAnswer : "",
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
      sumOfStudentObtainedMarks += result.marks as number;
    }

    const updateSubmittedQuiz = await SubmittedQuiz.update(
      {
        obtained_marks: sumOfStudentObtainedMarks,
        student_answers_result_with_marks: studentAnswerResultWithMarks,
        submitted_on: submittedOn,
        end_time: endTime,
        status: "GRADED",
      },
      {
        where: {
          join_quiz_id: studentJoinQuizData.join_quiz_id,
          student_id: studentData.student_id,
        },
      }
    );

    if (!updateSubmittedQuiz) {
      return res
        .status(400)
        .json({ message: "Can't able to update the submitted quiz." });
    }

    return res.status(200).json({
      message: "Your Quiz is now submitted successfully."
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

    console.log(`\n ${joinQuizId} \n`);

    //^ checking if the current user is student or not.
    const student: StudentField | unknown = await Student.findOne({
      where: {
        student_id: userId,
      },
    });

    if (!student) {
      return res.status(401).json({ message: "Unauthorized student ID." });
    }

    const studentData = student as StudentField;

    const studentJoinQuiz = await JoinQuiz.findOne({
      where: {
        join_quiz_id: joinQuizId,
      },
    });

    if (!studentJoinQuiz) {
      return res.status(401).json({ message: "Unauthorized join_quiz ID." });
    }

    const studentJoinQuizData = studentJoinQuiz as JoinQuizEagerField;

    //^ checking if the student already submitted the quiz.
    const isStudentSubmittedQuiz = await SubmittedQuizzes.findOne({
      where: {
        student_id: studentData.student_id,
        join_quiz_id: studentJoinQuizData.join_quiz_id,
      },
    });

    if (isStudentSubmittedQuiz) {
      return res.status(403).json({ message: "Forbidden to give quiz again." });
    }

    const submittedQuiz = await SubmittedQuizzes.create({
      submitted_quiz_id: alphaNum(),
      start_time: startTime,
      join_quiz_id: joinQuizId,
      student_id: studentData.student_id,
    });

    if (!submittedQuiz) {
      return res
        .status(400)
        .json({ message: "Can't able to create the submitted quiz record" });
    }

    return res.status(200).json({ message: "start time added successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};
