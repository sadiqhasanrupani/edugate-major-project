import { STRING, INTEGER } from "sequelize";

import sequelize from "../utils/database.config";

//* model
import Classroom from "../models/classroom";
import Teacher from "./teacher";
import Student from "./student";

export interface SubjectData {
  subject_id?: string;
  subject_name?: string;
  class_id?: string;
  teacher_id?: string;
  student_id?: string;
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

Subject.belongsTo(Student, {
  foreignKey: {
    name: "student_id",
  },
});

export default Subject;
