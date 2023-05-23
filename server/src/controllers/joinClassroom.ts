import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { v4 as AlphaNum } from "uuid";
("express-validator");
import { Error, Model, Op } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// interfaces
import { CustomRequest } from "../middlewares/is-auth";

//* model
import Classroom, {
  ClassroomData as ClassroomField,
} from "../models/classroom";
import Teacher, { TeacherData } from "../models/teacher";
import JoinClassroom, {
  JoinClassroomEagerField,
  JoinClassroomData as JoinClassroomField,
} from "../models/joinClassroom";
import Student, { StudentEagerField } from "../models/student";
import User from "../models/user";
import Notification from "../models/notification";
import Subject, { SubjectData as SubjectField } from "../models/subject";
import JoinSubject, { JoinSubjectField } from "../models/joinSubject";
import JoinAssignment, { JoinAssignmentField } from "../models/join-assignment";
import Assignment, { AssignmentField } from "../models/assignment";
import Quiz, { QuizField } from "../models/quiz";
import JoinQuiz from "../models/join-quiz";

//* utils
import mailSend from "../utils/mails/mailSend.mail";
import studentJoinClassroomMsg from "../utils/mails/messages/student-join-classroom-msg";
import adminStudentJoinedClassroomMsg from "../utils/mails/messages/admin-student-joined-classroom";

export const getJoinClassroom = async (req: Req, res: Res, next: Next) => {
  const joinClassId = (req as Req).params.joinClassId;

  JoinClassroom.findOne({
    where: {
      join_classroom_id: joinClassId,
    },
    include: [{ model: Classroom }],
  })
    .then((joinClassroom: any) => {
      return res.status(200).json({
        message: "Successfully retrieve the data",
        classData: joinClassroom.classroom,
      });
    })
    .catch((err: Error) => {
      return res
        .status(401)
        .json({ errorMessage: "Cannot retrieve the data", error: err });
    });
};

