import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "../../../scss/components/student/subroot/StudentJoinClassroomHeader.module.scss";

//^ icons
import MenuIcon from "../../UI/Icons/More";
import DarkMenu from "../../UI/Icons/Dark/DarkMenu";

//^ helper func
import shortenString from "../../../utils/string-shrinker";

const StudentJoinClassroomHeader = ({
  classroomImg,
  classroomName,
  joinClassroomId,
}) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  const shortenedStr = classroomName
    ? shortenString(classroomName, 12)
    : "No name";

  return (
    <>
      <header className={styles["header"]}>
        <Link to={`/student/join-classroom/${joinClassroomId}/dashboard`}>
          <div className={styles["classroom-div"]}>
            <img src={classroomImg} alt="classroom-profile-img" />
            <p>{shortenedStr}</p>
          </div>
        </Link>
        <div className={styles["menu-div"]}>
          {themeMode ? <DarkMenu /> : <MenuIcon />}
        </div>
      </header>
    </>
  );
};

export default StudentJoinClassroomHeader;
