import { STRING, INTEGER, Model, JSON, DATE } from "sequelize";

//^ database config
import sequelize from "../utils/database.config";

//^ models
import Student, { StudentEagerField } from "./student";
import JoinQuiz, { JoinQuizEagerField } from "./join-quiz";

//^ Interface of submitted quiz model
export interface SubmittedQuizField {
  submitted_quiz_id?: string;
  obtained_marks?: number;
  student_answers_result_with_marks?: [
    {
      marks?: number;
      givenAnswer?: string;
      correctAnswer?: string;
      questionArrayIndex?: number;
    }
  ];
  submitted_on?: Date;
  start_time?: Date;
  end_time?: Date;
  feedback?: string;
  student_id?: string;
  join_quiz_id?: string;
}

//^ Interface of submitted quiz model eager loading
export interface SubmittedQuizEagerField extends SubmittedQuizField {
  student?: StudentEagerField;
  joinQuiz?: JoinQuizEagerField;
}

//^ declaring the submittedQuizzes model
const SubmittedQuizzes = sequelize.define("submitted_quizzes", {
  submitted_quiz_id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
  obtained_marks: INTEGER,
  student_answers_result_with_marks: JSON,
  submitted_on: DATE,
  start_time: DATE,
  end_time: DATE,
  feedback: STRING,
  status: STRING,
});

//^ foreign key
SubmittedQuizzes.belongsTo(Student, {
  foreignKey: "student_id",
});

SubmittedQuizzes.belongsTo(JoinQuiz, {
  foreignKey: {
    name: "join_quiz_id",
  },
});

export default SubmittedQuizzes;
