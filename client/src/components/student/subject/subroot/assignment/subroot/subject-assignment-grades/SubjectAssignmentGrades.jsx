import React from "react";
import { useSelector } from "react-redux";

import styles from "./SubjectAssignmentGrades.module.scss";

const SubjectAssignmentGrades = ({ grade, obtainedMarks }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  return (
    <div className={styles["assignment-grade"]}>
      <h5>GRADE</h5>
      <p>
        {obtainedMarks ? obtainedMarks : 0}/{grade ? grade : undefined}
      </p>
    </div>
  );
};

export default SubjectAssignmentGrades;
