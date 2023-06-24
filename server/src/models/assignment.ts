import { STRING, INTEGER, DATE, Model, JSON } from "sequelize";

//^ configuration of database.
import sequelize from "../utils/database.config";

//^ models
import Teacher, { TeacherData as TeacherField } from "../models/teacher";
import Classroom, {
  ClassroomData as ClassroomField,
} from "../models/classroom";
import Subject, { SubjectData as SubjectField } from "../models/subject";

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

export interface AssignmentEagerField extends AssignmentField {
  teacher?: TeacherField;
  classroom?: ClassroomField;
  subject?: SubjectField;
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
  onDelete: "CASCADE"
});

Assignment.belongsTo(Subject, {
  foreignKey: {
    name: "subject_id",
  },
});

export default Assignment;
