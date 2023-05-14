import React from "react";

//^ stylesheet
import styles from "./Student.module.scss";

const Student = ({ studentImg, studentFullName, themeMode }) => {
  return (
    <div className={`${styles["student"]} ${themeMode && styles["dark"]}`}>
      <img src={studentImg} alt="student-profile-image" />
      <p>{studentFullName}</p>
    </div>
  );
};

export default Student;
