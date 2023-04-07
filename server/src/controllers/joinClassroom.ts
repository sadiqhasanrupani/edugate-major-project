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
  JoinClassroomData as JoinClassroomField,
} from "../models/joinClassroom";
import Student, { StudentEagerField } from "../models/student";
import User from "../models/user";
import Notification from "../models/notification";

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
      // include: [{ model: User }],
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

    const studentMail = await mailSend({
      from: `${classroomData.teacher.teacher_first_name} <${classroomData.teacher.teacher_email}>`,
      to: studentData.student_email,
      subject: `Welcome to our ${classroomData.classroom_name} classroom`,
      htmlMessage: studentJoinClassroomMsg({
        student_name: studentData.student_first_name,
        admin_teacher_name: classroomData.teacher.teacher_first_name,
        admin_teacher_email: classroomData.teacher.teacher_email,
        classroom_name: classroomData.classroom_name,
      }),
    });

    const joinClassroomData = joinClassroom as JoinClassroomField;

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
      notification_msg: `${studentFullName} joined the ${classroomData.classroom_name} classroom successfully.`,
      action: "STUDENT_JOINED_CLASSROOM",
      read: false,
      sender_student_id: studentData.student_id,
      receiver_teacher_id: classroomData.admin_teacher_id,
    });

    //^ sending positive response to the client.
    return res.status(200).json({
      message: "Successfully joined the student",
      joinClassroomId: joinClassroomData.join_classroom_id,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};
