import React from "react";

import styles from "./ClassroomHeading.module.scss";

// placeholder img
import profileImg from "../../../assets/Images/user-profile.png";

//* light icons
import MoreIcon from "../../UI/Icons/More";

//* dark icons
import DarkMoreIcon from "../../UI/Icons/Dark/DarkMenu";

//* utils
import shortenString from "../../../utils/string-shrinker";

const ClassroomHeading = ({ classProfileImg, classroomName, themeMode }) => {
  const shortenedStr = classroomName
    ? shortenString(classroomName, 12)
    : "No name";

  return (
    <div className={styles["classroom-header"]}>
      <div className={styles["classroom-title"]}>
        {classProfileImg ? (
          <img src={classProfileImg} alt="classroom-profile" />
        ) : (
          <img src={profileImg} alt="classroom-profile-placeholder" />
        )}
        <div className={styles["shortened-string"]}>
          <p>{shortenedStr}</p>
        </div>
      </div>
      {/* <div>{themeMode ? <DarkMoreIcon /> : <MoreIcon />}</div> */}
    </div>
  );
};

export default ClassroomHeading;
