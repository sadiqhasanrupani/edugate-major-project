import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { v4 as AlphaNum } from "uuid";
import randNumGenerator from "../utils/number-generator/random-apha-num-generator";
("express-validator");
import { Error, Model, Op } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// interfaces
import { CustomRequest } from "../middlewares/is-auth";

//* model
import Classroom, { ClassroomData } from "../models/classroom";
import Teacher, { TeacherData } from "../models/teacher";
import JoinClassroom, { JoinClassroomData } from "../models/joinClassroom";

// utils
import mailSend from "../utils/mails/mailSend.mail";
import classroomCreationMsg from "../utils/mails/messages/classroomCreated";
import JoinClassroomMsg from "../utils/mails/messages/join-classroom-message";
import Student from "../models/student";
import { json } from "body-parser";

export const getJoinClassroom = async (req: Req, res: Res, next: Next) => {
  const joinClassId = (req as Req).params.joinClassId;

  JoinClassroom.findOne({
    where: {
      join_classroom_id: joinClassId,
    },
    include: [
      {model: Classroom}
    ]
  })
    .then((joinClassroom: any) => {
      return res
        .status(200)
        .json({ message: "Successfully retrieve the data", classData: joinClassroom.classroom });
    })
    .catch((err: Error) => {
      return res
        .status(401)
        .json({ errorMessage: "Cannot retrieve the data", error: err });
    });
};
