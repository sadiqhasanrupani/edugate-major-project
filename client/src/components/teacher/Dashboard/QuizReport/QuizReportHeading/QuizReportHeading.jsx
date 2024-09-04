import React from "react";

//^ styles
import styles from "./QuizReportHeading.module.scss";
import UnderLine from "../../../../UI/underline/UnderLine";

const QuizReportHeading = ({ themeMode }) => {
  return (
    <div className={styles["quiz-report-heading"]}>
      <div className={styles["quiz-report-title"]}>
        <h2>Quiz Report</h2>
        <UnderLine themeMode={themeMode} />

      </div>
    </div>
  );
};

export default QuizReportHeading;
