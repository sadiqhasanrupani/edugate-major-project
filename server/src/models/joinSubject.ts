import { STRING, INTEGER, DATE, Model } from "sequelize";

//^ database configuration.
import sequelize from "../utils/database.config";

//^ models
import Subject from "./subject";
import Teacher from "./teacher";
import Student from "./student";

export interface JoinSubjectField extends Model {
  join_subject_id?: string;
  subject_id?: string;
  admin_teacher_id?: string;
  co_teacher_id?: string;
  student_id?: string;
}

export interface JoinSubjectEagerField extends JoinSubjectField {
  coTeacher: {
    teacher_id?: string;
    teacher_first_name?: string;
    teacher_last_name?: string;
    teacher_email?: string;
    teacher_img?: string;
    teacher_phone_number?: string;
    teacher_bio?: string;
    teacher_dob?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    user_id?: string;
  };
  adminTeacher: {
    teacher_id?: string;
    teacher_first_name?: string;
    teacher_last_name?: string;
    teacher_email?: string;
    teacher_img?: string;
    teacher_phone_number?: string;
    teacher_bio?: string;
    teacher_dob?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    user_id?: string;
  };
  student: {
    student_id?: string;
    student_first_name?: string;
    student_last_name?: string;
    student_email?: string;
    student_img?: string;
    student_phone_number?: string;
    student_bio?: string;
    student_dob?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    user_id?: string;
  };
  subject: {
    subject_id?: string;
    subject_name?: string;
    createdAt?: Date;
    updatedAt?: Date;
    class_id?: string;
    teacher_id?: string;
    student_id?: string;
  };
}

const JoinSubject = sequelize.define("join_subjects", {
  join_subject_id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
});

//^ Foreign keys.
JoinSubject.belongsTo(Subject, {
  foreignKey: "subject_id",
});

JoinSubject.belongsTo(Teacher, {
  foreignKey: {
    name: "admin_teacher_id",
  },
  as: "adminTeacher",
});

JoinSubject.belongsTo(Teacher, {
  foreignKey: {
    name: "co_teacher_id",
  },
  as: "coTeacher",
});

JoinSubject.belongsTo(Student, {
  foreignKey: {
    name: "student_id",
  },
});

export default JoinSubject;
