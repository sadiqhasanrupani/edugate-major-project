import { STRING, NUMBER, DATEONLY } from "sequelize";

import sequelize from "../utils/database.config";

// model
import User from "./user";

const Student = sequelize.define("students", {
  student_id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
  student_name: {
    type: STRING,
    allowNull: false,
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
  student_dob: DATEONLY,
});

Student.belongsTo(User, {
  foreignKey: {
    name: "user_id",
  },
});

export default Student;
