import { STRING, NUMBER, DATEONLY } from "sequelize";

import sequelize from "../utils/database.config";

// model
import User from "./user";

const Teacher = sequelize.define("teachers", {
  teacher_id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
  teacher_name: {
    type: STRING,
    allowNull: false,
  },
  teacher_email: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  teacher_img: STRING,
  teacher_phone_number: {
    type: STRING,
    allowNull: false,
  },
  teacher_dob: DATEONLY,
});

Teacher.belongsTo(User, {
  foreignKey: {
    name: "user_id",
  },
});

export default Teacher;
