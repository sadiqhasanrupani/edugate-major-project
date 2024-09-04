import { STRING, NUMBER, DATEONLY, Model } from "sequelize";

import sequelize from "../utils/database.config";

// model
import User, { UserField } from "./user";

export interface TeacherData extends Model {
  teacher_id?: string;
  teacher_first_name?: string;
  teacher_last_name?: string;
  teacher_email?: string;
  teacher_img?: string;
  teacher_phone_number?: string;
  teacher_bio?: string;
  teacher_dob?: Date;
  user_id?: string;
}

export interface TeacherEagerField extends TeacherData {
  user: UserField;
}

const Teacher = sequelize.define("teachers", {
  teacher_id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
  teacher_first_name: {
    type: STRING,
    allowNull: false,
  },
  teacher_last_name: STRING,
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
  teacher_bio: {
    type: STRING(10000),
    allowNull: true,
  },
  teacher_dob: DATEONLY,
});

Teacher.belongsTo(User, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: {
    name: "user_id",
  },
});

export default Teacher;
