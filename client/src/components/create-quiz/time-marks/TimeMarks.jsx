import React, { useEffect } from "react";
import styles from "./TimeMarks.module.scss";
import useInput from "../../../hooks/user-input";

const TimeMarks = ({ themeMode, onTimeMarks }) => {
  const {
    enteredValue: timeEnteredValue,
    hasError: timeHasError,
    isValid: timeIsValid,
    onBlurHandler: timeBlurHandler,
    onChangeHandler: timeChangeHandler,
  } = useInput((value) => value.trim().length !== 0);

  const {
    enteredValue: totalMarksEnteredValue,
    hasError: totalMarksHasError,
    isValid: totalMarksIsValid,
    onBlurHandler: totalMarksBlurHandler,
    onChangeHandler: totalMarksChangeHandler,
  } = useInput((value) => value.trim().length !== 0);

  useEffect(() => {
    onTimeMarks(timeEnteredValue, totalMarksEnteredValue);
  }, [onTimeMarks, timeEnteredValue, totalMarksEnteredValue]);

  return (
    <div className={`${themeMode && styles["dark"]} ${styles["time-marks"]} `}>
      <div className={`${styles["time-div"]} ${timeHasError && styles["is-valid"]}`}>
        <div>
          <h5>Quiz should have a duration</h5>
        </div>
        <div className={styles["time"]}>
          <label>Time</label>
          <input
            maxLength={2}
            type="text"
            name="quiz-time"
            defaultValue={timeEnteredValue}
            onChange={timeChangeHandler}
            onBlur={timeBlurHandler}
          />
          <span>mins.</span>
        </div>
      </div>
      <div
        className={`${styles["total-marks-div"]} ${totalMarksHasError && styles["is-valid"]}`}
      >
        <div>
          <h5>Quiz should have total marks</h5>
        </div>
        <div className={`${styles["total-marks"]} `}>
          <label>Total Marks</label>
          <input
            maxLength={3}
            type="text"
            name="quiz-total-marks"
            defaultValue={totalMarksEnteredValue}
            onChange={totalMarksChangeHandler}
            onBlur={totalMarksBlurHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default TimeMarks;
