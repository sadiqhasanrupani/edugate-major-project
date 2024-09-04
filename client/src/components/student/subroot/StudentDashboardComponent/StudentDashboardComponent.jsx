import React from "react";

import styles from "./StudentDashboardComponent.module.scss";

//^ components
import StudentClassrooms from "./StudentClassrooms/StudentClassrooms";
import StudentSchedules from "./StudentSchedules/StudentSchedules"

const StudentDashboardComponent = ({ themeMode, classroomsData }) => {
  return (
    <div
      className={`${styles["student-dashboard"]} ${themeMode && styles.dark}`}
    >
      <StudentClassrooms
        classroomsData={classroomsData}
        themeMode={themeMode}
      />

      {/* <StudentSchedules themeMode={themeMode} /> */}
    </div>
  );
};

export default StudentDashboardComponent;
