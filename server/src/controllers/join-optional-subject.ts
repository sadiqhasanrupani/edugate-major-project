import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { v4 as alphaNumGenerator } from "uuid";

//^ interface
import { CustomRequest } from "../middlewares/is-auth";

//^ models
import JoinOptionalSubject, {
  JoinOptionalSubjectField,
} from "../models/joinOptionalSubject";

import Student, { StudentEagerField, StudentField } from "../models/student";

import JoinClassroom, {
  JoinClassroomEagerField,
  JoinClassroomData as JoinClassroomField,
} from "../models/joinClassroom";
import JoinSubject, { JoinSubjectField } from "../models/joinSubject";
import Assignment, { AssignmentField } from "../models/assignment";
import JoinAssignment, { JoinAssignmentField } from "../models/join-assignment";
import Quiz, { QuizField } from "../models/quiz";
import JoinQuiz from "../models/join-quiz";
import mailSend from "../utils/mails/mailSend.mail";
import Teacher from "../models/teacher";
import studentJoinClassroomMsg from "../utils/mails/messages/student-join-classroom-msg";
import Notification from "../models/notification";

//^ utils
import adminStudentJoinedClassroomMsg from "../utils/mails/messages/admin-student-joined-classroom";

export const postJoinOptionalSubjectsForStudent = async (
  req: Req | CustomRequest,
  res: Res,
  next: Next
) => {
  try {
    interface optionalSubjectBodyData {
      subjectId?: string;
      subjectName?: string;
      optionalSubjectId?: string;
    }

    const optionalSubjects: Array<optionalSubjectBodyData> = (req as Req).body
      .optionalSubjects;
    const { joinClassId } = (req as Req).body;

    //^ getting the current user from the is-auth middleware
    const userId = (req as CustomRequest).userId;

    //^ Checking that the userId is student-id or not.
    const student: StudentEagerField | unknown = await Student.findOne({
      where: {
        student_id: userId,
      },
    });

    if (!student) {
      return res.status(401).json({ message: "Unauthorized student ID." });
    }

    const studentData = student as StudentEagerField;

    //^ checking that the join-optional-subject-id is real or not.
    const joinClassroom: JoinClassroomEagerField | unknown =
      await JoinClassroom.findOne({
        where: {
          join_classroom_id: joinClassId,
        },
        include: [{ model: Teacher, as: "adminTeacher" }],
      });

    if (!joinClassroom) {
      return res
        .status(401)
        .json({ message: "Unauthorized join-classroom ID." });
    }

    const joinClassroomData = joinClassroom as JoinClassroomEagerField;

    //^ also checking that the current student is joined in the respected joinClassroom record.
    const studentJoinClassroom: JoinClassroomEagerField | unknown =
      await JoinClassroom.findOne({
        where: {
          join_classroom_id: joinClassroomData.join_classroom_id,
          student_id: studentData.student_id,
        },
      });

    if (!studentJoinClassroom) {
      return res.status(401).json({
        message:
          "Current user is not authorized to work in the given the join-classroom-id",
      });
    }

    //^ If everything is all ok then the below code will execute.

    //^ creating a messageResult variable
    let messageData: string = "";

    let JoinAssignmentIds: Array<string> = [];

    //^ creating a for-of loop for iterate the optionalSubjects array given by the user.
    for (const optionalSubject of optionalSubjects) {
      //^ inserting the data into the join-optional-subject record on every iteration.
      const joinOptionalSubject: JoinOptionalSubjectField | unknown =
        await JoinOptionalSubject.create({
          join_optional_subject: alphaNumGenerator(),
          optional_subject_id: optionalSubject.optionalSubjectId,
          chosen_subject_id: optionalSubject.subjectId,
          student_id: studentData.student_id,
          join_classroom_id: joinClassroomData.join_classroom_id,
        });

      if (!joinOptionalSubject) {
        return res.status(400).json({
          message: "Can't able to add records in join-optional-subject record.",
        });
      }

      //^ also inserting the data into the join-subject record.
      const studentJoinSubject: JoinSubjectField | unknown =
        await JoinSubject.create({
          join_subject_id: alphaNumGenerator(),
          subject_id: optionalSubject.subjectId,
          join_classroom_id: joinClassroomData.join_classroom_id,
          classroom_id: joinClassroomData.classroom_id,
          student_id: studentData.student_id,
        });

      if (!studentJoinSubject) {
        return res.send(400).json({
          message: "Can't able to add records join subject record.",
        });
      }

      messageData += `${optionalSubject.subjectName}, `;

      //^ getting the join_subject data which is related to the current student.
      const joinSubject: JoinSubjectField | unknown = await JoinSubject.findOne(
        {
          where: {
            student_id: studentData.student_id,
            join_classroom_id: joinClassroomData.join_classroom_id,
            classroom_id: joinClassroomData.classroom_id,
            subject_id: optionalSubject.subjectId,
          },
        }
      );

      if (!joinSubject) {
        return res
          .status(401)
          .json({ message: "Unauthorized classroom ID and join_classroom ID" });
      }

      const joinSubjectData = joinSubject as JoinSubjectField;

      //^ getting all the assignments which is related to the current subject.
      const studentAssignments: Array<AssignmentField> | unknown =
        await Assignment.findAll({
          where: {
            classroom_id: joinSubjectData.classroom_id,
            subject_id: joinSubjectData.subject_id,
          },
        });

      const studentAssignmentsData =
        studentAssignments as Array<AssignmentField>;

      if (studentAssignmentsData.length !== 0) {
        for (const assignment of studentAssignmentsData) {
          const joinAssignment: JoinAssignmentField | unknown =
            await JoinAssignment.create({
              join_assignment_id: alphaNumGenerator(),
              assignment_id: assignment.assignment_id,
              student_id: studentData.student_id,
              subject_id: joinSubjectData.subject_id,
            });

          const joinAssignmentData = joinAssignment as JoinAssignmentField;

          JoinAssignmentIds.push(
            joinAssignmentData.join_assignment_id as string
          );
        }
      }
    }

    return res.status(200).json({
      message: `${messageData}optional subjects joined successfully by ${studentData.student_first_name} ${studentData.student_last_name}`,
      // studentAssignmentsData,
      JoinAssignmentIds,
    });

    // const studentMail = await mailSend({
    //   from: `${joinClassroomData.adminTeacher?.teacher_first_name} <${joinClassroomData.adminTeacher?.teacher_email}>`,
    //   to: studentData.student_email,
    //   subject: `Welcome to our ${joinClassroomData?.classroom?.classroom_name} classroom`,
    //   htmlMessage: studentJoinClassroomMsg({
    //     student_name: studentData.student_first_name,
    //     admin_teacher_name: joinClassroomData.adminTeacher?.teacher_first_name,
    //     admin_teacher_email: joinClassroomData.adminTeacher?.teacher_email,
    //     classroom_name: joinClassroomData.classroom?.classroom_name,
    //   }),
    // });

    // if (!studentMail) {
    //   return res
    //     .status(401)
    //     .json({ message: "Cannot send the email to the student." });
    // }

    // //^ adding notification record for student.
    // const studentNotification = await Notification.create({
    //   notification_id: alphaNumGenerator(),
    //   notification_msg: `<p>Welcome to ${joinClassroomData.classroom?.classroom_name} classroom</p>`,
    //   action: "WELCOME_JOINED_CLASSROOM",
    //   read: false,
    //   sender_teacher_id: joinClassroomData.adminTeacher?.teacher_id,
    //   receiver_student_id: studentData.student_id,
    // });

    // const adminMail = await mailSend({
    //   to: joinClassroomData.adminTeacher?.teacher_email,
    //   subject: `${studentData.student_first_name} ${studentData.student_last_name} joined our ${joinClassroomData.classroom?.classroom_name} classroom`,
    //   htmlMessage: adminStudentJoinedClassroomMsg({
    //     admin_name: joinClassroomData.adminTeacher?.teacher_first_name,
    //     classroom_name: joinClassroomData.classroom?.classroom_name,
    //     student_name: `${studentData.student_first_name} ${studentData.student_last_name}`,
    //   }),
    // });

    // if (!adminMail) {
    //   return res
    //     .status(401)
    //     .json({ message: "Cannot send the email to the admin teacher" });
    // }

    // const studentFullName = `${studentData.student_first_name} ${studentData.student_last_name}`;

    // const adminNotification = await Notification.create({
    //   notification_id: alphaNumGenerator(),
    //   notification_msg: `<p>${studentFullName} joined the ${joinClassroomData.classroom?.classroom_name} classroom successfully.</p>`,
    //   action: "STUDENT_JOINED_CLASSROOM",
    //   read: false,
    //   sender_student_id: studentData.student_id,
    //   receiver_teacher_id: joinClassroomData.adminTeacher?.teacher_id,
    // });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};
