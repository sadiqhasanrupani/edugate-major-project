import React from "react";

// styles
import styles from "../../../scss/components/teacher/Classrooms/ClassroomFooter.module.scss"

// components
import AddIconTwo from "../../UI/Icons/AddIconTwo.jsx"

// img
import StudentProfile from "../../../assets/Images/Sadiqhasan Rupani.jpg";

const ClassroomFooter = () => {
  return (
    <div className={styles['classroom-footer']} >
      <div className={styles['student-profile']} >
        <img src={StudentProfile} alt="student-profile" />
        <img src={StudentProfile} alt="student-profile" />
        <img src={StudentProfile} alt="student-profile" />
        <span>+2</span>
      </div>
      <div>
        <AddIconTwo />
      </div>
    </div>
  );
};

export default ClassroomFooter;
