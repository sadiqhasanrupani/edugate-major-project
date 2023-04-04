import { STRING, BOOLEAN, DATEONLY, INTEGER, Model } from "sequelize";

import sequelize from "../utils/database.config";

export interface UserField extends Model {
  userId?: string;
  userName?: string;
  userImg?: string;
  userEmail?: string;
  userPhoneNumber?: string;
  userDOB?: Date;
  userPassword?: string;
  isTeacher?: Boolean;
  isStudent?: Boolean;
}

const User = sequelize.define("users", {
  userId: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
  userName: {
    type: STRING,
    allowNull: false,
  },
  userImg: {
    type: STRING,
    allowNull: true,
  },
  userEmail: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  userPhoneNumber: {
    type: STRING,
    allowNull: true,
  },
  userDOB: {
    type: DATEONLY,
    allowNull: false,
  },
  userPassword: {
    type: STRING,
    allowNull: false,
  },
  isTeacher: {
    type: BOOLEAN,
  },
  isStudent: {
    type: BOOLEAN,
  },
});

export default User;
