import React, { useEffect } from "react";

//^ stylesheet
import styles from "./FeedBack.module.scss";

//^ hooks
import useInput from "../../../../../../../hooks/user-input";

const FeedBack = ({ feedBack, themeMode, studentName, onFeedBack }) => {
  const {
    enteredValue: feedbackEnteredValue,
    hasError: feedbackHasError,
    isValid: feedbackIsValid,
    onBlurHandler: feedbackOnBlurHandler,
    onChangeHandler: feedbackOnChangeHandler,
  } = useInput((value) => value.length >= 10);

  useEffect(() => {
    onFeedBack(feedbackIsValid);
  }, [feedbackIsValid, onFeedBack]);

  return (
    <div className={`${styles["feedback"]} ${themeMode && styles["dark"]}`}>
      <label htmlFor={"feedback"}>YOUR FEEDBACK</label>
      <div className={feedbackHasError ? styles["is-valid"] : undefined}>
        <textarea
          defaultValue={feedbackEnteredValue ? feedbackEnteredValue : feedBack}
          id="feedback"
          className={styles["feedback-input"]}
          name="feedback"
          onChange={feedbackOnChangeHandler}
          onBlur={feedbackOnBlurHandler}
          placeholder={`Enter a feedback for ${studentName}`}
        />
        <h6>Enter at least 10 or more than 15 characters</h6>
      </div>
    </div>
  );
};

export default FeedBack;
