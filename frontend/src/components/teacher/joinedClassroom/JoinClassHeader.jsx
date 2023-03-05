import React from "react";
import { useSelector } from "react-redux";

//* styles
import styles from "./JoinClassHeader.module.scss";

//* light icons
import Menu from "../../UI/Icons/More";

//* dark icons
import DarkMenu from "../../UI/Icons/Dark/DarkMenu";

const JoinClassHeader = ({ classroomName, classroomProfileImg }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  return (
    <div className={styles["join-classroom-header"]}>
      <div className={styles["item-1"]}>
        {classroomProfileImg ? (
          <img src={classroomProfileImg} alt="classroom's profile" />
        ) : (
          <img src="" alt="" />
        )}
        <h4>{classroomName}</h4>
      </div>
      <div>{themeMode ? <DarkMenu /> : <Menu />}</div>
    </div>
  );
};

export default JoinClassHeader;
