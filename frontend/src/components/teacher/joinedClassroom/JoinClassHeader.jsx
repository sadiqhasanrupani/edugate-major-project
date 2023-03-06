import React from "react";
import { useSelector } from "react-redux";

//* styles
import styles from "./JoinClassHeader.module.scss";

//* light icons
import Menu from "../../UI/Icons/More";

//* dark icons
import DarkMenu from "../../UI/Icons/Dark/DarkMenu";

//* utils
import shortenString from "../../../utils/string-shrinker";

const JoinClassHeader = ({ classroomName, classroomProfileImg }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  const shortenedString = classroomName
    ? shortenString(classroomName, 12)
    : "No name";

  return (
    <div
      className={`${styles["join-classroom-header"]} ${
        themeMode ? styles["dark"] : undefined
      }`}
    >
      <div className={styles["item-1"]}>
        {classroomProfileImg ? (
          <img src={classroomProfileImg} alt="classroom's profile" />
        ) : (
          <img src="" alt="" />
        )}
        <p>{shortenedString}</p>
      </div>
      <div>{themeMode ? <DarkMenu /> : <Menu />}</div>
    </div>
  );
};

export default JoinClassHeader;
