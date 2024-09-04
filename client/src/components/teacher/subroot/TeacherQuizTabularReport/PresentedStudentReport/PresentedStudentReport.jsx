import React from "react";

import styles from "./PresentedStudentReport.module.scss";

import UnderLine from "../../../../UI/underline/UnderLine";
import PrimaryBtn from "../../../../UI/Buttons/PrimaryBtn";
import AttemptedStudentsTable from "./AttemptedStudentsTable/AttemptedStudentsTable.jsx";
import generateQuizPDF from "./generatedQuizPDF";

const PresentedStudentReport = ({ themeMode, studentsData, quizName }) => {
  const downloadPDFHandler = (e) => {
    generateQuizPDF(studentsData);
  };
  return (
    <div
      className={`${styles["presented-student-report"]} ${
        themeMode && styles.dark
      }`}
    >
      <div className={styles["student-report-heading"]}>
        <div className={styles["student-report-title"]}>
          <h2>{quizName} Quiz Attempted Students.</h2>
          <PrimaryBtn
            onClick={downloadPDFHandler}
            className={styles["primary-btn"]}
          >
            Download PDF
          </PrimaryBtn>
        </div>
        <UnderLine themeMode={themeMode} />
      </div>
      <AttemptedStudentsTable
        themeMode={themeMode}
        studentsData={studentsData}
      />
    </div>
  );
};

export default PresentedStudentReport;
