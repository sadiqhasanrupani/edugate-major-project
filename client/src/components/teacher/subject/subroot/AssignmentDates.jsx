import React from "react";
import { useSelector } from "react-redux";

//^ Stylesheet
import styles from "../../../../scss/components/teacher/subject/subroot/assignment/subroot/AssignmentDates.module.scss";

//^ Custom Hook
import useFormattedData from "../../../../hooks/use-formatted-date-time";

const AssignmentDates = ({ startDate, endDate }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);
  const { formattedDateTime: formattedStartDateTime, formattedDateTime: formattedEndDateTime } = useFormattedData(startDate, endDate);

  if (!endDate) {
    return (
      <div className={`${styles["assignment-dates"]} ${themeMode && styles["dark"]}`}>
        <div className={styles["flex"]}>
          <h5>START TIME</h5>
          <p>{formattedStartDateTime}</p>
        </div>
        <div className={styles["flex"]}>
          <h5>END TIME</h5>
          <p>No Due</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles["assignment-dates"]} ${themeMode && styles["dark"]}`}>
      <div className={`${styles["flex"]} ${styles['left']}`}>
        <h5>START TIME</h5>
        <p>{formattedStartDateTime}</p>
      </div>
      <div className={`${styles["flex"]} ${styles['right']}`}>
        <h5>END TIME</h5>
        <p>{formattedEndDateTime}</p>
      </div>
    </div>
  );
};

export default AssignmentDates;
