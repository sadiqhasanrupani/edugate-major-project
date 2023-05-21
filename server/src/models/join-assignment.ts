import { Model, STRING } from "sequelize";

//^ config database
import sequelize from "../utils/database.config";

//^ models
import Student, { StudentField } from "./student";
import Assignment, { AssignmentField } from "./assignment";
import Subject, { SubjectData as SubjectField } from "./subject";
import Teacher, { TeacherData as TeacherField } from "./teacher";
import SubmittedAssignment, {
  SubmittedAssignmentField,
} from "./submitted-assignment";

//^ interface
export interface JoinAssignmentField extends Model {
  join_assignment_id?: string;
  assignment_id?: string;
  student_id?: string;
  subject_id?: string;
  teacher_id?: string;
  submitted_assignment_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface JoinAssignmentEagerField extends JoinAssignmentField {
  assignment: AssignmentField;
  student: StudentField;
  teacher: TeacherField;
  subject: SubjectField;
  submittedAssignment: SubmittedAssignmentField;
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

JoinAssignment.belongsTo(SubmittedAssignment, {
  foreignKey: "submitted_assignment_id",
});

export default JoinAssignment;
