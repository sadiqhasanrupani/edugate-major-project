import React from "react";

import styles from "./NotAttemptedStudentReport.module.scss";

import NotAttemptedStudentsTable from "./NotAttemptedStudentsTable/NotAttemptedStudentsTable";
import PrimaryBtn from "../../../../UI/Buttons/PrimaryBtn";
import UnderLine from "../../../../UI/underline/UnderLine";
import generateNotAttemptedQuizPDF from "./generateNotAttemptedQuizPDF.js";

const NotAttemptedStudentReport = ({ themeMode, studentsData, quizName }) => {
  const downloadPDFHandler = (e) => {
    generateNotAttemptedQuizPDF(studentsData);
  };
  return (
    <div
      className={`${styles["not-attempted-students-report"]} ${
        themeMode && styles.dark
      }`}
    >
      <div className={styles["student-report-heading"]}>
        <div className={styles["student-report-title"]}>
          <h2>{quizName} Quiz Not Attempted Students Report.</h2>
          <PrimaryBtn
            onClick={downloadPDFHandler}
            className={styles["primary-btn"]}
          >
            Download PDF
          </PrimaryBtn>
        </div>
        <UnderLine themeMode={themeMode} />
      </div>
      <NotAttemptedStudentsTable
        themeMode={themeMode}
        notAttemptedStudents={studentsData}
      />
    </div>
  );
};

export default NotAttemptedStudentReport;
