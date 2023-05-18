import { STRING, DATE, Model, BOOLEAN } from "sequelize";

import sequelize from "../utils/database.config";

//* models
import Teacher, { TeacherData as TeacherField } from "./teacher";
import Student from "./student";
import Classroom, { ClassroomData as ClassroomField } from "./classroom";
import Invite from "./invite";

export interface JoinClassroomData extends Model {
  join_classroom_id?: string;
  join_request?: Boolean;
  classroom_id?: string;
  admin_teacher_id?: string;
  teacher_id?: string;
  student_id?: string;
}

export interface JoinClassroomEagerField extends JoinClassroomData {
  coTeacher?: TeacherField;
  student?: {
    student_id?: string;
    student_first_name?: string;
    student_last_name?: string;
    user_id?: string;
  };
  adminTeacher?: TeacherField;
  classroom?: ClassroomField;
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
