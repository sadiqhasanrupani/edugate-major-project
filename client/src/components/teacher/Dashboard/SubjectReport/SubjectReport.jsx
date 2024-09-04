import React, { Fragment } from "react";

import styles from "./SubjectReport.module.scss";

//^ component
import UnderLine from "../../../UI/underline/UnderLine";
import PrimaryCard from "../../../UI/Card/TeacherCard";
import SubjectCard from "./SubjectCard/SubjectCard";

//^ placeholders
import SmallEmptyFolder from "../../../UI/Icons/EmptyFolder/SmallEmptyFolder";

const SubjectReport = ({ themeMode, subjects }) => {
  return (
    <div
      className={`${styles["subject-report"]} ${themeMode && styles["dark"]}`}
    >
      <h2>Subject Wise Reports</h2>
      <UnderLine themeMode={themeMode} />
      {subjects.length !== 0 ? (
        <PrimaryCard className={styles["primary-card"]}>
          <h5>SUBJECTS</h5>
          <div className={styles["subjects"]}>
            {subjects.map((subject) => {
              return (
                <Fragment key={subject.join_subject_id}>
                  <SubjectCard
                    themMode={themeMode}
                    classroomImg={subject.classroom.classroom_profile_img}
                    classroomName={subject.classroom.classroom_name}
                    joinSubjectId={subject.join_subject_id}
                    subjectName={subject.subject.subject_name}
                    classroomId={subject.classroom.classroom_id}
                    subjectId={subject.subject.subject_id}
                  />
                </Fragment>
              );
            })}
          </div>
        </PrimaryCard>
      ) : (
        <div style={{ textAlign: "center" }}>
          <SmallEmptyFolder />
        </div>
      )}
    </div>
  );
};

export default SubjectReport;
