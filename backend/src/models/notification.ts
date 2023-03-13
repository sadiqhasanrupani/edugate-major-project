import { STRING, DATE, BOOLEAN } from "sequelize";

import sequelize from "../utils/database.config";

//* models
import Teacher from "./teacher";
import Student from "./student";

export interface NotificationFields {
  notification_id?: string;
  notification_msg?: string;
  action?: string;
  read?: Boolean;
  sender_teacher_id?: string;
  sender_student_id?: string;
  receiver_teacher_id?: string;
  receiver_student_id?: string;
}

const Notification = sequelize.define("notifications", {
  notification_id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
  notification_msg: {
    type: STRING(1000),
  },
  action: STRING,
  read: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

Notification.belongsTo(Teacher, {
  as: "senderTeacherId",
  foreignKey: {
    name: "sender_teacher_id",
  },
});

Notification.belongsTo(Student, {
  as: "senderStudentId",
  foreignKey: {
    name: "sender_student_id",
  },
});

Notification.belongsTo(Teacher, {
  as: "receiverTeacherId",
  foreignKey: {
    name: "receiver_teacher_id",
  },
});

Notification.belongsTo(Student, {
  as: "receiverStudentId",
  foreignKey: {
    name: "receiver_student_id",
  },
});

export default Notification;
