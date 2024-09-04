import React, { Fragment } from "react";

import styles from "./ClassroomCard.module.scss";

import SearchCard from "../SearchCard/SearchCard";

const ClassroomCard = ({ themeMode, classroomData }) => {
  return (
    <div
      className={`${styles["classroom-data"]} ${themeMode ? styles.dark : ""}`}
    >
      {classroomData.length > 0 &&
        classroomData.map((classroom) => (
          <Fragment key={classroom.classroom_id}>
            <SearchCard
              id={classroom.classroom_id}
              classroomName={classroom.classroom_name}
              itemName="Classroom"
              link={`/teacher/dashboard/classroom-report/${classroom.classroom_id}`}
              name={classroom.classroom_name}
              profileImg={classroom.classroom_profile_img}
              themeMode={themeMode}
            />
          </Fragment>
        ))}
    </div>
  );
};

export default ClassroomCard;
