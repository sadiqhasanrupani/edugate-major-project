import { STRING, NUMBER, Model } from "sequelize";

import sequelize from "../utils/database.config";

// model
import Teacher from "./teacher";
import Student from "./student";

export interface ClassroomData extends Model {
  classroom_id?: string;
  classroom_code?: number;
  classroom_name?: string;
  classroom_banner_img?: string;
  classroom_profile_img?: string;
  admin_teacher_id?: string;
  co_teacher_id?: string;
  student_id?: string;
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
});

// Classroom.belongsTo(Teacher, {
//   foreignKey: {
//     name: "co_teacher_id",
//   },
// });

// Classroom.belongsTo(Student, {
//   foreignKey: {
//     name: "student_id",
//   },
// });

export default Classroom;
