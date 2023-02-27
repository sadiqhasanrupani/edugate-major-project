import { STRING, NUMBER } from "sequelize";

import sequelize from "../utils/database.config";

// model
import Teacher from "./teacher";
import Student from "./student";

const Classroom = sequelize.define("classrooms", {
  classroom_id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
  classroom_code: {
    type: STRING,
    allowNull: false,
  },
  classroom_name: {
    type: STRING,
    allowNull: false,
  },
  classroom_email: {
    type: STRING,
    unique: true,
  },
  classroom_back_img: STRING,
  classroom_img: STRING,
});

Classroom.belongsTo(Teacher, {
  foreignKey: {
    name: "teacher_id",
  },
});

Classroom.belongsTo(Student, {
  foreignKey: {
    name: "student_id",
  },
});

export default Classroom;
