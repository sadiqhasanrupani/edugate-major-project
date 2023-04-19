import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { v4 as alphaNum } from "uuid";
import { validationResult } from "express-validator";

//* model
import Subject, { SubjectData as SubjectField } from "../models/subject";
import Teacher from "../models/teacher";
import Student from "../models/student";
import JoinSubject, {
  JoinSubjectEagerField,
  JoinSubjectField,
} from "../models/joinSubject";
import JoinClassroom, {
  JoinClassroomData as JoinClassroomField,
} from "../models/joinClassroom";

//* interface
import { CustomRequest } from "../middlewares/is-auth";
import { SubjectData } from "../models/subject";

import { Op } from "sequelize";

export const postCreateSubject = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  const { subjectName, classId } = (req as Req).body;
  const userId = (req as CustomRequest).userId;

  const errors = validationResult(req as Req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Invalid Credentials", error: errors.array() });
  } else {
    const subject: SubjectData | unknown = await Subject.create({
      subject_id: alphaNum(),
      subject_name: subjectName,
      class_id: classId,
      teacher_id: userId,
    });

    try {
      const subjectData = subject as SubjectData;
      /* 
      ^ If the subject record created successfully then we will add all the joined student 
      ^ of the classroom into the join subject record. 
    */
      if (!subject) {
        return res.status(401).json({ message: "Cannot add the subject data" });
      }
      return res.status(200).json({
        message: `${subjectData.subject_name} subject created successfully`,
        subject: subjectData,
      });
    } catch (e: Error | unknown) {
      return res
        .status(500)
        .json({ message: "Something went wrong", error: e as Error });
    }
  }
};

export const getClassroomSubjects = (req: Req, res: Res, next: Next) => {
  const classId = req.query.classId;

  Subject.findAll({
    where: { class_id: classId },
    order: [["createdAt", "ASC"]],
    include: [Teacher, Student],
  })
    .then((subjects: SubjectData | unknown) => {
      if (subjects) {
        return res
          .status(200)
          .json({ message: "Subjects got successfully", subjects });
      } else {
        return res
          .status(401)
          .json({ message: "There is something in request" });
      }
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Something went wrong", error: err });
    });
};

