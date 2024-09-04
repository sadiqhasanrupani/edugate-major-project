import React, { Fragment, useEffect, useState } from "react";

//^ stylesheet
import styles from "./ClassroomFooter.module.scss";

//^ auth
import { getAuthToken } from "../../../../utils/auth";

import AddIconTwo from "../../Icons/AddIconTwo";
import DarkAddIcon from "../../Icons/Dark/DarkAddIcon";

const ClassroomFooter = ({ classroomId, themeMode, teachers }) => {
  //^ states
  const [teachersData, setTeachersData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    const getTeacherStudentImages = async () => {
      const teacherStudentImages = await fetch(
        `${process.env.REACT_APP_HOSTED_URL}/classroom/get-classroom-teacher-students/${classroomId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      if (!teacherStudentImages.ok) {
        const response = await teacherStudentImages.json();
        throw new Error({ message: response.message });
      }

      const response = await teacherStudentImages.json();

      const { teachersJoinClass, studentsJoinClass } = response;

      setTeachersData(teachersJoinClass);
      setStudentsData(studentsJoinClass);
    };

    getTeacherStudentImages();
  }, [classroomId]);

  const filteredTeacherImg = teachersData.slice(0, 3);
  const filteredStudentImg = studentsData.slice(0, 3);

  return (
    <div className={styles["classroom-footer"]}>
      {teachers && (
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
                <Fragment key={teacher.teacher_id}>
                  <img
                    src={teacher.coTeacher.teacher_img}
                    alt={`teacher-profile-img`}
                  />
                </Fragment>
              );
            })
          )}
          {teachersData.length > 3 && <span>+{teachersData.length - 3}</span>}
        </div>
      )}
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
              <Fragment key={student.student_id}>
                <img
                  src={student.student.student_img}
                  alt={`student-profile-img`}
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

export default ClassroomFooter;
