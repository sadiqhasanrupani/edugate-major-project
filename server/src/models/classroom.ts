import { STRING, Model } from "sequelize";

import sequelize from "../utils/database.config";

// model
import Teacher, { TeacherData as TeacherField } from "./teacher";

export interface ClassroomData extends Model {
  classroom_id?: string;
  classroom_code?: number;
  classroom_name?: string;
  classroom_banner_img?: string;
  classroom_profile_img?: string;
  admin_teacher_id?: string;
}

export interface ClassroomEagerField extends ClassroomData {
  teacher: TeacherField;
}

const Classroom = sequelize.define("classroom", {
  classroom_id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
  classroom_code: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  classroom_name: {
    type: STRING,
    allowNull: false,
  },
  classroom_category: {
    type: STRING,
    allowNull: false,
  },
  classroom_banner_img: STRING,
  classroom_profile_img: STRING,
});

Classroom.belongsTo(Teacher, {
  foreignKey: {
    name: "admin_teacher_id",
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default Classroom;
