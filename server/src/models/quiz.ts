//^ dependencies.
import { STRING, JSON, DATE, Model, INTEGER, DATEONLY } from "sequelize";

//^ database config.
import sequelize from "../utils/database.config";

//^ model
import Teacher, { TeacherData as TeacherField } from "../models/teacher";
import Subject, { SubjectData as SubjectField } from "./subject";
import Classroom, { ClassroomEagerField } from "./classroom";

export interface QuizField extends Model {
  quiz_id?: string;
  title?: string;
  questions?: [
    {
      question?: string;
      choices?: Array<string>;
      selectedChoice?: number;
    },
  ];
  start_date?: Date;
  end_date?: Date;
  created_by?: string;
  duration?: number;
  total_marks?: number;
  assignment_id?: string;
  subject_id?: string;
  classroom_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface QuizEagerField extends QuizField {
  teacher: TeacherField;
  subject: SubjectField;
  classroom: ClassroomEagerField;
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
  total_marks: INTEGER,
  duration: INTEGER,
  start_date: DATEONLY,
  end_date: DATEONLY,
});

Quiz.belongsTo(Teacher, {
  foreignKey: "created_by",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Quiz.belongsTo(Subject, {
  foreignKey: "subject_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Quiz.belongsTo(Classroom, {
  foreignKey: "classroom_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default Quiz;
