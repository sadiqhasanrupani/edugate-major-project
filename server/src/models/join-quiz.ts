import { STRING, Model } from "sequelize";

import sequelize from "../utils/database.config";

//^ models
import Quiz, { QuizField } from "./quiz";
import Student, { StudentField } from "./student";
import JoinSubject, { JoinSubjectField } from "./joinSubject";
import JoinClassroom, {
  JoinClassroomData as JoinClassroomField,
} from "./joinClassroom";

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
  student?: StudentField;
  joinSubject?: JoinSubjectField;
  joinClassroom?: JoinClassroomField;
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
