import React from "react";

//^ stylesheet
import styles from "./QuestionInput.module.scss";

//^ hook
import useInput from "../../../../hooks/user-input";

//^ utils
import { isEmpty } from "../../../../utils/validation";

const QuestionInput = ({ themeMode }) => {
  const {
    enteredValue: questionEnteredValue,
    hasError: questionHasError,
    isValid: questionIsValid,
    onBlurHandler: questionBlurHandler,
    onChangeHandler: questionChangeHandler,
  } = useInput(isEmpty);

  return (
    <div
      className={`${styles["question-input"]} ${
        questionHasError && styles["is-valid"]
      } ${themeMode && styles.dark}`}
    >
      <input
        type="text"
        placeholder={`${
          questionHasError
            ? "Do not live the Question empty"
            : "Enter the Question"
        }`}
        defaultValue={questionEnteredValue}
        onChange={questionChangeHandler}
        onBlur={questionBlurHandler}
      />
    </div>
  );
};

export default QuestionInput;
