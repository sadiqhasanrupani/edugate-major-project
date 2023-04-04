import React from "react";

//* styles
import styles from "./SubjectHeader.module.scss";

//* icons
import Menu from "../../components/UI/Icons/More";
import DarkMenu from "../UI/Icons/Dark/DarkMenu";

const SubjectHeader = ({ subjectName, themeMode }) => {
  return (
    <div className={styles["subject-header"]}>
      <div>
        <p>{subjectName}</p>
      </div>
      <div>{themeMode ? <DarkMenu /> : <Menu />}</div>
    </div>
  );
};

export default SubjectHeader;
