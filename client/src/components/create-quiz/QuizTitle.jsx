import React, { useEffect, useState, useCallback } from "react";
import styles from "./QuizTitle.module.scss";
import RectangleInput from "../UI/Input/RectangleInput";
import UnderLine from "../UI/underline/UnderLine";
import TimeMarks from "./time-marks/TimeMarks";
import useInput from "../../hooks/user-input";

const QuizTitle = ({ themeMode, onQuizTitle }) => {
  const [timeMarks, setTimeMarks] = useState({});

  const {
    enteredValue: quizTitleEnteredValue,
    hasError: quizTitleHasError,
    isValid: quizTitleIsValid,
    onBlurHandler: quizOnBlurHandler,
    onChangeHandler: quizOnChangeHandler,
  } = useInput((value) => value.trim().length >= 6);

  const getTimeMarksHandler = useCallback((time, marks) => {
    setTimeMarks({ time, marks });
  }, []);

  const onQuizTitleHandler = useCallback(
    ({ quizTitleEnteredValue, timeMarks }) => {
      onQuizTitle({ quizTitleEnteredValue, timeMarks });
    },
    [onQuizTitle]
  );

  useEffect(() => {
    const { time, marks } = timeMarks;
    const onTimeMarks = { time, marks };

    onQuizTitleHandler({ quizTitleEnteredValue, timeMarks: onTimeMarks });
  }, [onQuizTitleHandler, quizTitleEnteredValue, timeMarks]);

  return (
    <div className={`${styles["quiz-title"]} ${themeMode && styles["dark"]}`}>
      <div className={styles["title"]}>
        <RectangleInput
          errorMessage={`The title should have at least 6 characters.`}
          placeholder={`Enter The Quiz Title`}
          themeMode={themeMode}
          type={"text"}
          name={"quiz-title"}
          defaultValue={quizTitleEnteredValue && quizTitleEnteredValue}
          onChange={quizOnChangeHandler}
          onBlur={quizOnBlurHandler}
          hasError={quizTitleHasError}
        />
        <TimeMarks themeMode={themeMode} onTimeMarks={getTimeMarksHandler} />
      </div>
      <UnderLine className={styles["underline"]} />
    </div>
  );
};

export default QuizTitle;
