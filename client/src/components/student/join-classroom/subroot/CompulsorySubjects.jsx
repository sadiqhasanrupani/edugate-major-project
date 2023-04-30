//^ dependencies
import React, { Fragment } from "react";
import { useSelector } from "react-redux";

//^ stylesheet
import styles from "../../../../scss/components/student/join-classroom/subroot/CompulsorySubjects.module.scss";

//^ components
import PrimaryCard from "../../../UI/Card/TeacherCard";
import SubjectCard from "../../../subject/SubjectCard";

const CompulsorySubjects = ({ compulsorySubjects }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  return (
    <div
      className={`${styles["compulsory-subject-div"]} ${
        themeMode && styles["dark"]
      }`}
    >
      <PrimaryCard className={styles["primary-card"]}>
        <h3>Compulsory subjects</h3>

        <div className={styles["compulsory-subject-div"]}>
          {compulsorySubjects.map((compulsorySubject) => {
            return (
              <Fragment key={compulsorySubject.join_subject_id}>
                <SubjectCard
                  redirectURL={`/student/subject/${compulsorySubject.join_subject_id}/assignment`}
                  subjectId={compulsorySubject.subject.subject_id}
                  subjectName={compulsorySubject.subject.subject_name}
                />
              </Fragment>
            );
          })}
        </div>
      </PrimaryCard>
    </div>
  );
};

export default CompulsorySubjects;
