import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

import User, { UserField } from "../models/user";
import Teacher, { TeacherData } from "../models/teacher";
import Student, { StudentField } from "../models/student";
import mailSend from "../utils/mails/mailSend.mail";
import welcomeEmail from "../utils/mails/messages/welcome";
import createToken from "../utils/tokens/createToken";

import { SERVER_CONFIG } from "@app/contract/server/configs/server.config";

type CreateUserPayload = Omit<UserField, keyof import("sequelize").Model> & {
  userId: string;
  userName: string;
  userEmail: string;
  userPhoneNumber: string;
  userDOB: Date;
  userPassword: string;
  userImg: string;
  isTeacher: boolean;
  isStudent: boolean;
};

// Utility for consistent error responses
const handleError = (res: Response, status: number, message: string, error?: any) => {
  console.error(`[AuthError]: ${message}`, error || "");
  return res.status(status).json({ message, error });
};

export const postSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userName, userEmail, userPhoneNumber, userDOB, userPassword } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ message: "Invalid credentials", error: errors.array() });
    }

    const hashedPassword = await bcrypt.hash(userPassword, 12);

    const payload: CreateUserPayload = {
      userId: uuidv4(),
      userName,
      userEmail,
      userPhoneNumber,
      userImg: `${SERVER_CONFIG.HOST_SITE}/images/user-profile-img/user-placeholder.png`,
      userDOB,
      userPassword: hashedPassword,
      isTeacher: false,
      isStudent: false,
    };

    // Type-cast to maintain TS safety without touching model
    const user = (await User.create(payload)) as unknown as UserField;

    res.status(201).json({
      message: "User created successfully.",
      data: { id: user.userId },
    });

    // Async welcome mail (non-blocking)
    mailSend({
      to: userEmail,
      subject: "Welcome to Edugate 🎓",
      htmlMessage: welcomeEmail(userName),
    }).catch((err) => console.error("Email send failed:", err));
  } catch (err) {
    next(err);
  }
};

export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userEmail, userRole } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ message: "Invalid credentials", error: errors.array() });
    }

    if (!["teacher", "student"].includes(userRole)) {
      return handleError(res, 401, "Unauthorized access: invalid role");
    }

    const user = (await User.findOne({ where: { userEmail } })) as unknown as UserField;
    if (!user) return handleError(res, 404, "User not found");

    await User.update(
      {
        isTeacher: userRole === "teacher",
        isStudent: userRole === "student",
      },
      { where: { userEmail } }
    );

    if (userRole === "teacher") {
      const teacher = await Teacher.findOne({ where: { teacher_email: userEmail } }) as unknown as TeacherData;
      if (teacher) {
        const token = createToken({ email: teacher?.teacher_email, id: teacher.teacher_id });
        return res.status(200).json({ message: "Login successful", token });
      }

      const newTeacher = await Teacher.create({
        teacher_id: uuidv4(),
        teacher_first_name: user.userName.split(" ")[0],
        teacher_last_name: user.userName.split(" ")[1] || null,
        teacher_email: user.userEmail,
        teacher_img: user.userImg,
        teacher_phone_number: user.userPhoneNumber,
        teacher_dob: user.userDOB,
        user_id: user.userId,
        teacher_bio: 'teacher',
      }) as unknown as TeacherData;

      const token = createToken({ email: newTeacher.teacher_email, id: newTeacher.teacher_id });
      return res.status(201).json({ message: "Teacher created successfully", token });
    }

    if (userRole === "student") {
      const student = await Student.findOne({ where: { student_email: userEmail } }) as unknown as StudentField;
      if (student) {
        const token = createToken({ email: student.student_email, id: student.student_id });
        return res.status(200).json({ message: "Login successful", token });
      }

      const newStudent = await Student.create({
        student_id: uuidv4(),
        student_first_name: user.userName.split(" ")[0],
        student_last_name: user.userName.split(" ")[1] || null,
        student_email: user.userEmail,
        student_phone_number: user.userPhoneNumber,
        student_dob: user.userDOB,
        student_img: user.userImg,
        user_id: user.userId,
        student_bio: 'student',
      }) as unknown as StudentField;

      const token = createToken({ email: newStudent.student_email, id: newStudent.student_id });
      return res.status(201).json({ message: "Student created successfully", token });
    }
  } catch (err) {
    next(err);
  }
};