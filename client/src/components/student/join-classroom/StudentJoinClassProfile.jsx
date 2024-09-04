import React, { useState } from "react";
import { useSelector } from "react-redux";

//* stylesheet
import styles from "../../../scss/components/student/join-classroom/StudentJoinClassProfile.module.scss";

const StudentJoinClassProfile = ({ bannerImg, profileImg, classroomName }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  return (
    <article
      className={`${styles["article"]} ${
        themeMode ? styles["dark"] : undefined
      }`}
    >
      <div className={styles["flex"]}>
        <div className={styles["classroom-images"]}>
          {bannerImg ? (
            <img src={bannerImg} alt="classroom-banner" />
          ) : undefined}

          {profileImg ? (
            <img src={profileImg} alt="classroom-profile" />
          ) : undefined}
        </div>
        <div className={styles["classroom-name"]}>
          <p>{classroomName}</p>
        </div>
      </div>
    </article>
  );
};

export default StudentJoinClassProfile;
