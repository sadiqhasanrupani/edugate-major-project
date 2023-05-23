import React, { useEffect, useState } from "react";
import styles from "./TimeMarks.module.scss";
import useInput from "../../../hooks/user-input";

const TimeMarks = ({
  themeMode,
  onTimeMarks,
  quizDuration,
  quizTotalMarks,
}) => {
  //^ time state.

  const [timeEnteredValue, setTimeEnteredValue] = useState(
    quizDuration ? quizDuration.toString() : ""
  );
  const [isTouched, setIsTouched] = useState(false);

  const timeIsValid = timeEnteredValue.trim().length !== 0;
  const timeHasError = !timeIsValid && isTouched;

  const timeChangeHandler = (e) => {
    setTimeEnteredValue(e.target.value);
  };

  const timeBlurHandler = () => {
    setIsTouched(true);
  };

  //^ total marks state

  const [totalMarksEnteredValue, setTotalMarksEnteredValue] = useState(
    quizTotalMarks ? quizTotalMarks.toString() : ""
  );
  const [totalMarksIsTouched, setTotalMarksIsTouched] = useState(false);

  const totalMarksIsValid = timeEnteredValue.trim().length !== 0;
  const totalMarksHasError = !totalMarksIsValid && totalMarksIsTouched;

  const totalMarksChangeHandler = (e) => {
    setTotalMarksEnteredValue(e.target.value);
  };

  const totalMarksBlurHandler = () => {
    setTotalMarksIsTouched(true);
  };

  useEffect(() => {
    onTimeMarks(timeEnteredValue, totalMarksEnteredValue);
  }, [TimeMarks, timeEnteredValue, totalMarksEnteredValue]); // Empty dependencies array to run the effect only once on mount

  return (
    <div className={`${themeMode && styles["dark"]} ${styles["time-marks"]} `}>
      <div
        className={`${styles["time-div"]} ${
          timeHasError && styles["is-valid"]
        }`}
      >
        <div>
          <h5>Quiz should have a duration</h5>
        </div>
        <div className={styles["time"]}>
          <label>Time</label>
          <input
            maxLength={2}
            type="text"
            name="quiz-time"
            defaultValue={
              timeEnteredValue ? timeEnteredValue : quizDuration && quizDuration
            }
            onChange={timeChangeHandler}
            onBlur={timeBlurHandler}
          />
          <span>mins.</span>
        </div>
      </div>
      <div
        className={`${styles["total-marks-div"]} ${
          totalMarksHasError && styles["is-valid"]
        }`}
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
            defaultValue={
              totalMarksEnteredValue
                ? totalMarksEnteredValue
                : quizTotalMarks && quizTotalMarks
            }
            onChange={totalMarksChangeHandler}
            onBlur={totalMarksBlurHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default TimeMarks;
