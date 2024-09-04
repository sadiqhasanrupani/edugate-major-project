import { STRING, Model } from "sequelize";

//^ database config
import sequelize from "../utils/database.config";

//^ models
import Subject from "./subject";
import Student from "./student";
import JoinClassroom from "./joinClassroom";
import OptionalSubject from "./optionalSubject";

//^ JoinOptionalSubject field interface
export interface JoinOptionalSubjectField extends Model {
  join_optional_subject?: string;
  optional_subject_id?: string;
  chosen_subject_id?: string;
  student_id?: string;
  join_classroom_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface JoinOptionalSubjectEagerField
  extends JoinOptionalSubjectField {
  optionalSubject?: {
    optional_subject_id?: string;
    subject_id_1?: string;
    subject_id_2?: string;
    classroom_id?: string;
    join_classroom_id?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
  chosenSubject?: {
    subject_id?: string;
    subject_name?: string;
    class_id?: string;
    teacher_id?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };

  student?: {
    student_id?: string;
    student_first_name?: string;
    student_last_name?: string;
    student_email?: string;
    student_img?: string;
    student_phone_number?: string;
    student_bio?: Date;
    student_dob?: Date;
    createdAt?: Date;
    updatedAt?: Date;
  };
  joinClassroom?: {
    join_classroom_id?: string;
    join_request?: Boolean;
    classroom_id?: string;
    admin_teacher_id?: string;
    teacher_id?: string;
    student_id?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

const JoinOptionalSubject = sequelize.define("join_optional_subject", {
  join_optional_subject: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
});

JoinOptionalSubject.belongsTo(OptionalSubject, {
  foreignKey: {
    name: "optional_subject_id",
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

JoinOptionalSubject.belongsTo(Subject, {
  foreignKey: {
    name: "chosen_subject_id",
  },
  as: "chosenSubject",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

JoinOptionalSubject.belongsTo(Student, {
  foreignKey: "student_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

JoinOptionalSubject.belongsTo(JoinClassroom, {
  foreignKey: "join_classroom_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default JoinOptionalSubject;
