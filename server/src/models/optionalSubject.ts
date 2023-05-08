import { STRING, Model } from "sequelize";

//^ database config.
import sequelize from "../utils/database.config";

//^ models
import Subject from "./subject";
import Classroom from "./classroom";
import JoinClassroom from "./joinClassroom";
import Student from "./student";

//^ interfaces
export interface OptionalSubjectField extends Model {
  optional_subject_id?: string;
  subject_id_1?: string;
  subject_id_2?: string;
  classroom_id?: string;
  join_classroom_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OptionalSubjectEagerField extends OptionalSubjectField {
  subjectOne?: {
    subject_id?: string;
    subject_name?: string;
    subject_status?: string;
    class_id?: string;
    teacher_id?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
  subjectTwo?: {
    subject_id?: string;
    subject_name?: string;
    subject_status?: string;
    class_id?: string;
    teacher_id?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
  classroom?: {
    classroom_id?: string;
    classroom_code?: number;
    classroom_name?: string;
    classroom_banner_img?: string;
    classroom_profile_img?: string;
    admin_teacher_id?: string;
    co_teacher_id?: string;
    student_id?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
  join_classroom?: {
    join_classroom_id?: string;
    join_request?: Boolean;
    classroom_id?: string;
    admin_teacher_id?: string;
    teacher_id?: string;
    student_id?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
}

const OptionalSubject = sequelize.define("optional_subjects", {
  optional_subject_id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
});

OptionalSubject.belongsTo(Subject, {
  foreignKey: {
    name: "subject_id_1",
  },
  as: "subjectOne",
});

OptionalSubject.belongsTo(Subject, {
  foreignKey: {
    name: "subject_id_2",
  },
  as: "subjectTwo",
});

OptionalSubject.belongsTo(Classroom, {
  foreignKey: "classroom_id",
});

export default OptionalSubject;
