import { STRING, INTEGER } from "sequelize";

import sequelize from "../utils/database.config";

//* model
import Classroom, {
  ClassroomData as ClassroomField,
} from "../models/classroom";
import Teacher, { TeacherData as TeacherField } from "./teacher";
export interface SubjectData {
  subject_id?: string;
  subject_name?: string;
  class_id?: string;
  teacher_id?: string;
  subject_status?: string;
}

export interface SubjectEagerField {
  teacher: TeacherField;
  classroom: ClassroomField;
}

const Subject = sequelize.define("subjects", {
  subject_id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
  subject_name: {
    type: STRING,
    allowNull: false,
  },
  subject_status: {
    type: STRING,
  },
});

Subject.belongsTo(Classroom, {
  foreignKey: {
    name: "class_id",
  },
});

Subject.belongsTo(Teacher, {
  foreignKey: {
    name: "teacher_id",
  },
});

export default Subject;
