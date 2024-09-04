import React from "react";

//^ styles
import styles from "./TeacherQuizTabularReport.module.scss";

//^ component
import PresentedStudentReport from "./PresentedStudentReport/PresentedStudentReport";
import NotAttemptedStudentReport from "./NotAttemptedStudentReport/NotAttemptedStudentReport.jsx";

const TeacherQuizTabularReport = ({
  themeMode,
  studentsData,
  notAttemptedStudentsData,
  quizName,
}) => {
  return (
    <div
      className={`${styles["teacher-quiz-report"]} ${themeMode && styles.dark}`}
    >
      <PresentedStudentReport
        quizName={quizName}
        themeMode={themeMode}
        studentsData={studentsData}
      />
      <NotAttemptedStudentReport
        quizName={quizName}
        themeMode={themeMode}
        studentsData={notAttemptedStudentsData}
      />
    </div>
  );
};

export default TeacherQuizTabularReport;
