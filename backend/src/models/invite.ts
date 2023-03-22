import { STRING, INTEGER, DATE, Model } from "sequelize";

import sequelize from "../utils/database.config";

//* models
import Teacher from "./teacher";
import Classroom from "./classroom";

export interface InviteFields extends Model {
  invite_id?: string;
  invite_from?: string;
  invite_to?: string;
  invite_status?: string;
  invite_msg?: string;
  invite_token?: string;
  expire_at?: Date;
  classroom_id?: string;
  invite_to_id?: string;
  invite_from_id?: string;
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
  invite_msg: STRING(1000),
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
  as: "inviteTo",
  foreignKey: {
    name: "invite_to_id",
  },
});

Invite.belongsTo(Teacher, {
  as: "inviteFrom",
  foreignKey: {
    name: "invite_from_id",
  },
});

export default Invite;
