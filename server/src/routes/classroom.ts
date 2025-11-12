import { Router } from "express";
import isAuth from "../middlewares/is-auth";
import {
  postCreateClassroom,
  postUpdateClassroom,
  getClassroom,
  getAdminClasses,
  getJoinedClassesForTeacher,
  postJoinClassroomAsTeacher,
  getJoinClassroomForTeacher,
  getJoinedClassroomTeachers,
  getJoinClassroomStudents,
  getClassrooms,
  getClassroomTeacherStudents,
  postRemoveClassroom,
} from "../controllers/classroom";

import { createUploadMiddleware } from "@app/contract/classrooms/utils/create-upload.middleware.config";

const router = Router();

// ^ POST routes
router.post(
  "/create-classroom",
  isAuth,
  createUploadMiddleware("classroom"),
  postCreateClassroom
);

router.post(
  "/update-classroom",
  isAuth,
  createUploadMiddleware("classroomUpdate"),
  postUpdateClassroom
);

router.post("/join-classroom-as-teacher", isAuth, postJoinClassroomAsTeacher);
router.post("/remove-classroom", isAuth, postRemoveClassroom);

// ^ GET routes
router.get("/getAdminClasses", isAuth, getAdminClasses);
router.get("/getJoinedClassesForTeacher", isAuth, getJoinedClassesForTeacher);
router.get("/getJoinedClassroomTeachers", isAuth, getJoinedClassroomTeachers);
router.get("/getJoinedClassroomStudents", isAuth, getJoinClassroomStudents);
router.get(
  "/get-classroom-teacher-students/:classroomId",
  isAuth,
  getClassroomTeacherStudents
);
router.get("/get-classrooms", isAuth, getClassrooms);

// ^ Dynamic routes
router.get("/:classId", isAuth, getClassroom);
router.get("/get-classroom/:joinClassroomId", isAuth, getJoinClassroomForTeacher);

export default router;
