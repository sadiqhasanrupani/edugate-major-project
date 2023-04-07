import { STRING, NUMBER, DATEONLY, Model } from "sequelize";

import sequelize from "../utils/database.config";

// model
import User from "./user";

//^ StudentField interface
export interface StudentField extends Model {
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
}

export interface StudentEagerField extends StudentField {
  user: {
    userId?: string;
    userName?: string;
    userPassword?: string;
    userPhoneNumber?: string;
    userEmail?: string;
    userDOB?: Date;
    isStudent?: Boolean;
    isTeacher?: Boolean;
    createdAt?: Date;
    updatedAt?: Date;
  };
}

const Student = sequelize.define("students", {
  student_id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
  student_first_name: {
    type: STRING,
    allowNull: false,
  },
  student_last_name: {
    type: STRING,
  },
  student_email: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  student_img: STRING,
  student_phone_number: {
    type: STRING,
    allowNull: false,
  },
  student_bio: STRING(10000),
  student_dob: DATEONLY,
});

Student.belongsTo(User, {
  foreignKey: {
    name: "user_id",
  },
});

export default Student;
