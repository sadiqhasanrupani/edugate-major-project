import React from "react";
import { useSelector } from "react-redux";

//^ stylesheet
import styles from "../../../../scss/components/teacher/subject/subroot/assignment/subroot/AssignmentDates.module.scss";

//^ components

// hooks
import useFormattedData from "../../../../hooks/use-formatted-date-time";

const AssignmentDates = ({ startDate, endDate }) => {
  const { formattedDateTime: formattedStartDateTime } =
    useFormattedData(startDate);

  let formattedEndDateTime = "";

  const themeMode = useSelector((state) => state.ui.isDarkMode);

  if (!endDate) {
    return (
      <>
        <div
          className={`${styles["assignment-dates"]} ${
            themeMode && styles["dark"]
          }`}
        >
          <div className={styles["flex"]}>
            <h5>START TIME</h5>
            <p>{formattedStartDateTime}</p>
          </div>
          <div className={styles["flex"]}>
            <h5>END TIME</h5>
            <p>No Due</p>
          </div>
        </div>
      </>
    );
  }

  const { formattedDateTime } = useFormattedData(endDate);

  formattedEndDateTime = formattedDateTime;

  return (
    <>
      <div
        className={`${styles["assignment-dates"]} ${
          themeMode && styles["dark"]
        }`}
      >
        <div className={`${styles["flex"]} ${styles['left']}`}>
          <h5>START TIME</h5>
          <p>{formattedStartDateTime}</p>
        </div>
        <div className={`${styles["flex"]} ${styles['right']}`}>
          <h5>END TIME</h5>
          <p>{formattedEndDateTime}</p>
        </div>
      </div>
    </>
  );
};

export default AssignmentDates;
