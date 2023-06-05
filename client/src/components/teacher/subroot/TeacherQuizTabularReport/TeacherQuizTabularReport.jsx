import React from "react";

//^ styles
import styles from "./TeacherQuizTabularReport.module.scss";

//^ component
import PresentedStudentReport from "./PresentedStudentReport/PresentedStudentReport";
import NotAttemptedStudentReport from "./NotAttemptedStudentReport/NotAttemptedStudentReport.jsx"

const TeacherQuizTabularReport = ({ themeMode, studentsData, notAttemptedStudentsData }) => {
  return (
    <div
      className={`${styles["teacher-quiz-report"]} ${themeMode && styles.dark}`}
    >
      <PresentedStudentReport
        themeMode={themeMode}
        studentsData={studentsData}
      />
      <NotAttemptedStudentReport
        themeMode={themeMode}
        studentsData={notAttemptedStudentsData}
      />
    </div>
  );
};

export default TeacherQuizTabularReport;