export const getSubject = (req: Req, res: Res, next: Next) => {
  const subjectId = req.params.subjectId;

  Subject.findOne({ where: { subject_id: subjectId } })
    .then((subject: SubjectData | unknown) => {
      if (subject) {
        res
          .status(200)
          .json({ message: "Subject data got successfully", subject });
      } else {
        res.status(401).json({ message: "Cannot find the subject's data" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: "Something went wrong" });
    });
};

//^ getting the classroom members according to the subject-id.
export const getClassroomMembers = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  //^ SubjectId
  const subjectId = (req as Req).params.subjectId;

  try {
    //^ Finding the subject record according to the given subject-id.
    const subject: SubjectField | unknown = await Subject.findOne({
      where: {
        subject_id: subjectId,
      },
    });

    //^ If the subject ID didn't match then this condition will run.
    if (!subject) {
      return res.status(401).json({ message: "Unauthorized subject ID." });
    }

    const subjectData = subject as SubjectField;

    //^ also finding the joinSubjectData according to the given subjectId.
    const joinSubjectTeacherId: Array<JoinSubjectField> | Array<unknown> =
      await JoinSubject.findAll({
        attributes: ["co_teacher_id"],
        where: {
          admin_teacher_id: null,
          student_id: null,
          subject_id: subjectId,
        },
      });

    const joinSubjectTeacherIdsData =
      joinSubjectTeacherId as Array<JoinSubjectField>;

    let joinTeacherId = [];

    if (joinSubjectTeacherId.length !== 0) {
      for (const joinSubjectTeacherId of joinSubjectTeacherIdsData) {
        joinTeacherId.push(joinSubjectTeacherId.co_teacher_id);
      }
    }

    //^ getting the classroom-id according to the respected subject record.
    const classroomId = subjectData.class_id;

    //^ Creating a coTeacherJoinClassroomField interface
    interface TeacherJoinClassField extends JoinClassroomField {
      coTeacher: {
        teacher_id?: string;
        teacher_first_name?: string;
        teacher_last_name?: string;
        teacher_email?: string;
        teacher_img?: string;
        teacher_phone_number?: string;
        teacher_bio?: string;
        teacher_dob?: Date;
        createdAt?: Date;
        updatedAt?: Date;
      };
    }

    //^ teacherJoinClassroom array of data
    const teacherJoinClassroom: Array<TeacherJoinClassField> | unknown =
      await JoinClassroom.findAll({
        attributes: ["join_classroom_id"],
        where: {
          classroom_id: classroomId,
          admin_teacher_id: null,
          student_id: null,
          join_request: true,
          teacher_id: {
            [Op.notIn]: joinTeacherId,
          },
        },
        include: [
          { model: Teacher, as: "coTeacher", order: [["createAt", "ASC"]] },
        ],
      });

    if (!teacherJoinClassroom) {
      return res.status(401).json({
        message:
          "Cannot find the teacher join-classroom record bcz there is a problem in classroom-id",
      });
    }

    const coTeacherJoinClassData =
      teacherJoinClassroom as Array<TeacherJoinClassField>;

    //^ Also getting the all student which are present in the join-classroom

    interface StudentJoinClassField extends JoinClassroomField {
      students: {
        student_id?: string;
        student_first_name?: string;
        student_last_name?: string;
        student_email?: string;
        student_img?: string;
        student_phone_number?: string;
        student_bio?: string;
        student_dob?: Date;
        createdAt?: Date;
        updatedAt?: Date;
      };
    }

    //^ also finding the joinSubjectData according to the given subjectId.
    const joinSubjectStudentId: Array<JoinSubjectField> | Array<unknown> =
      await JoinSubject.findAll({
        attributes: ["student_id"],
        where: {
          admin_teacher_id: null,
          co_teacher_id: null,
          subject_id: subjectId,
        },
      });

    const joinSubjectStudentIdsData =
      joinSubjectStudentId as Array<JoinSubjectField>;

    let joinStudentId = [];

    if (joinSubjectStudentId.length !== 0) {
      for (const joinSubjectStudentId of joinSubjectStudentIdsData) {
        joinStudentId.push(joinSubjectStudentId.student_id);
      }
    }

    const studentJoinClassroom: Array<StudentJoinClassField> | unknown =
      await JoinClassroom.findAll({
        attributes: ["join_classroom_id"],
        where: {
          join_request: true,
          admin_teacher_id: null,
          teacher_id: null,
          classroom_id: classroomId,
          student_id: {
            [Op.notIn]: joinStudentId,
          },
        },
        include: [{ model: Student, order: [["createdAt", "ASC"]] }],
      });

    // return res.status(200).json({ studentJoinClassroom, joinStudentId, joinTeacherId });

    const studentJoinClassData =
      studentJoinClassroom as Array<StudentJoinClassField>;

    return res.status(200).json({
      coTeacherJoinClassData,
      studentJoinClassData,
    });
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

//^ This function will helps us to add teachers into the join-subject record
export const postAddTeachers = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  const teacherIds: Array<string> = await (req as Req).body.teacherIds;
  const subjectId: string = await (req as Req).body.subjectId;

  try {
    let result: string = "";

    const subject: SubjectField | unknown = await Subject.findOne({
      where: {
        subject_id: subjectId,
      },
    });

    if (!subject) {
      return res.status(401).json({ message: "UnAuthorized Subject id." });
    }

    const subjectData = subject as SubjectField;

    for (const teacherId of teacherIds) {
      const joinTeacher = await JoinSubject.findOne({
        where: {
          admin_teacher_id: null,
          co_teacher_id: teacherId,
          student_id: null,
          subject_id: subjectData.subject_id,
        },
      });

      if (joinTeacher) {
        return res
          .status(422)
          .json({ message: "Teacher already joined the subject" });
      }

      const insertJoinSubjectData: JoinSubjectField | unknown =
        await JoinSubject.create({
          join_subject_id: alphaNum(),
          subject_id: subjectId,
          co_teacher_id: teacherId,
        });

      if (insertJoinSubjectData) {
        const joinSubject: JoinSubjectEagerField | unknown =
          await JoinSubject.findOne({
            attributes: ["join_subject_id"],
            where: {
              join_subject_id: (insertJoinSubjectData as JoinSubjectField)
                .join_subject_id,
              co_teacher_id: (insertJoinSubjectData as JoinSubjectField)
                .co_teacher_id,
              subject_id: (insertJoinSubjectData as JoinSubjectField)
                .subject_id,
            },
            include: [
              {
                model: Teacher,
                as: "coTeacher",
                attributes: ["teacher_first_name", "teacher_last_name"],
              },
            ],
          });

        const joinSubjectData = joinSubject as JoinSubjectEagerField;

        const coTeacherFullName = `${joinSubjectData.coTeacher.teacher_first_name} ${joinSubjectData.coTeacher.teacher_last_name}`;

        result += coTeacherFullName + " ";
      }
    }

    res.status(200).json({
      message: `${result}Joined the ${subjectData.subject_name} subject successfully.`,
    });
  } catch (e) {
    return res.status(200).json({ message: e });
  }
};

//^ This function will helps us to add students into the join-subject record
export const postAddStudents = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  //^ getting the array of student ids from the body request, also getting
  //^ the subjectId from the body request.
  const studentIds: Array<string> = await (req as Req).body.studentIds;
  const subjectId: string = await (req as Req).body.subjectId;

  try {
    let result: string = "";

    const subject: SubjectField | unknown = await Subject.findOne({
      attributes: ["subject_id", "subject_name"],
      where: {
        subject_id: subjectId,
      },
    });

    if (!subject) {
      return res.status(401).json({ message: "UnAuthorized Subject id." });
    }

    const subjectData = subject as SubjectField;

    //^ Student already existed flag
    let studentExisted: Array<any> = [];

    for (const studentId of studentIds) {
      //^ checking if the studentId is already exists in the join-subject record.
      const JoinStudent = await JoinSubject.findOne({
        where: {
          admin_teacher_id: null,
          co_teacher_id: null,
          student_id: studentId,
          subject_id: subjectData.subject_id,
        },
      });

      //^ If yes then the existed id will store in studentExisted array.
      if (JoinStudent) {
        studentExisted.push(studentId);
        break;
      }

      //^ If not then will add into the join-subject record.
      const joinStudentSubject: JoinSubjectField | unknown =
        await JoinSubject.create({
          join_subject_id: alphaNum(),
          subject_id: subjectId,
          student_id: studentId,
        });

      if (joinStudentSubject) {
        const joinStudentSubjectData = joinStudentSubject as JoinSubjectField;

        const joinSubject: JoinSubjectEagerField | unknown =
          await JoinSubject.findOne({
            attributes: ["join_subject_id"],
            where: {
              join_subject_id: joinStudentSubjectData.join_subject_id,
              student_id: joinStudentSubjectData.student_id,
              subject_id: joinStudentSubjectData.subject_id,
              co_teacher_id: null,
              admin_teacher_id: null,
            },
            include: [
              {
                model: Student,
                attributes: ["student_first_name", "student_last_name"],
              },
            ],
          });

        const joinSubjectData = joinSubject as JoinSubjectEagerField;

        const studentFullName = `${joinSubjectData.student.student_first_name} ${joinSubjectData.student.student_last_name}`;

        result += studentFullName + " ";
      }
    }

    if (studentExisted.length > 0) {
      return res.status(403).json({
        message: "Can't allow to add same id multiple times",
        studentExisted,
      });
    }

    return res.status(200).json({
      message: `${result}Joined the ${subjectData.subject_name} subject successfully`,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error", error: e });
  }
};

export const getJoinTeachersStudents = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  //^ getting the subjectId from the params request.
  const { subjectId } = (req as Req).params;

  //^ Checking Wether the given subject id is exists or not

  try {
    const subject: SubjectField | unknown = await Subject.findOne({
      attributes: ["subject_id"],
      where: {
        subject_id: subjectId,
      },
    });

    if (!subject) {
      return res.status(401).json({ message: "Unauthorized Subject ID." });
    }

    //^ get the joined teachers from the joinSubject record
    const joinSubjectTeachers: Array<JoinSubjectEagerField> | Array<unknown> =
      await JoinSubject.findAll({
        attributes: ["join_subject_id"],
        where: {
          subject_id: subjectId,
          admin_teacher_id: null,
          student_id: null,
        },
        include: [
          {
            model: Teacher,
            as: "coTeacher",
            attributes: [
              "teacher_id",
              "teacher_first_name",
              "teacher_last_name",
              "teacher_email",
              "teacher_img",
            ],
          },
        ],
        order: [["createdAt", "ASC"]],
      });

    const joinSubjectTeachersData =
      joinSubjectTeachers as Array<JoinSubjectEagerField>;

    //^ Getting the joinSubjectStudentData from joinSubject record.
    const joinSubjectStudents: Array<JoinSubjectEagerField> | Array<unknown> =
      await JoinSubject.findAll({
        attributes: ["join_subject_id"],
        where: {
          admin_teacher_id: null,
          co_teacher_id: null,
          subject_id: subjectId,
        },
        include: [
          {
            model: Student,
            attributes: [
              "student_id",
              "student_first_name",
              "student_last_name",
              "student_email",
              "student_img",
            ],
          },
        ],
        order: [["createdAt", "ASC"]],
      });

    const joinSubjectStudentsData =
      joinSubjectStudents as Array<JoinSubjectEagerField>;

    return res
      .status(200)
      .json({ joinSubjectTeachersData, joinSubjectStudentsData });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server error", error: e });
  }
};

export const postRemoveJoinSubjectMember = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  //^ getting the memberId and subjectId from the body request
  const { memberId, subjectId } = (req as Req).body;

  try {
    //^ checking weather the subject-id is really existed or not.
    const subject: SubjectField | unknown = await Subject.findOne({
      attributes: ["subject_id", "subject_name"],
      where: {
        subject_id: subjectId,
      },
    });

    if (!subject) {
      return res.status(401).json({ message: "Unauthorized subject id" });
    }

    const subjectData = subject as SubjectField;

    //^ Checking weather the memberId is really existed in JoinSubject record or not.
    const joinMemberSubject: JoinSubjectEagerField | unknown =
      await JoinSubject.findOne({
        where: {
          join_subject_id: memberId,
        },
        include: [
          {
            model: Teacher,
            as: "coTeacher",
            attributes: [
              "teacher_id",
              "teacher_first_name",
              "teacher_last_name",
            ],
          },
          {
            model: Student,
            attributes: [
              "student_id",
              "student_first_name",
              "student_last_name",
            ],
          },
        ],
      });

    if (!joinMemberSubject) {
      return res.status(401).json({ message: "Unauthorized member-id" });
    }

    const joinMemberSubjectData = joinMemberSubject as JoinSubjectEagerField;

    let memberFullName: string = "";

    JoinSubject.destroy({
      where: {
        join_subject_id: joinMemberSubjectData.join_subject_id,
      },
    });

    if (
      joinMemberSubjectData.admin_teacher_id === null &&
      joinMemberSubjectData.co_teacher_id === null
    ) {
      memberFullName += `${joinMemberSubjectData.student.student_first_name} ${joinMemberSubjectData.student.student_last_name}`;

      return res.status(200).json({
        message: `${memberFullName} is now removed from the ${subjectData.subject_name} subject as a Student.`,
      });
    }

    if (
      joinMemberSubjectData.admin_teacher_id === null &&
      joinMemberSubjectData.student_id === null
    ) {
      memberFullName += `${joinMemberSubjectData.coTeacher.teacher_first_name} ${joinMemberSubjectData.coTeacher.teacher_last_name}`;

      return res.status(200).json({
        message: `${memberFullName} is now removed from the ${subjectData.subject_name} subject as a Teacher.`,
      });
    }
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error", error: e });
  }
};

export const postCreateAssignment = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {};