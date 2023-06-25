import React, { Fragment } from "react";

import styles from "./SubjectCard.module.scss";

import SearchCard from "../SearchCard/SearchCard";

const SubjectCard = ({ themeMode, subjectData }) => {
  return (
    <div className={`${styles["subject-card"]} ${themeMode && styles.dark}`}>
      {subjectData.length > 0 &&
        subjectData.map((subject) => {
          return (
            <Fragment key={subject.join_subject_id}>
              <SearchCard
                classroomName={subject.classroom.classroom_name}
                itemName={"Subject"}
                link={`/teacher/dashboard/subject-report/${subject.join_subject_id}`}
                name={subject.subject.subject_name}
                profileImg={subject.classroom.classroom_profile_img}
                themeMode={themeMode}
              />
            </Fragment>
          );
        })}
    </div>
  );
};

export default SubjectCard;
