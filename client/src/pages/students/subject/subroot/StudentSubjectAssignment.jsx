import React from "react";
import { useSelector } from "react-redux";

//^ stylesheet
import styles from "../../../../scss/pages/student/subject/subroot/StudentSubjectAssignment.module.scss";

const StudentSubjectAssignment = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  return (
    <article className={`${styles["article"]} ${themeMode && styles["dark"]}`}>
      <h2>Assignments</h2>
    </article>
  );
};

export default StudentSubjectAssignment;
