import { STRING, INTEGER, DATE, Model } from "sequelize";

import sequelize from "../utils/database.config";

//* models
import Teacher from "./teacher";
import Classroom from "./classroom";

export interface InviteFields extends Model{
  invite_id?: string;
  invite_from?: string;
  invite_to?: string;
  invite_status?: string;
  invite_token?: string;
  expire_at?: Date;
  classroom_id?: string;
  teacher_id?: string;
}

const Invite = sequelize.define("invite", {
  invite_id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
  invite_from: {
    type: STRING,
  },
  invite_to: {
    type: STRING,
  },
  invite_status: {
    type: STRING,
  },
  invite_token: {
    type: STRING(1000),
  },
  expire_at: {
    type: DATE,
  },
});

Invite.belongsTo(Classroom, {
  foreignKey: {
    name: "classroom_id",
  },
});

Invite.belongsTo(Teacher, {
  as: "coTeacher",
  foreignKey: {
    name: "co_teacher_id",
  },
});

Invite.belongsTo(Teacher, {
  as: "adminTeacher",
  foreignKey: {
    name: "admin_teacher_id",
  },
});

export default Invite;
