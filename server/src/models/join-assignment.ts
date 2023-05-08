import { Model, STRING } from "sequelize";

//^ config database
import sequelize from "../utils/database.config";

//^ models
import Student from "./student";
import Assignment from "./assignment";
import Subject from "./subject";
import Teacher from "./teacher";

//^ interface
export interface JoinAssignmentField extends Model {
  join_assignment_id?: string;
  assignment_id?: string;
  student_id?: string;
  subject_id?: string;
  teacher_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

//^ model
const JoinAssignment = sequelize.define("join_assignments", {
  join_assignment_id: STRING,
});

JoinAssignment.belongsTo(Assignment, {
  foreignKey: "assignment_id",
});

JoinAssignment.belongsTo(Student, {
  foreignKey: "student_id",
});

JoinAssignment.belongsTo(Subject, {
  foreignKey: "subject_id",
});

JoinAssignment.belongsTo(Teacher, {
  foreignKey: "teacher_id",
});

export default JoinAssignment;
