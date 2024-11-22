import React from "react";

import styles from "./AssignmentHeader.module.scss";

import Menu from "../../../../../UI/Icons/More";
import DarkMenu from "../../../../../UI/Icons/Dark/DarkMenu";

import shortenString from "../../../../../../utils/string-shrinker";
import { Link } from "react-router-dom";

const AssignmentHeader = ({
  assignmentName,
  subjectName,
  themeMode,
  assignmentID,
}) => {
  const subjectShortName = shortenString(subjectName, 23);
  const assignmentShortName = shortenString(assignmentName, 16);

  return (
    <div
      className={`${styles["assignment-header"]} ${
        themeMode && styles["dark"]
      }`}
    >
      <div className={styles["assignment-header-title"]}>
        <p>
          <Link to={`assignment-report/${assignmentID}`}>
            {assignmentShortName}
          </Link>
        </p>
        <h5>{subjectShortName.toUpperCase()}</h5>
      </div>
      <div
        className={styles["assignment-header-menu"]}
        style={{ display: "none" }}
      >
        {themeMode ? <DarkMenu /> : <Menu />}
      </div>
    </div>
  );
};

export default AssignmentHeader;
