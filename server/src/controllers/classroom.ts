import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { v4 as AlphaNum } from "uuid";
import randNumGenerator from "../utils/number-generator/random-apha-num-generator";
("express-validator");
import { Error, Model } from "sequelize";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

// interfaces
import { CustomRequest as AuthRequest } from "../middlewares/is-auth";

//* model
import Classroom, {
  ClassroomData as ClassroomField,
} from "../models/classroom";
import Teacher, {
  TeacherEagerField,
  TeacherData as TeacherField,
} from "../models/teacher";
import JoinClassroom, {
  JoinClassroomData as JoinClassroomField,
  JoinClassroomEagerField,
} from "../models/joinClassroom";
import Invitation, { InviteFields } from "../models/invite";
import Notification from "../models/notification";

// utils
import mailSend from "../utils/mails/mailSend.mail";
import classroomCreationMsg from "../utils/mails/messages/classroomCreated";

//^ models
import Student from "../models/student";
import User from "../models/user";
import Assignment from "../models/assignment";
import Invite from "../models/invite";
import JoinSubject from "../models/joinSubject";
import OptionalSubject from "../models/optionalSubject";
import Quiz from "../models/quiz";
import Subject from "../models/subject";
import SubmittedAssignment from "../models/submitted-assignment";
import SubmittedQuizzes from "../models/submitted-quizzes";
import JoinQuiz from "../models/join-quiz";

export interface FilesData {
  classroomBackgroundImg?: any;
  classroomProfileImg?: any;
}

