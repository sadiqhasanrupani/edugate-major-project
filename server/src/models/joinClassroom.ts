import { STRING, DATE, Model, BOOLEAN } from "sequelize";

import sequelize from "../utils/database.config";

//* models
import Teacher from "./teacher";
import Student from "./student";
import Classroom from "./classroom";
import Invite from "./invite";

export interface JoinClassroomData extends Model {
  join_classroom_id?: string;
  join_request?: Boolean;
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
  join_request: {
    type: BOOLEAN,
    allowNull: false,
  },
  expire_at: DATE,
});

JoinClassroom.belongsTo(Classroom, {
  foreignKey: {
    name: "classroom_id",
  },
});

JoinClassroom.belongsTo(Teacher, {
  as: "adminTeacher",
  foreignKey: {
    name: "admin_teacher_id",
  },
});

JoinClassroom.belongsTo(Teacher, {
  as: "coTeacher",
  foreignKey: {
    name: "teacher_id",
  },
});

JoinClassroom.belongsTo(Student, {
  foreignKey: {
    name: "student_id",
  },
});

// JoinClassroom.belongsTo(Invite, {
//   foreignKey: {
//     name: "invite_id",
//   },
// });

export default JoinClassroom;
