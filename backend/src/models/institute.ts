import { STRING, NUMBER } from "sequelize";

import sequelize from "../utils/database.config";

// model
import Teacher from "./teacher";

const Institute = sequelize.define("Institutes", {
  institute_id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
  institute_name: {
    type: STRING,
    allowNull: false,
  },
  institute_email: {
    type: STRING,
    unique: true,
  },
  institute_back_img: STRING,
  institute_img: STRING,
});

Institute.belongsTo(Teacher, {
  foreignKey: {
    name: "teacher_id",
  },
});

export default Institute;
