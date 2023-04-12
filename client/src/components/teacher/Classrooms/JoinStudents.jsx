import React, { Fragment } from "react";
import { useSelector } from "react-redux";

//* styles
import styles from "../../../scss/components/teacher/Classrooms/JoinStudents.module.scss";

//* components
import PrimaryCard from "../../UI/Card/TeacherCard";
import SecondaryCard from "../../UI/Card/CardSecondary";

//* icons
import Menu from "../../UI/Icons/More";
import DarkMenu from "../../UI/Icons/Dark/DarkMenu";

const JoinStudents = ({ studentsData }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);
  const studentsDataArray = studentsData.map((studentData) => {
    return studentData.student;
  });

  return (
    <article>
      <PrimaryCard className={styles["primary-card"]}>
        <h3>Students</h3>
        {studentsDataArray.map((studentData) => {
          return (
            <Fragment key={studentData.student_id}>
              <SecondaryCard className={styles["secondary-card"]}>
                <div className={styles["student-div"]}>
                  <img src={studentData.student_img} alt="" />
                  <div className={styles["student-detail"]}>
                    <h4>
                      {studentData.student_first_name} &nbsp;
                      {studentData.student_last_name}
                    </h4>
                    <p>{studentData.student_email}</p>
                  </div>
                </div>
                <div>{themeMode ? <DarkMenu /> : <Menu />}</div>
              </SecondaryCard>
            </Fragment>
          );
        })}
      </PrimaryCard>
    </article>
  );
};

export default JoinStudents;
