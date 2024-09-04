import { STRING, INTEGER, DATE, Model } from "sequelize";

//^ database configuration.
import sequelize from "../utils/database.config";

//^ models
import Subject, { SubjectData as SubjectField } from "./subject";
import Teacher, { TeacherData as TeacherField } from "./teacher";
import Student, { StudentField } from "./student";
import JoinClassroom from "./joinClassroom";
import Classroom, { ClassroomEagerField } from "./classroom";

export interface JoinSubjectField extends Model {
  join_subject_id?: string;
  subject_id?: string;
  join_classroom_id?: string;
  classroom_id?: string;
  admin_teacher_id?: string;
  co_teacher_id?: string;
  student_id?: string;
}

export interface JoinSubjectEagerField extends JoinSubjectField {
  coTeacher: TeacherField;
  adminTeacher: TeacherField;
  student: StudentField;
  subject: SubjectField;
  classroom: ClassroomEagerField;
}

const JoinSubject = sequelize.define("join_subjects", {
  join_subject_id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
});

//^ Foreign keys.
JoinSubject.belongsTo(Subject, {
  foreignKey: "subject_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

JoinSubject.belongsTo(JoinClassroom, {
  foreignKey: {
    name: "join_classroom_id",
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

JoinSubject.belongsTo(Classroom, {
  foreignKey: {
    name: "classroom_id",
  },
  onDelete: "CASCADE",
});

JoinSubject.belongsTo(Teacher, {
  foreignKey: {
    name: "admin_teacher_id",
  },
  as: "adminTeacher",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

JoinSubject.belongsTo(Teacher, {
  foreignKey: {
    name: "co_teacher_id",
  },
  as: "coTeacher",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

JoinSubject.belongsTo(Student, {
  foreignKey: {
    name: "student_id",
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default JoinSubject;