export const postCreateClassroom = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next,
) => {
  try {
    const classroomName = req.body.classroomName;
    const classroomCategory = req.body.classroomCategory;

    //^ retrieving files
    const files: any = (req as Req).files;

    //^ Grabbing the separate array from the file object
    const classroomBannerImg = files.classroomBackgroundImg;
    const classroomProfileImg = files.classroomProfileImg;

    let classroomBannerImgPath: string = `${process.env.HOST_SITE}/images/classroom-banner-img/banner-placeholder.png`;

    let classroomProfileImgPath: string = `${process.env.HOST_SITE}/images/classroom-profile-img/profile-placeholder.png`;

    //^ Grabbing the path of image for the image file array.
    if (classroomBannerImg) {
      classroomBannerImgPath = `${process.env.HOST_SITE}/images/classroom-banner-img/${classroomBannerImg[0].filename}`;
    }

    if (classroomProfileImg) {
      classroomProfileImgPath = `${process.env.HOST_SITE}/images/classroom-profile-img/${classroomProfileImg[0].filename}`;
    }

    // random code
    const code: string = randNumGenerator(6);

    const userId = (req as AuthRequest).userId;

    //^ checking the current userId is in teacher record or not.
    const teacher: TeacherField | unknown = await Teacher.findOne({
      where: {
        teacher_id: userId,
      },
    });

    if (!teacher) {
      return res.status(400).json({ message: "Unauthorized teacher ID." });
    }

    const teacherData = teacher as TeacherField;

    const classroom: ClassroomField | unknown = await Classroom.create({
      classroom_id: AlphaNum(),
      classroom_code: code,
      classroom_name: classroomName,
      classroom_category: classroomCategory,
      classroom_banner_img: classroomBannerImgPath,
      classroom_profile_img: classroomProfileImgPath,
      admin_teacher_id: teacherData.teacher_id,
    });

    const classroomData = classroom as ClassroomField;

    //^ joining the admin into the join_classroom record
    const joinClassroom = await JoinClassroom.create({
      join_classroom_id: AlphaNum(),
      classroom_id: (classroom as ClassroomField).classroom_id,
      admin_teacher_id: (classroom as ClassroomField).admin_teacher_id,
      join_request: true,
    });

    if (!joinClassroom) {
      return res
        .status(400)
        .json({ message: "Can't able to add new field into join_classroom" });
    }

    res.status(200).json({
      message: "classroom Created successfully",
      classId: classroomData.classroom_id,
    });

    mailSend({
      to: teacherData.teacher_email,
      htmlMessage: classroomCreationMsg(
        classroomData.classroom_name as string,
        teacherData.teacher_first_name as string,
      ),
      subject: `${classroomData.classroom_name as string} created successfully`,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const postUpdateClassroom = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next,
) => {
  try {
    //^ getting the current user id
    const { userId } = req as AuthRequest;

    //^ getting the classroomName from the body request
    const { classroomName, classroomId } = (req as Req).body;

    //^ getting the files data
    const files: any = (req as Req).files;

    //& checking that the current user id teacher or not.
    const teacher = await Teacher.findOne({
      where: {
        teacher_id: userId,
      },
    });

    if (!teacher) {
      return res.status(401).json({ message: "Unauthorized Teacher ID." });
    }

    const teacherData = teacher as TeacherField;

    //& checking that the received class id is valid or not.
    const classroom = await Classroom.findOne({
      attributes: ["classroom_id"],
      where: {
        classroom_id: classroomId,
      },
    });

    if (!classroom) {
      return res.status(401).json({ message: "Unauthorized classroom ID." });
    }

    //& checking that the current teacher is admin-teacher of current classroom's record.
    const adminTeacherClassroom = await Classroom.findOne({
      where: {
        classroom_id: classroomId,
        admin_teacher_id: teacherData.teacher_id,
      },
    });

    if (!adminTeacherClassroom) {
      return res
        .status(403)
        .json({ message: "Only Admin can update the classroom." });
    }

    const adminTeacherClassroomData = adminTeacherClassroom as ClassroomField;

    //^ Grabbing the separate array from the file object
    const classroomBannerImg = files.bannerImg;
    const classroomProfileImg = files.profileImg;

    let classroomBannerImgPath: string =
      adminTeacherClassroomData.classroom_banner_img as string;

    let classroomProfileImgPath: string =
      adminTeacherClassroomData.classroom_profile_img as string;

    //^ Grabbing the path of image for the image file array.
    if (classroomBannerImg) {
      classroomBannerImgPath = `${process.env.HOST_SITE}/images/classroom-banner-img/${classroomBannerImg[0].filename}`;
    }

    if (classroomProfileImg) {
      classroomProfileImgPath = `${process.env.HOST_SITE}/images/classroom-profile-img/${classroomProfileImg[0].filename}`;
    }

    const updateClassroom = await Classroom.update(
      {
        classroom_name: classroomName
          ? classroomName
          : adminTeacherClassroomData.classroom_name,
        classroom_banner_img: classroomBannerImgPath,
        classroom_profile_img: classroomProfileImgPath,
      },
      {
        where: {
          classroom_id: adminTeacherClassroomData.classroom_id,
        },
      },
    );

    if (!updateClassroom) {
      return res.status(400).json({
        message: `Cannot able to update the ${adminTeacherClassroomData.classroom_name} classroom `,
      });
    }

    return res.status(200).json({ message: "Classroom updated successfully." });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const postRemoveClassroom = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next,
) => {
  try {
    const { userId } = req as AuthRequest;
    const { classroomId } = (req as Req).body;

    const teacher = await Teacher.findOne({
      attributes: ["teacher_id"],
      where: {
        teacher_id: userId,
      },
    });

    if (!teacher) {
      return res.status(401).json({ message: "Unauthorized Teacher ID." });
    }

    const teacherData = teacher as TeacherField;

    const classroom = await Classroom.findOne({
      attributes: ["classroom_id", "classroom_name"],
      where: {
        classroom_id: classroomId,
      },
    });

    if (!classroom) {
      return res.status(401).json({ message: "Unauthorized classroom ID." });
    }

    const classroomData = classroom as ClassroomField;

    const adminTeacherClassroom = await Classroom.findOne({
      where: {
        classroom_id: classroomData.classroom_id,
        admin_teacher_id: teacherData.teacher_id,
      },
    });

    if (!adminTeacherClassroom) {
      return res.status(401).json({
        message: `Only Admin can delete this ${classroomData.classroom_id} classroom.`,
      });
    }

    const adminTeacherClassroomData = adminTeacherClassroom as ClassroomField;

    SubmittedQuizzes.destroy({
      where: { classroom_id: adminTeacherClassroomData.classroom_id },
      force: true,
    });

    Quiz.destroy({
      where: { classroom_id: adminTeacherClassroomData.classroom_id },
      force: true,
    });

    SubmittedAssignment.destroy({
      where: { classroom_id: adminTeacherClassroomData.classroom_id },
      force: true,
    });

    Assignment.destroy({
      where: {
        classroom_id: adminTeacherClassroomData.classroom_id,
      },
      force: true,
    });

    JoinSubject.destroy({
      where: { classroom_id: adminTeacherClassroomData.classroom_id },
      force: true,
    });

    Subject.destroy({
      where: { class_id: adminTeacherClassroomData.classroom_id },
      force: true,
    });

    OptionalSubject.destroy({
      where: { classroom_id: adminTeacherClassroomData.classroom_id },
      force: true,
    });

    Invite.destroy({
      where: {
        classroom_id: adminTeacherClassroomData.classroom_id,
      },
      force: true,
    });

    JoinClassroom.destroy({
      where: { classroom_id: adminTeacherClassroomData.classroom_id },
      force: true,
    });

    Classroom.destroy({
      where: {
        classroom_id: adminTeacherClassroomData.classroom_id,
      },
      force: true,
    });

    return res.status(200).json({
      message: `${adminTeacherClassroomData.classroom_name} Classroom and related data have been destroyed successfully.`,
    });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong", error: e });
  }
};

//* controller for to join a class as a teacher.
export const postJoinClassroomAsTeacher = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next,
) => {
  /*
    TODO: Check that the joining teacher is student of the respected classroom or not.
  */

  const { classCode } = (req as Req).body;
  const teacherId = (req as AuthRequest).userId;

  try {
    //^ Getting the classroom_id
    const classroom: ClassroomField | unknown = await Classroom.findOne({
      where: { classroom_code: classCode },
    });

    if (!classroom) {
      return res.status(403).json({
        errorMessage: "Can't find the classroom code in the database.",
      });
    }

    //* classroom Id
    const classroomId = (classroom as ClassroomField).classroom_id;

    const joinClassroom: JoinClassroomField | unknown =
      await JoinClassroom.findOne({
        where: {
          teacher_id: teacherId,
          classroom_id: classroomId,
        },
      });

    //* Checking if the teacher already joined the classroom or not.
    if (joinClassroom) {
      if ((joinClassroom as JoinClassroomField).join_request === true) {
        return res
          .status(403)
          .json({ errorMessage: "You already joined the classroom" });
      }
    }

    //* Checking if the admin_teacher is joining his/her classroom or not.
    if ((classroom as ClassroomField).admin_teacher_id === teacherId) {
      return res.status(403).json({
        errorMessage: "Can't add the admin into their classroom",
      });
    }

    //^ Finding the teacher's user-id according to it's id.
    const teacher: TeacherField | unknown = await Teacher.findOne({
      where: {
        teacher_id: teacherId,
      },
      include: [{ model: User }],
    });

    if (!teacher) {
      return res.status(401).json({ message: "Unauthorized teacher" });
    }
    const teacherData = teacher as TeacherEagerField;
    const teacherUserId = teacherData.user.userId;

    /*
      ^ Checking that if there is a userId in student field where the teacher selected
      ^ teacher user id match or not. 
    */

    //^ First getting all the students which is inside in the join classroom.

    const getAllStudents: Array<JoinClassroomEagerField> | unknown =
      await JoinClassroom.findAll({
        attributes: ["join_classroom_id"],
        where: {
          admin_teacher_id: null,
          teacher_id: null,
          classroom_id: classroomId,
        },
        include: [
          {
            model: Student,
            attributes: [
              "student_first_name",
              "student_last_name",
              "student_id",
              "user_id",
            ],
          },
        ],
      });

    //^ getting the student data where the co_teacher user id matched to the student's userId.
    const getStudents = getAllStudents as Array<JoinClassroomEagerField>;

    getStudents.filter((getStudent) => {
      if (teacherUserId === getStudent.student?.user_id) {
        return getStudent;
      }
    });

    if (getStudents[0]) {
      if (teacherUserId === getStudents[0].student?.user_id) {
        console.log(`\n ${getStudents[0].student?.user_id}\n`);
        return res.status(401).json({
          errorMessage:
            "Unable to join classroom bcz you are already join this classroom as student",
        });
      }
    }

    //^ If the join Id is already exists in the record but the join_request is false, then this condition will run
    try {
      if (
        (joinClassroom as JoinClassroomField).join_request === false &&
        (joinClassroom as JoinClassroomField).teacher_id === teacherId
      ) {
        const updatedJoinClass: JoinClassroomField | unknown =
          await JoinClassroom.update(
            {
              join_request: true,
            },
            {
              where: {
                teacher_id: teacherId,
              },
            },
          );
        if (updatedJoinClass) {
          return res
            .status(200)
            .json({ message: "join request is updated successfully." });
        }
      }
    } catch (err) {
      console.log(`\n ${err} \n`);
    }

    //^ ExpireAt logic.
    const expireAt = new Date();
    expireAt.setHours(expireAt.getHours() + 1);

    //^ Creating a joinClassroom record here
    const createJoinClassroom = await JoinClassroom.create({
      join_classroom_id: AlphaNum(),
      join_request: false,
      classroom_id: classroomId,
      teacher_id: teacherId,
      expire_at: expireAt,
    });

    /*
      ^ sending the join request to the admin of the classroom_id,
      * for that first we need to find the admin_teacher from the join classroom record.
    */

    interface AdminTeacherRecord extends Model {
      admin_teacher_id: string;
      adminTeacher: {
        teacher_first_name?: string;
        teacher_last_name?: string;
        teacher_email?: string;
        createdAt?: string;
        updatedAt?: string;
        user_id?: string;
      };
    }

    //* Getting the adminTeacherData using eager loading.
    const adminTeacherData: AdminTeacherRecord | unknown =
      await JoinClassroom.findOne({
        attributes: ["admin_teacher_id"],
        where: {
          classroom_id: classroomId,
          teacher_id: null,
          student_id: null,
        },
        include: [
          {
            model: Teacher,
            as: "adminTeacher",
            attributes: {
              exclude: [
                "teacher_id",
                "teacher_img",
                "teacher_phone_number",
                "teacher_dob",
                "teacher_bio",
              ],
            },
          },
        ],
      });

    //^ Storing the adminTeacherData into adminTeacher for simplicity.
    const adminTeacher = adminTeacherData as AdminTeacherRecord;

    //? Getting the teacher Data.

    try {
      const teacherRecord: TeacherField | unknown = await Teacher.findOne({
        attributes: [
          "teacher_id",
          "teacher_email",
          "teacher_first_name",
          "teacher_last_name",
        ],
        where: {
          teacher_id: teacherId,
        },
      });

      const teacherName: string = `${(teacherRecord as TeacherField).teacher_first_name
        } ${(teacherRecord as TeacherField).teacher_last_name}`;

      //* request message
      const requestMessage = `<p><b>${teacherName}</b> send a request to join <b>${(classroom as ClassroomField).classroom_name
        }</b> classroom as a <b>Co-Teacher</b></p>`;

      crypto.randomBytes(32, async (err, buffer) => {
        if (err) {
          return res.status(500).json({ message: err.message, error: err });
        }
        const generatedToken: string = buffer.toString("hex");

        const inviteData: InviteFields = await Invitation.create({
          invite_id: AlphaNum(),
          invite_to: adminTeacher.adminTeacher.teacher_email,
          invite_from: (teacherRecord as TeacherField).teacher_email,
          invite_msg: requestMessage,
          invite_status: "joinRequest",
          invite_token: generatedToken,
          expire_at: expireAt,
          classroom_id: classroomId,
          invite_to_id: adminTeacher.admin_teacher_id,
          invite_from_id: (teacherRecord as TeacherField).teacher_id,
        });

        const notification = await Notification.create({
          notification_id: AlphaNum(),
          notification_msg: requestMessage,
          action: "joinRequest",
          sender_teacher_id: (teacherRecord as TeacherField).teacher_id,
          receiver_teacher_id: adminTeacher.admin_teacher_id,
          invite_id: inviteData.invite_id,
          expire_at: expireAt,
        });
      });

      res.status(200).json({
        message: "user join request sended to the owner successfully.",
        joinClassroom: createJoinClassroom,
      });
    } catch (err) {
      console.log(`\n ${err} \n`);
    }
  } catch (err) {
    res.status(500).json({ errorMessage: "Internal Server error", error: err });
  }
};

export const getClassroom = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next,
) => {
  const classId = (req as Req).params.classId;

  try {
    //^ Checking if the classroom id really exists in the classroom record.
    const classroom: ClassroomField | unknown = await Classroom.findOne({
      where: {
        classroom_id: classId,
      },
    });

    if (!classroom) {
      return res.status(401).json({ message: "Unauthorized classroom id." });
    }

    //^ If all right then will insert the data of classroom inside the classroomData constant
    const classroomData = classroom as ClassroomField;

    return res.status(200).json({
      message: "Successfully got the classroom data.",
      classroomData,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

export const getAdminClasses = async (req: Req | AuthRequest, res: Res) => {
  const admin_id = (req as AuthRequest).userId;

  try {
    const getClassrooms = await Classroom.findAll({
      where: { admin_teacher_id: admin_id },
      order: [["createdAt", "ASC"]],
    });

    if (getClassrooms) {
      res
        .status(200)
        .json({ message: "Classrooms got successfully.", getClassrooms });
    } else {
      res.status(401).json({ message: "Unauthorized access" });
    }
  } catch (err: Error | any) {
    res
      .status(500)
      .json({ message: "Something went wrongs", error: err as Error });
  }
};

export const getJoinedClassesForTeacher = async (
  req: Req | AuthRequest,
  res: Res,
) => {
  const userId = (req as AuthRequest).userId;

  `SELECT classroom_name from join_classrooms 
      INNER JOIN classrooms 
      WHERE classrooms.classroom_id = join_classrooms.classroom_id 
      AND join_classrooms.teacher_id = '9f29caa6-2f9e-4526-a71b-feb037cf6016'
      AND join_classrooms.join_request = 1;`;


  JoinClassroom.findAll({
    where: { teacher_id: userId, join_request: true },
    order: [["createdAt", "ASC"]],
    include: [
      {
        model: Teacher,
        as: "coTeacher",
      },
      {
        model: Teacher,
        as: "adminTeacher",
      },
      {
        model: Student,
      },
      { model: Classroom },
    ],
  })
    .then((classrooms: ClassroomField | any) => {
      if (classrooms) {
        res.status(200).json({
          message: "Classes got successfully.",
          joinedClassrooms: classrooms,
        });
      } else {
        res.status(401).json({ message: "Cannot find the Data" });
      }
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Something went wrong", error: err });
    });
};

export const getJoinClassroomForTeacher = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next,
) => {
  const teacherId = (req as AuthRequest).userId;
  const joinClassroomId = (req as Req).params.joinClassroomId;

  JoinClassroom.findOne({
    where: {
      join_classroom_id: joinClassroomId,
      teacher_id: teacherId,
    },
    include: [
      { model: Teacher, as: "coTeacher" },
      { model: Student },
      { model: Classroom },
    ],
  })
    .then((joinClassroomData: any) => {
      res.status(200).json({ joinClassroomData });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Something went wrong", error: err });
    });
};

export const getJoinedClassroomTeachers = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next,
) => {
  const classId = (req as Req).query.classId;
  const userId = (req as AuthRequest).userId;

  JoinClassroom.findAndCountAll({
    where: {
      classroom_id: classId,
      join_request: true,
    },
    order: [["createdAt", "ASC"]],
    include: [
      {
        model: Teacher,
        as: "coTeacher",
      },
    ],
  })
    .then((TeacherJoinClassroomData) => {
      res.status(200).json({ TeacherJoinClassroomData });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: "Something went wrong", error: err });
    });
};

export const getJoinClassroomStudents = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next,
) => {
  const classId = (req as Req).query.classId;

  JoinClassroom.findAndCountAll({
    attributes: ["join_classroom_id", "student_id"],
    where: {
      join_request: true,
      classroom_id: classId,
    },
    order: [["createdAt", "ASC"]],
    include: [
      {
        model: Student,
        attributes: ["student_img"],
      },
    ],
  })
    .then((studentsData) => {
      res.status(200).json({ studentsData });
    })
    .catch();
};

export const getClassrooms = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next,
) => {
  try {
    //^ getting the current user
    const { userId } = req as AuthRequest;

    //^ checking that the current user is teacher or not.
    const teacher: TeacherField | unknown = await Teacher.findOne({
      where: { teacher_id: userId },
    });

    if (!teacher) {
      return res.status(401).json({ message: "Unauthorized teacher ID." });
    }

    const teacherData = teacher as TeacherField;

    //^ getting all the current teacher's created classrooms
    const createdClassrooms: Array<ClassroomField> | Array<unknown> =
      await Classroom.findAll({
        where: {
          admin_teacher_id: teacherData.teacher_id,
        },
        order: [["createdAt", "ASC"]],
      });

    const createdClassroomData = createdClassrooms as Array<ClassroomField>;

    //^ getting all the current teacher's joined classrooms
    const joinedClassrooms: Array<JoinClassroomEagerField> | Array<unknown> =
      await JoinClassroom.findAll({
        where: {
          teacher_id: teacherData.teacher_id,
        },
        include: [{ model: Classroom }],
        order: [["createdAt", "ASC"]],
      });

    const joinedClassroomData =
      joinedClassrooms as Array<JoinClassroomEagerField>;

    return res.status(200).json({
      createdClassroom: createdClassroomData,
      joinedClassroom: joinedClassroomData,
      // classroomsByMonth
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};

export const getClassroomTeacherStudents = async (
  req: Req | AuthRequest,
  res: Res,
  next: Next,
) => {
  try {
    const { classroomId } = (req as Req).params;
    const { userId } = req as AuthRequest;

    //^ checking the current user is teacher
    const teacher: TeacherField | unknown = await Teacher.findOne({
      where: {
        teacher_id: userId,
      },
    });

    if (!teacher) {
      const student = await Student.findOne({
        where: {
          student_id: userId,
        },
      });

      if (!student) {
        return res.status(401).json({ message: "Unauthorized user ID." });
      }
    }

    const teacherData = teacher as TeacherField;

    //^ checking that the received classroom id exists in the record or not.
    const classroom: ClassroomField | unknown = await Classroom.findOne({
      where: {
        classroom_id: classroomId,
      },
    });

    if (!classroom) {
      return res.status(401).json({ message: "Unauthorized classroom ID." });
    }

    const classroomData = classroom as ClassroomField;

    //^ getting all the teacher's data which is joined to the current classroom.
    const teachersClassData: Array<JoinClassroomEagerField> | Array<unknown> =
      await JoinClassroom.findAll({
        where: {
          classroom_id: classroomId,
          student_id: null,
          admin_teacher_id: null,
          join_request: true,
        },
        include: [{ model: Teacher, as: "coTeacher" }, { model: Classroom }],
        order: [["createdAt", "ASC"]],
      });

    const teachersData = teachersClassData as Array<JoinClassroomEagerField>;

    //^ getting all the student's data which is joined to the current classroom.
    const studentsClassData: Array<JoinClassroomEagerField> | Array<unknown> =
      await JoinClassroom.findAll({
        where: {
          classroom_id: classroomId,
          teacher_id: null,
          admin_teacher_id: null,
          join_request: true,
        },
        include: [{ model: Student }, { model: Classroom }],
        order: [["createdAt", "ASC"]],
      });

    const studentsData = studentsClassData as Array<JoinClassroomEagerField>;

    return res.status(200).json({
      teachersJoinClass: teachersData,
      studentsJoinClass: studentsData,
      classroom: classroomData,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error", error: e });
  }
};
