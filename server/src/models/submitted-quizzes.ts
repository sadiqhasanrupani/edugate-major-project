import { STRING, INTEGER, Model, JSON, DATE } from "sequelize";

//^ database config
import sequelize from "../utils/database.config";

//^ models
import Student, { StudentEagerField } from "./student";
import JoinQuiz, { JoinQuizEagerField } from "./join-quiz";
import Quiz, { QuizEagerField } from "./quiz";
import Subject, { SubjectEagerField } from "./subject";
import Classroom, { ClassroomEagerField } from "./classroom";

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
    },
  ];
  submitted_on?: Date;
  start_time?: Date;
  end_time?: Date;
  feedback?: string;
  student_id?: string;
  join_quiz_id?: string;
  quiz_id?: string;
  subject_id?: string;
  classroom_id?: string;
}

//^ Interface of submitted quiz model eager loading
export interface SubmittedQuizEagerField extends SubmittedQuizField {
  student?: StudentEagerField;
  join_quiz?: JoinQuizEagerField;
  quiz?: QuizEagerField;
  subject?: SubjectEagerField;
  classroom?: ClassroomEagerField;
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
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "student_id",
});

SubmittedQuizzes.belongsTo(JoinQuiz, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: {
    name: "join_quiz_id",
  },
});

SubmittedQuizzes.belongsTo(Quiz, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: {
    name: "quiz_id",
  },
});

SubmittedQuizzes.belongsTo(Subject, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: {
    name: "subject_id",
  },
});

SubmittedQuizzes.belongsTo(Classroom, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: {
    name: "classroom_id",
  },
});

export default SubmittedQuizzes;
