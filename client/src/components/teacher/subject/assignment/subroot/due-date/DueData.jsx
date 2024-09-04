import React from "react";
import { useSelector } from "react-redux";

import styles from "./DueDate.module.scss";

//^ components
import GreenDot from "../../../../../UI/Icons/assignment/GreenDotIcon";
import RedDot from "../../../../../UI/Icons/assignment/RedDotIcon";

const DueData = ({ date, className, dueDate }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ today's date
  const todaysDate = new Date();
  return (
    <>
      <div
        className={`${styles["due-date"]} ${className} ${
          themeMode && styles["dark"]
        }`}
      >
        {dueDate ? (
          todaysDate > new Date(dueDate) ? (
            <RedDot />
          ) : (
            <GreenDot />
          )
        ) : (
          ""
        )}
        {dueDate ? date : "No Due"}
      </div>
    </>
  );
};

export default DueData;
