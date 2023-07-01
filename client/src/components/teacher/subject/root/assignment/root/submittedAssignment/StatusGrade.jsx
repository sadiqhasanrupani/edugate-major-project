import React, { useEffect } from "react";

//^ stylesheet
import styles from "./StatusGrade.module.scss";

//^ hooks
import useInput from "../../../../../../../hooks/user-input";

const StatusGrade = ({
  submissionStatus,
  grade,
  totalMarks,
  themeMode,
  onStatusGrade,
}) => {
  const {
    enteredValue: gradeEnteredValue,
    hasError: gradeHasError,
    isValid: gradeIsValid,
    onBlurHandler: gradeOnBlurHandler,
    onChangeHandler: gradeOnChangeHandler,
  } = useInput((value) => value <= totalMarks && value.trim().length > 0);

  console.log(gradeIsValid)

  useEffect(() => {
    onStatusGrade(gradeIsValid);
  }, [gradeIsValid, onStatusGrade]);

  return (
    <div className={`${styles["status-grade"]} ${themeMode && styles["dark"]}`}>
      <div className={styles["flex-1"]}>
        <h5>STATUS</h5>
        <p>{submissionStatus}</p>
      </div>
      <div
        className={`${styles["flex-2"]} ${gradeHasError && styles["is-valid"]}`}
      >
        <h5>GRADE</h5>
        <div>
          <input
            type="text"
            className={styles["grade-input"]}
            defaultValue={gradeEnteredValue ? gradeEnteredValue : grade}
            onChange={gradeOnChangeHandler}
            onBlur={gradeOnBlurHandler}
            name="grade"
            placeholder="0"
          />
          /<p>{totalMarks}</p>
        </div>
        <h6>Grade should not be grater than {totalMarks}</h6>
      </div>
    </div>
  );
};

export default StatusGrade;
