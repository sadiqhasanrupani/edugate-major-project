import { STRING, INTEGER } from "sequelize";

import sequelize from "../utils/database.config";

//* models
import Teacher from "./teacher";
import Student from "./student";
import Classroom from "./classroom";

export interface JoinClassroomData {
  join_classroom_id?: string;
  classroom_id?: string;
  teacher_id?: string;
  student_id?: string;
}

const JoinClassroom = sequelize.define("join_classroom", {
  join_classroom_id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
});

JoinClassroom.belongsTo(Classroom, {
  foreignKey: {
    name: "classroom_id",
  },
});

JoinClassroom.belongsTo(Teacher, {
  foreignKey: {
    name: "teacher_id",
  },
});

JoinClassroom.belongsTo(Student, {
  foreignKey: {
    name: "student_id",
  },
});

export default JoinClassroom;
