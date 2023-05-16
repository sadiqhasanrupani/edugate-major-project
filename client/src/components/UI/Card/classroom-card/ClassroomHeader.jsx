import React from "react";
import { Link } from "react-router-dom";

import styles from "./ClassroomHeader.module.scss";

//^ icons
import Menu from "../../Icons/More";

//^ dark icons
import DarkMenu from "../../Icons/Dark/DarkMenu";

//^ shrinker
import shortenString from "../../../../utils/string-shrinker";

const ClassroomHeader = ({
  classImg,
  classroomName,
  themeMode,
  classroomId,
}) => {
  const shortClassName = shortenString(classroomName, 14);

  return (
    <div className={`${styles["header"]} ${themeMode && styles[`dark`]}`}>
      <div className={`${styles["class-info"]}`}>
        <img src={classImg} alt={`classroom-profile-img`} />
        <p>
          <Link to={`classroom-report/${classroomId}`}>{shortClassName}</Link>
        </p>
      </div>
      <div className={styles["menu"]}>
        {themeMode ? <DarkMenu /> : <Menu />}
      </div>
    </div>
  );
};

export default ClassroomHeader;
