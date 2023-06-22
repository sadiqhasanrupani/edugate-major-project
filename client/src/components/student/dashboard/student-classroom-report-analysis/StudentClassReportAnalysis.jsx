import React from "react";

import styles from "./StudentClassReportAnalysis.module.scss";

//^ component
import UpcomingStudentSchedule from "./UpcomingStudentSchedule/UpcomingStudentSchedule";
import StudentAssignmentScore from "./StudentAssignmentScore/StudentAssignmentScore";
import StudentScoreRadarChart from "./StudentScoreRadarChart/StudentScoreRadarChart";

const StudentClassReportAnalysis = ({
  themeMode,
  upcomingAssignmentsData,
  upcomingQuizzesData,
  assignmentsScore,
}) => {
  return (
    <div
      className={`${styles["student-class-report"]} ${
        themeMode && styles.dark
      }`}
    >
      <div className={styles["student-class"]}>
        <UpcomingStudentSchedule
          themeMode={themeMode}
          upcomingAssignmentsData={upcomingAssignmentsData}
          upcomingQuizzesData={upcomingQuizzesData}
        />
        {/* <StudentScoreRadarChart
          themeMode={themeMode}
          assignmentsScore={assignmentsScore}
        /> */}
        <div className={styles["student-assignment-scores"]}>
          <h2>Student Assignments Score Line Chart</h2>
          <StudentAssignmentScore
            themeMode={themeMode}
            assignmentsScore={assignmentsScore}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentClassReportAnalysis;
