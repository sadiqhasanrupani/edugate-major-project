import React from "react";
import { useSelector } from "react-redux";

import styles from "./AssignmentMarks.module.scss";

const AssignmentMarks = ({ totalMarks }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  return (
    <div
      className={`${styles["assignment-totalMarks"]} ${
        themeMode && styles["dark"]
      }`}
    >
      <h5>MAX MARKS</h5>
      <p>{totalMarks}</p>
    </div>
  );
};

export default AssignmentMarks;
