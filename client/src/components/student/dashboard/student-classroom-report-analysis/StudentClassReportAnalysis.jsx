import React from "react";

import styles from "./StudentClassReportAnalysis.module.scss";

//^ component
import UpcomingStudentSchedule from "./UpcomingStudentSchedule/UpcomingStudentSchedule";
import StudentAssignmentScore from "./StudentAssignmentScore/StudentAssignmentScore";
import StudentQuizzesScore from "./StudentQuizzesScore/StudentQuizzesScore.jsx";

const StudentClassReportAnalysis = ({
  themeMode,
  upcomingAssignmentsData,
  upcomingQuizzesData,
  assignmentsScore,
  quizzesScore,
}) => {
  return (
    <div
      className={`${styles["student-class-report"]} ${
        themeMode && styles.dark
      }`}
    >
      <div className={styles["student-class"]}>
        <div className={styles['upcoming-schedules']}>
          <UpcomingStudentSchedule
            themeMode={themeMode}
            upcomingAssignmentsData={upcomingAssignmentsData}
            upcomingQuizzesData={upcomingQuizzesData}
          />
        </div>
        <div className={styles["student-assignment-scores"]}>
          <h2>Student Assignments Score Line Chart</h2>
          <StudentAssignmentScore
            themeMode={themeMode}
            assignmentsScore={assignmentsScore}
          />
        </div>

        <div className={styles["student-quizzes-scores"]}>
          <h2>Student Quizzes Score Line Chart</h2>
          <StudentQuizzesScore
            themeMode={themeMode}
            quizzesScore={quizzesScore}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentClassReportAnalysis;
