import { STRING, Model } from "sequelize";

import sequelize from "../utils/database.config";

//^ models
import Quiz from "./quiz";
import Student from "./student";
import JoinSubject from "./joinSubject";
import JoinClassroom from "./joinClassroom";

export interface JoinQuizField {
  join_quiz_id?: string;
  quiz_id?: string;
  student_id?: string;
  join_subject_id?: string;
  join_classroom_id?: string;
  createdAt?: Date,
  updatedAt?: Date,
}

const JoinQuiz = sequelize.define("join_quiz", {
  join_quiz_id: STRING,
});

JoinQuiz.belongsTo(Quiz, {
  foreignKey: "quiz_id",
});

JoinQuiz.belongsTo(Student, {
  foreignKey: "student_id",
});

JoinQuiz.belongsTo(JoinSubject, {
  foreignKey: "join_subject_id",
});

JoinQuiz.belongsTo(JoinClassroom, {
  foreignKey: "join_classroom_id",
});

export default JoinQuiz;
