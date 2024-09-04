import React from "react";

import styles from "./StudentSubjects.module.scss";

import CompulsorySubject from "../../../../../components/student/join-classroom/subroot/CompulsorySubjects";
import OptionalSubject from "../../../../../components/student/join-classroom/subroot/optional-subjects/OptionalSubject";
import UnderLine from "../../../../../components/UI/underline/UnderLine";

const StudentSubjects = ({
  themeMode,
  compulsorySubjectsData,
  optionalsSubjectsData,
}) => {
  return (
    <div
      className={`${styles["student-subjects"]} ${themeMode && styles.dark}`}
    >
      <div className={styles["student-subject-title"]}>
        <h1>Student Subjects</h1>
        <UnderLine themeMode={themeMode} />
      </div>
      <CompulsorySubject
        compulsorySubjects={compulsorySubjectsData}
        redirectURL={true}
      />
      <OptionalSubject
        optionalSubjects={optionalsSubjectsData}
        redirectURL={true}
      />
    </div>
  );
};

export default StudentSubjects;
