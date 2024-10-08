import { STRING, Model } from "sequelize";

import sequelize from "../utils/database.config";

//^ models
import Quiz, { QuizField } from "./quiz";
import Student, { StudentEagerField } from "./student";
import JoinSubject, { JoinSubjectEagerField } from "./joinSubject";
import JoinClassroom, { JoinClassroomEagerField } from "./joinClassroom";
import Subject from "./subject";

export interface JoinQuizField {
  join_quiz_id?: string;
  quiz_id?: string;
  student_id?: string;
  join_subject_id?: string;
  join_classroom_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface JoinQuizEagerField extends JoinQuizField {
  quiz?: QuizField;
  student?: StudentEagerField;
  join_subject?: JoinSubjectEagerField;
  join_classroom?: JoinClassroomEagerField;
}

const JoinQuiz = sequelize.define("join_quiz", {
  join_quiz_id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
});

JoinQuiz.belongsTo(Quiz, {
  foreignKey: "quiz_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

JoinQuiz.belongsTo(Student, {
  foreignKey: "student_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

JoinQuiz.belongsTo(JoinSubject, {
  foreignKey: "join_subject_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

JoinQuiz.belongsTo(JoinClassroom, {
  foreignKey: "join_classroom_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

JoinQuiz.belongsTo(Subject, {
  foreignKey: "subject_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default JoinQuiz;