//^ post join classroom for students
export const postJoinClassroomAsStudent = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  const { classCode } = (req as Req).body;
  const student_id = (req as CustomRequest).userId;

  try {
    //^ getting the student data with user data using eager loading
    const student: StudentEagerField | unknown = await Student.findOne({
      where: { student_id },
      include: [{ model: User, attributes: ["userId"] }],
    });

    //^ Checking that is there a student_id in the student record
    if (!student) {
      return res
        .status(403)
        .json({ message: `There is no ${student_id} in the database` });
    }

    const studentData = student as StudentEagerField;

    //^ getting the classroom data according to the classroom code.
    const classroom: ClassroomField | unknown = await Classroom.findOne({
      where: {
        classroom_code: classCode,
      },
      include: [
        {
          model: Teacher,
          attributes: [
            "user_id",
            "teacher_first_name",
            "teacher_last_name",
            "teacher_email",
          ],
        },
      ],
    });

    //^ If there is no match in the classroom record, then this condition will run.
    if (!classroom) {
      return res.status(401).json({
        message: "Cannot find the class-code in the classroom record :(",
      });
    }

    interface ClassroomEagerFields extends ClassroomField {
      teacher: {
        user_id?: string;
        teacher_first_name?: string;
        teacher_last_name?: string;
        teacher_email?: string;
      };
    }

    //^ storing the classroom-eager data into the classroomData constant
    const classroomData = classroom as ClassroomEagerFields;

    //^ If the respected student is already exists in the classroom then we will give a
    //! validation error.
    const ExistedStudent = await JoinClassroom.findOne({
      where: {
        classroom_id: classroomData.classroom_id,
        student_id: student_id,
      },
    });

    if (ExistedStudent) {
      return res.status(422).json({
        message: `You'r already joined in the ${classroomData.classroom_name} classroom`,
      });
    }

    //^ Checking that is student is already join classroom as a co-teacher in that respected classroom.

    //& Getting all the coTeacher which is presented in the respected classroom.
    const existedCoTeachers: Array<JoinClassroomEagerField> | unknown =
      await JoinClassroom.findAll({
        attributes: { exclude: ["admin_teacher_id", "student_id"] },
        where: {
          classroom_id: classroomData.classroom_id,
          student_id: null,
          admin_teacher_id: null,
        },
        include: [
          {
            model: Teacher,
            as: "coTeacher",
            attributes: ["teacher_first_name", "user_id"],
          },
        ],
      });

    //^ getting the teacher data where the student user id matched to the teacher's userId.
    const getCoTeacher: Array<JoinClassroomEagerField> = (
      existedCoTeachers as Array<JoinClassroomEagerField>
    ).filter((existedCoTeacher: JoinClassroomEagerField) => {
      if (studentData.user.userId === existedCoTeacher.coTeacher?.user_id) {
        return existedCoTeacher;
      }
    });

    //^ If the student user-id matched

    if (getCoTeacher[0]) {
      if (studentData.user.userId === getCoTeacher[0].coTeacher?.user_id) {
        return res.status(422).json({
          message: "You already joined the classroom as a co-teacher",
        });
      }
    }

    //^ Checking that the student's userId is equal to the admin_teacher's userId while joining
    //^ in the same classroom where same userId is admin.
    //^ if there is one then we will give a validation error.

    if (classroomData.teacher.user_id === studentData.user.userId) {
      return res.status(422).json({
        message: `Can't join you to ${classroomData.classroom_name} bcz you are the admin of the classroom`,
      });
    }

    /*
      ^ If all the conditions are satisfied then the student will be added to the Join classroom
      ^ record. 
    */

    const joinClassroom: JoinClassroomField | unknown =
      await JoinClassroom.create({
        join_classroom_id: AlphaNum(),
        join_request: true,
        classroom_id: classroomData.classroom_id,
        student_id: studentData.student_id,
      });

    if (!joinClassroom) {
      return res.status(401).json({
        message: "Cannot add the student into the joinClassroom record",
      });
    }

    const joinClassroomData = joinClassroom as JoinClassroomField;

    //^ Getting all compulsory subject which is inside the respected classroom
    const compulsorySubjects: Array<SubjectField> | Array<unknown> =
      await Subject.findAll({
        where: {
          class_id: classroomData.classroom_id,
          subject_status: "compulsory",
        },
      });

    const compulsorySubjectsData = compulsorySubjects as Array<SubjectField>;

    if (compulsorySubjectsData.length !== 0) {
      for (const compulsorySubject of compulsorySubjectsData) {
        //^ In every iteration we are inserting the respected student into the compulsory subject of the respected classroom.
        const joinSubject: JoinSubjectField | unknown =
          await JoinSubject.create({
            join_subject_id: AlphaNum(),
            subject_id: compulsorySubject.subject_id,
            join_classroom_id: joinClassroomData.join_classroom_id,
            classroom_id: classroomData.classroom_id,
            student_id: studentData.student_id,
          });

        const joinSubjectData = joinSubject as JoinSubjectField;

        const assignments: Array<AssignmentField> | unknown =
          await Assignment.findAll({
            where: {
              classroom_id: classroomData.classroom_id,
              subject_id: compulsorySubject.subject_id,
            },
          });

        const assignmentsData = assignments as Array<AssignmentField>;

        if (assignmentsData.length !== 0) {
          for (const assignment of assignmentsData) {
            const joinAssignment: JoinAssignmentField | unknown =
              await JoinAssignment.create({
                join_assignment_id: AlphaNum(),
                subject_id: compulsorySubject.subject_id,
                classroom_id: compulsorySubject.class_id,
                student_id: studentData.student_id,
                assignment_id: assignment.assignment_id,
              });

            const joinAssignmentData = joinAssignment as JoinAssignmentField;
          }
        }
        //^ getting all quiz which is created in current subject
        const quizzes: Array<QuizField> | any = await Quiz.findAll({
          where: {
            subject_id: compulsorySubject.subject_id,
            classroom_id: compulsorySubject.class_id,
          },
        });

        const quizzesData = quizzes as Array<QuizField>;

        if (quizzesData.length >= 0) {
          const studentJoinSubject = await JoinSubject.findOne({
            where: {
              subject_id: compulsorySubject.subject_id,
              student_id: studentData.student_id,
            },
          });

          const studentJoinSubjectData = studentJoinSubject as JoinSubjectField;
          for (const quiz of quizzesData) {
            JoinQuiz.create({
              join_quiz_id: AlphaNum(),
              student_id: studentData.student_id,
              quiz_id: quiz.quiz_id,
              join_subject_id: studentJoinSubjectData.join_subject_id,
              join_classroom_id: joinClassroomData.join_classroom_id,
            });
          }
        }
      }
    }

    //^ sending positive response to the client.
    res.status(200).json({
      message: "Successfully joined the student",
      joinClassroomId: joinClassroomData.join_classroom_id,
    });

    const studentMail = await mailSend({
      from: `${classroomData.teacher.teacher_first_name} <${classroomData.teacher.teacher_email}>`,
      to: studentData.student_email,
      subject: `<p>Welcome to our ${classroomData.classroom_name} classroom</p>`,
      htmlMessage: studentJoinClassroomMsg({
        student_name: studentData.student_first_name,
        admin_teacher_name: classroomData.teacher.teacher_first_name,
        admin_teacher_email: classroomData.teacher.teacher_email,
        classroom_name: classroomData.classroom_name,
      }),
    });

    if (!studentMail) {
      return res
        .status(401)
        .json({ message: "Cannot send the email to the student." });
    }

    //^ adding notification record for student.
    const studentNotification = await Notification.create({
      notification_id: AlphaNum(),
      notification_msg: `Welcome to ${classroomData.classroom_name} classroom`,
      action: "WELCOME_JOINED_CLASSROOM",
      read: false,
      sender_teacher_id: classroomData.admin_teacher_id,
      receiver_student_id: studentData.student_id,
    });

    const adminMail = await mailSend({
      to: classroomData.teacher.teacher_email,
      subject: `${studentData.student_first_name} ${studentData.student_last_name} joined our ${classroomData.classroom_name} classroom`,
      htmlMessage: adminStudentJoinedClassroomMsg({
        admin_name: classroomData.teacher.teacher_first_name,
        classroom_name: classroomData.classroom_name,
        student_name: `${studentData.student_first_name} ${studentData.student_last_name}`,
      }),
    });

    if (!adminMail) {
      return res
        .status(401)
        .json({ message: "Cannot send the email to the admin teacher" });
    }

    const studentFullName = `${studentData.student_first_name} ${studentData.student_last_name}`;

    const adminNotification = await Notification.create({
      notification_id: AlphaNum(),
      notification_msg: `<p>${studentFullName} joined the ${classroomData.classroom_name} classroom successfully.</p>`,
      action: "STUDENT_JOINED_CLASSROOM",
      read: false,
      sender_student_id: studentData.student_id,
      receiver_teacher_id: classroomData.admin_teacher_id,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

//^ get join classrooms for students
export const getJoinClassroomAsStudent = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    const student_id = (req as CustomRequest).userId;

    //^ Getting all the joinClassroom which is related to the respective student.
    const joinClassroom: JoinClassroomField | unknown | Array<any> =
      await JoinClassroom.findAll({
        where: {
          student_id,
          teacher_id: null,
          admin_teacher_id: null,
          join_request: true,
        },
        include: [
          {
            model: Classroom,
            attributes: [
              "classroom_id",
              "classroom_name",
              "classroom_profile_img",
              "createdAt",
            ],
          },
        ],
        order: [["createdAt", "ASC"]],
      });

    const joinClassroomData = joinClassroom as JoinClassroomField;

    res.status(200).json({ joinClassroomData });
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

//^ get all students from the respected join-classroom-id
export const getJoinClassroomStudents = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  const classroom_id = (req as Req).query.classId;

  try {
    const joinClassroomStudents: JoinClassroomField | unknown =
      await JoinClassroom.findAll({
        attributes: ["join_classroom_id"],
        where: {
          classroom_id,
          admin_teacher_id: null,
          teacher_id: null,
        },
        include: [
          { model: Student, attributes: ["student_id", "student_img"] },
        ],
        order: [["createdAt", "ASC"]],
      });

    return res.status(200).json(joinClassroomStudents);
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

//^ Creating a controller which can removes the joined classroom members except admin.
export const postRemoveClassroomMember = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  const { classId, memberId } = await (req as Req).body;

  try {
    //^ Checking weather th classroom-id really exists or not.
    const classroom: ClassroomField | unknown = await Classroom.findOne({
      attributes: ["classroom_id", "classroom_name"],
      where: {
        classroom_id: classId,
      },
    });

    if (!classroom) {
      return res.status(401).json({
        message:
          "Unauthorized Classroom ID, Can't find the classroom-id in the record.",
      });
    }

    const classroomData = classroom as ClassroomField;

    //^ Checking weather the join-classroom-id really exists or not.
    const joinClassroom: JoinClassroomEagerField | unknown =
      await JoinClassroom.findOne({
        attributes: ["admin_teacher_id", "teacher_id", "student_id"],
        where: {
          join_classroom_id: memberId,
          classroom_id: classId,
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

    if (!joinClassroom) {
      return res.status(403).json({ message: "You are Forbidden." });
    }

    const joinClassroomData = joinClassroom as JoinClassroomEagerField;

    //^ Now removing the joinClassroom member from the join_classroom record.
    const isClassroomMemberRemoved = JoinClassroom.destroy({
      where: {
        join_classroom_id: memberId,
      },
    });

    if (!isClassroomMemberRemoved) {
      return res
        .status(403)
        .json({ message: "Cannot remove the member from the classroom" });
    }

    let memberFullName: string = "";

    if (
      (joinClassroomData.admin_teacher_id === null,
      joinClassroomData.student_id === null)
    ) {
      memberFullName += `${joinClassroomData.coTeacher?.teacher_first_name} ${joinClassroomData.coTeacher?.teacher_last_name}`;

      return res.status(200).json({
        message: `${memberFullName} is now removed from the ${classroomData.classroom_name} classroom as a CoTeacher.`,
      });
    }

    if (
      (joinClassroomData.admin_teacher_id === null,
      joinClassroomData.teacher_id === null)
    ) {
      memberFullName += `${joinClassroomData.student?.student_first_name} ${joinClassroomData.student?.student_last_name}`;

      return res.status(200).json({
        message: `${memberFullName} is now removed from the ${classroomData.classroom_name} classroom as a Student.`,
      });
    }
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error", error: e });
  }
};
