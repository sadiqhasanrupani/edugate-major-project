import { STRING, DATE } from "sequelize";

import sequelize from "../utils/database.config";

const User = sequelize.define("users", {
  id: {
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
  userEmailId: {
    type: STRING,
    allowNull: false,
  },
  userPhoneNumber: {
    type: STRING,
    allowNull: false,
  },
  userDOB: {
    type: DATE,
    allowNull: false,
  },
  userPassword: {
    type: STRING,
    allowNull: false,
  },
});

export default User;
