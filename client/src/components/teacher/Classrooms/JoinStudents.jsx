import React, { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

//* styles
import styles from "../../../scss/components/teacher/Classrooms/JoinStudents.module.scss";

//* components
import PrimaryCard from "../../UI/Card/TeacherCard";
import ClassroomMember from "./ClassroomMember";

//* icons
import Menu from "../../UI/Icons/More";
import DarkMenu from "../../UI/Icons/Dark/DarkMenu";

//^ auth
import { getAuthToken } from "../../../utils/auth";

const JoinStudents = ({ studentsData, memberId }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  const studentsDataArray = studentsData.map((studentData) => {
    return studentData.student;
  });

  return (
    <article>
      <PrimaryCard
        className={`${styles["primary-card"]} ${themeMode && styles["dark"]}`}
      >
        <h3>Students</h3>
        {studentsData.map((studentData) => {
          return (
            <Fragment key={studentData.student.student_id}>
              <ClassroomMember
                themeMode={themeMode}
                memberId={studentData.join_classroom_id}
                image={studentData.student.student_img}
                fullName={`${studentData.student.student_first_name} ${studentData.student.student_last_name}`}
                emailId={studentData.student.student_email}
              />
            </Fragment>
          );
        })}
      </PrimaryCard>
    </article>
  );
};

export default JoinStudents;
