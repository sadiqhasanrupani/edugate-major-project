import { STRING, BOOLEAN, DATEONLY } from "sequelize";

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
  isAdmin: {
    type: BOOLEAN,
  },
  isTeacher: BOOLEAN,
  isStudent: BOOLEAN,
});

export default User;
