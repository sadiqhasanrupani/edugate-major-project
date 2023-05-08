import React, { Fragment } from "react";

//* styles
import styles from "./SubjectFooter.module.scss";

//* light theme
import AddBtnOne from "../UI/Icons/AddIconTwo";

//* dark theme
import DarkAddBtnOne from "../UI/Icons/Dark/DarkAddIcon";

const SubjectFooter = ({ teachersData, studentsData, themeMode }) => {
  //^ First three data of teachers array
  const firstThreeTeachersData = teachersData.slice(0, 3);

  //^ First three data of students array
  const firstThreeStudentsData = studentsData.slice(0, 3);

  return (
    <div className={styles["subject-footer"]}>
      <div className={styles["teacher-div"]}>
        <h5>Teacher</h5>
        <div className={styles["images"]}>
          {teachersData.length !== 0 ? (
            <>
              {firstThreeTeachersData.map((teacher) => {
                return (
                  <Fragment key={teacher.coTeacher.teacher_id}>
                    <img
                      src={teacher.coTeacher.teacher_img}
                      alt={`teacher-profile`}
                    />
                  </Fragment>
                );
              })}
              {teachersData.length > 3 && (
                <span>+{teachersData.length - 3}</span>
              )}
            </>
          ) : themeMode ? (
            <DarkAddBtnOne />
          ) : (
            <AddBtnOne />
          )}
        </div>
      </div>
      <div>
        <h5>Student</h5>
        <div>
          {studentsData.length !== 0 ? (
            <>
              {firstThreeStudentsData.map((student) => {
                return (
                  <Fragment key={student.student.student_id}>
                    <img
                      src={student.student.student_img}
                      alt="student-profile"
                    />
                  </Fragment>
                );
              })}
              {studentsData.length > 3 && (
                <span>+{studentsData.length - 3}</span>
              )}
            </>
          ) : themeMode ? (
            <DarkAddBtnOne />
          ) : (
            <AddBtnOne />
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectFooter;
