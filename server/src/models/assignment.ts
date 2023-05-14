import { STRING, INTEGER, DATE, Model, JSON } from "sequelize";

//^ configuration of database.
import sequelize from "../utils/database.config";

//^ models
import Teacher from "../models/teacher";
import Classroom from "../models/classroom";
import Subject from "../models/subject";

export interface AssignmentField extends Model {
  assignment_id?: string;
  topic?: string;
  total_marks?: number;
  description?: string;
  start_date?: Date;
  end_date?: Date;
  files?: [{ path?: string; name?: string; original_name?: string }];
  created_by?: string;
  classroom_id?: string;
  subject_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AssignmentEagerField  extends AssignmentField{
  teacher?: {
    teacher_id?: string;
    teacher_first_name?: string;
    teacher_last_name?: string;
    teacher_email?: string;
    teacher_img?: string;
    teacher_phone_number?: string;
    teacher_bio?: string;
    teacher_dob?: Date;
    user_id?: string;
  };
}

const Assignment = sequelize.define("assignments", {
  assignment_id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
  topic: STRING(100),
  total_marks: INTEGER,
  description: STRING(500),
  start_date: DATE,
  end_date: DATE,
  files: JSON,
});

Assignment.belongsTo(Teacher, {
  foreignKey: {
    name: "created_by",
  },
});

Assignment.belongsTo(Classroom, {
  foreignKey: {
    name: "classroom_id",
  },
});

Assignment.belongsTo(Subject, {
  foreignKey: {
    name: "subject_id",
  },
});

export default Assignment;
