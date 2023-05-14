import React from "react";

//^ stylesheet
import styles from "./StatusGrade.module.scss";

const StatusGrade = ({ submissionStatus, grade, totalMarks, themeMode }) => {
  return (
    <div className={`${styles["status-grade"]} ${themeMode && styles["dark"]}`}>
      <div className={styles["flex-1"]}>
        <h5>STATUS</h5>
        <p>{submissionStatus}</p>
      </div>
      <div className={styles["flex-2"]}>
        <h5>GRADE</h5>
        <div>
          <input
            type="text"
            className={styles["grade-input"]}
            defaultValue={grade}
          />
          /<p>{totalMarks}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusGrade;
