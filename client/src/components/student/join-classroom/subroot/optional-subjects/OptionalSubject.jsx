import React, { Fragment } from "react";
import { useSelector } from "react-redux";

//^ stylesheet
import styles from "./OptionalSubject.module.scss";

//^ components
import PrimaryCard from "../../../../UI/Card/TeacherCard";
import SubjectCard from "../../../../subject/SubjectCard";

const OptionalSubject = ({ optionalSubjects }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);
  return (
    <>
      <PrimaryCard
        className={`${styles["primary-card"]} ${themeMode && styles["dark"]}`}
      >
        <h3>Optional subjects</h3>

        <div className={styles["optional-subject-div"]}>
          {optionalSubjects.map((subject) => {
            return (
              <Fragment key={subject.subject.subject_id}>
                <SubjectCard
                  redirectURL={`/student/subject/${subject.join_subject_id}/assignment`}
                  subjectId={subject.subject.subject_id}
                  subjectName={subject.subject.subject_name}
                />
              </Fragment>
            );
          })}
        </div>
      </PrimaryCard>
    </>
  );
};

export default OptionalSubject;
