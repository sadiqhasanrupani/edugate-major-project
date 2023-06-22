import React from "react";
import { Link } from "react-router-dom";

//* styles
import styles from "./SubjectHeader.module.scss";

//* icons
import Menu from "../../components/UI/Icons/More";
import DarkMenu from "../UI/Icons/Dark/DarkMenu";

//* utils
import shortenString from "../../utils/string-shrinker";

const SubjectHeader = ({ subjectName, themeMode, redirectURL, menu }) => {
  const shortenedStr = subjectName ? shortenString(subjectName, 15) : "No name";

  return (
    <div className={styles["subject-header"]}>
      <div>
        <p className={styles["subject-para"]}>
          <Link to={redirectURL}>{shortenedStr}</Link>
        </p>
      </div>
      {menu && <div>{themeMode ? <DarkMenu /> : <Menu />}</div>}
    </div>
  );
};

export default SubjectHeader;
