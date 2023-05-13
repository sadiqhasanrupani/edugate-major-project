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

export interface JoinAssignmentEagerField extends JoinAssignmentField {
  assignment: {
    assignment_id?: string;
    topic?: string;
    total_marks?: number;
    description?: string;
    start_date?: Date;
    end_date?: Date;
    files?: [{ path?: string; name?: string }];
    created_by?: string;
    classroom_id?: string;
    subject_id?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };

  student: {
    student_id?: string;
    student_first_name?: string;
    student_last_name?: string;
    student_email?: string;
    student_img?: string;
    student_phone_number?: string;
    student_bio?: Date;
    student_dob?: Date;
    createdAt?: Date;
    updatedAt?: Date;
  };

  teacher: {
    teacher_id?: string;
    teacher_first_name?: string;
    teacher_last_name?: string;
    teacher_email?: string;
    teacher_img?: string;
    teacher_phone_number?: string;
    teacher_bio?: string;
    teacher_dob?: Date;
    user_id?: string;
  };

  subject: {
    subject_id?: string;
    subject_name?: string;
    class_id?: string;
    teacher_id?: string;
    subject_status?: string;
  };
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
