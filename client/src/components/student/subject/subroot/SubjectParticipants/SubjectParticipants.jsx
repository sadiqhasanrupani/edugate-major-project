import React from "react";

import styles from "./SubjectParticipants.module.scss";

import ShowParticipants from "./ShowParticipants/ShowParticipants";

const SubjectParticipants = ({ themeMode, teachers, students }) => {
  return (
    <div className={`${styles["participants"]} ${themeMode && styles.dark}`}>
      <ShowParticipants
        teacher={true}
        participantsData={teachers}
        themeMode={themeMode}
      />
      <div className={styles["student-participants"]}>
        <ShowParticipants
          student={true}
          participantsData={students}
          themeMode={themeMode}
        />
      </div>
    </div>
  );
};

export default SubjectParticipants;
