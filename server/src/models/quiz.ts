//^ dependencies.
import { STRING, JSON, DATE, Model, INTEGER } from "sequelize";

//^ database config.
import sequelize from "../utils/database.config";

//^ model
import Teacher from "../models/teacher";
import Assignment from "../models/assignment";
import Subject from "./subject";
import Classroom from "./classroom";

export interface QuizField extends Model {
  quiz_id?: string;
  title?: string;
  questions?: [
    {
      question?: string;
      choice?: Array<string>;
      correct_answer?: string;
      marks?: string;
    }
  ];
  start_date?: Date;
  end_date?: Date;
  created_by?: string;
  assignment_id?: string;
  subject_id?: string;
  classroom_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const Quiz = sequelize.define("quiz", {
  quiz_id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: STRING,
    allowNull: false,
  },
  questions: {
    type: JSON,
  },
  start_date: DATE,
  end_date: DATE,
  total_marks: INTEGER,
});

Quiz.belongsTo(Teacher, {
  foreignKey: "created_by",
});
Quiz.belongsTo(Assignment, {
  foreignKey: "assignment_id",
});
Quiz.belongsTo(Subject, {
  foreignKey: "subject_id",
});
Quiz.belongsTo(Classroom, {
  foreignKey: "classroom_id",
});

export default Quiz;
