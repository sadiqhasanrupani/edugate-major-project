import { STRING, BOOLEAN, DATEONLY, INTEGER } from "sequelize";

import sequelize from "../utils/database.config";

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
