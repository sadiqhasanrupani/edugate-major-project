import { STRING, DATEONLY, Model } from "sequelize";
import sequelize from "../utils/database.config";
import User from "./user";

export interface StudentField {
  student_id?: string;
  student_first_name?: string;
  student_last_name?: string;
  student_email?: string;
  student_img?: string;
  student_phone_number?: string;
  student_bio?: string;
  student_dob?: Date;
  user_id?: string;
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
  student_last_name: STRING,
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

  student_bio: {
    type: STRING(1000),
    allowNull: true,
  },

  student_dob: DATEONLY,

  user_id: {
    type: STRING,
    allowNull: false,
  },
});

Student.belongsTo(User, {
  foreignKey: {
    name: "user_id",
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default Student;