import React from "react";

//^ styles
import styles from "./TeacherQuizGraphReport.module.scss";

//^ component
import TopTenAttemptedStudents from "./TopTenAttemptedStudents/TopTenAttemptedStudents";
import NotSubmittedQuizGraphReport from "./NotSubmittedQuizGraphReport/NotSubmittedQuizGraphReport"

const TeacherQuizGraphReport = ({
  themeMode,
  submittedStudentsData,
  quizName,
  notSubmittedStudentsData,
}) => {
  return (
    <div
      className={`${styles["teacher-graph-report"]} ${
        themeMode && styles.dark
      }`}
    >
      <div className={styles["top-10-students"]}>
        <h5>Top 10 student's Obtained marks in {quizName}</h5>
        <TopTenAttemptedStudents
          submittedStudentsData={submittedStudentsData}
          themeMode={themeMode}
        />
      </div>
      <div className={styles["not-submitted-students"]}>
        <h5>Student who does not attempted the {quizName} quiz</h5>
        <NotSubmittedQuizGraphReport
          themeMode={themeMode}
          notSubmittedStudentsData={notSubmittedStudentsData}
        />
      </div>
    </div>
  );
};

export default TeacherQuizGraphReport;
