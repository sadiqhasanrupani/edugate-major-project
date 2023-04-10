import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { v4 as alphaNum } from "uuid";
import { validationResult } from "express-validator";

//* model
import Subject from "../models/subject";
import Teacher from "../models/teacher";
import Student from "../models/student";
import Classroom from "../models/classroom";

//* interface
import { CustomRequest } from "../middlewares/is-auth";
import { SubjectData } from "../models/subject";

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
    })

   try {
    const subjectData = subject as SubjectData;
    /* 
      ^ If the subject record created successfully then we will add all the joined student 
      ^ of the classroom into the join subject record. 
    */
    if(!subject) {
      return res.status(401).json({ message: "Cannot add the subject data" });
    }
    return res.status(200).json({
      message: `${
        subjectData.subject_name
      } subject created successfully`,
      subject: subjectData,
    })
   } catch(e: Error | unknown) {
    return res
    .status(500)
    .json({ message: "Something went wrong", error: e as Error});
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

export const getClassroomMembers = async (req: Req | CustomRequest, res: Res, next: Next) =>  {
  
}

export const postCreateAssignment = async(req: Req | CustomRequest, res: Res, next: Next) => {
  
}
