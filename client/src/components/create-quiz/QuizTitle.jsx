import React, { useEffect, useState, useCallback } from "react";
import styles from "./QuizTitle.module.scss";
import RectangleInput from "../UI/Input/RectangleInput";
import UnderLine from "../UI/underline/UnderLine";
import TimeMarks from "./time-marks/TimeMarks";
import useInput from "../../hooks/user-input";

const QuizTitle = ({
  themeMode,
  onQuizTitle,
  quizTitle,
  quizDuration,
  totalMarks,
}) => {
  const [timeMarks, setTimeMarks] = useState({});

  const {
    enteredValue: quizTitleEnteredValue,
    hasError: quizTitleHasError,
    isValid: quizTitleIsValid,
    onBlurHandler: quizOnBlurHandler,
    onChangeHandler: quizOnChangeHandler,
  } = useInput((value) => value.trim().length >= 6);

  const getTimeMarksHandler = useCallback(
    (time, marks) => {
      setTimeMarks({ time, marks });
    },
    [setTimeMarks]
  );

  useEffect(() => {
    const { time, marks } = timeMarks;
    const onTimeMarks = { time, marks };

    onQuizTitle({ quizTitleEnteredValue, timeMarks: onTimeMarks });
  }, [onQuizTitle, quizTitleEnteredValue, timeMarks]);

  return (
    <div className={`${styles["quiz-title"]} ${themeMode && styles["dark"]}`}>
      <div className={styles["title"]}>
        <RectangleInput
          errorMessage={`The title should have at least 6 characters.`}
          placeholder={`Enter The Quiz Title`}
          themeMode={themeMode}
          type={"text"}
          name={"quiz-title"}
          defaultValue={
            quizTitleEnteredValue
              ? quizTitleEnteredValue
              : quizTitle && quizTitle
          }
          onChange={quizOnChangeHandler}
          onBlur={quizOnBlurHandler}
          hasError={quizTitleHasError}
        />
        <TimeMarks
          quizDuration={quizDuration}
          quizTotalMarks={totalMarks}
          themeMode={themeMode}
          onTimeMarks={getTimeMarksHandler}
        />
      </div>
      <UnderLine themeMode={themeMode} className={styles["underline"]} />
    </div>
  );
};

export default QuizTitle;
