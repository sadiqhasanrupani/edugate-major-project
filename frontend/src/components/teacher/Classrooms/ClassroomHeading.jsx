import React from "react";

import styles from "./ClassroomHeading.module.scss";

// placeholder img
import profileImg from "../../../assets/Images/user-profile.png";

// icons
import MoreIcon from "../../UI/Icons/More";

const ClassroomHeading = ({ classProfileImg, classroomName }) => {
  return (
    <div className={styles["classroom-header"]}>
      <div className={styles["classroom-title"]}>
        {classProfileImg ? (
          <img src={classProfileImg} alt="classroom-profile" />
        ) : (
          <img src={profileImg} alt="classroom-profile-placeholder" />
        )}
        {classroomName ? <p>{classroomName}</p> : <p>No Name</p>}
      </div>
      <div>
        <MoreIcon />
      </div>
    </div>
  );
};

export default ClassroomHeading;
