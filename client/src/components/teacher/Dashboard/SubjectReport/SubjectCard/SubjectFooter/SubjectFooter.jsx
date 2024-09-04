import React, { Fragment, useEffect, useState } from "react";
import { json } from "react-router-dom";

import styles from "./SubjectFooter.module.scss";

import { getAuthToken } from "../../../../../../utils/auth";

import AddIconTwo from "../../../../../UI/Icons/AddIconTwo";
import DarkAddIcon from "../../../../../UI/Icons/Dark/DarkAddIcon";

const SubjectFooter = ({ themeMode, subjectId, classroomId }) => {
  const [studentsData, setStudentsData] = useState([]);
  const [teachersData, setTeachersData] = useState([]);

  useEffect(() => {
    const getAllSubjectStudentTeachers = async () => {
      const subjectStudentTeachers = await fetch(
        `${process.env.REACT_APP_HOSTED_URL}/subject/get-join-subject-teachers-students/${subjectId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );

      if (!subjectStudentTeachers.ok) {
        console.log(await subjectStudentTeachers.json());
        throw json({ message: "Something went wrong" }, { status: 500 });
      }

      const response = await subjectStudentTeachers.json();

      setStudentsData(response.joinSubjectStudentsData);
      setTeachersData(response.joinSubjectTeachersData);
    };

    getAllSubjectStudentTeachers();
  }, []);

  const filteredTeacherImg = teachersData.slice(0, 3);
  const filteredStudentImg = studentsData.slice(0, 3);

  return (
    <div className={styles["subject-footer"]}>
      <div className={styles["teacher-img"]}>
        {filteredTeacherImg.length === 0 ? (
          themeMode ? (
            <DarkAddIcon />
          ) : (
            <AddIconTwo />
          )
        ) : (
          filteredTeacherImg.map((teacher) => {
            return (
              <Fragment key={teacher.coTeacher.teacher_id}>
                <img
                  src={teacher.coTeacher.teacher_img}
                  alt={`teacher-profile-image`}
                />
              </Fragment>
            );
          })
        )}
        {teachersData.length > 3 && <span>+{teachersData.length - 3}</span>}
      </div>
      <div className={styles["student-img"]}>
        {filteredStudentImg.length === 0 ? (
          themeMode ? (
            <DarkAddIcon />
          ) : (
            <AddIconTwo />
          )
        ) : (
          filteredStudentImg.map((student) => {
            return (
              <Fragment key={student.student.student_id}>
                <img
                  src={student.student.student_img}
                  alt={`student-profile-image`}
                />
              </Fragment>
            );
          })
        )}
        {studentsData.length > 3 && <span>+{studentsData.length - 3}</span>}
      </div>
    </div>
  );
};

export default SubjectFooter;
