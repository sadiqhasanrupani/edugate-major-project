import React from "react";

import styles from "./UpcomingStudentSchedule.module.scss";

import PrimaryCard from "../../../../UI/Card/TeacherCard";
import UpcomingAssignments from "./UpcomingAssignments/UpcomingAssignments";
import UpcomingQuizzes from "./UpcomingQuizzes/UpcomingQuizzes";

const UpcomingStudentSchedule = ({
  themeMode,
  upcomingAssignmentsData,
  upcomingQuizzesData,
}) => {
  return (
    <div
      className={`${styles["upcoming-schedule"]} ${themeMode && styles.dark}`}
    >
      <h2>Schedules</h2>
      <br />
      <PrimaryCard className={styles["primary-card"]}>
        <UpcomingAssignments
          themeMode={themeMode}
          upcomingAssignments={upcomingAssignmentsData}
        />
        <UpcomingQuizzes
          themeMode={themeMode}
          upcomingQuizzes={upcomingQuizzesData}
        />
      </PrimaryCard>
    </div>
  );
};

export default UpcomingStudentSchedule;
