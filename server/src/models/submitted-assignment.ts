import { STRING, DATE, JSON, INTEGER, Model } from "sequelize";

//^ database configurations
import sequelize from "../utils/database.config";

//^ model
import Student, { StudentField } from "./student";
import Teacher, { TeacherData as TeacherField } from "./teacher";
import Assignment, { AssignmentField } from "./assignment";
import Subject, { SubjectData as SubjectField } from "./subject";
import Classroom, { ClassroomData as ClassroomField } from "./classroom";
export interface SubmittedAssignmentField extends Model {
  submitted_assignment_id?: string;
  grade?: number;
  submitted_files: [{ name?: string; path?: string; original_name?: string }];
  submitted_on: Date;
  feedback?: string;
  student_id?: string;
  checked_by?: string;
  assignment_id?: string;
  subject_id?: string;
  classroom_id?: string;
}

export interface SubmittedAssignEagerField extends SubmittedAssignmentField {
  student?: StudentField;
  teacher?: TeacherField;
  assignment?: AssignmentField;
  classroom?: ClassroomField;
  subject?: SubjectField;
}

const SubmittedAssignment = sequelize.define("submitted_assignment", {
  submitted_assignment_id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
  grade: INTEGER,
  submitted_files: JSON,
  submitted_on: DATE,
  feedback: STRING,
});

SubmittedAssignment.belongsTo(Student, {
  foreignKey: "student_id",
});

SubmittedAssignment.belongsTo(Teacher, {
  foreignKey: "checked_by",
});

SubmittedAssignment.belongsTo(Assignment, {
  foreignKey: "assignment_id",
});

SubmittedAssignment.belongsTo(Subject, {
  foreignKey: "subject_id",
});

SubmittedAssignment.belongsTo(Classroom, {
  foreignKey: "classroom_id",
  onDelete: "CASCADE"
});

export default SubmittedAssignment;
