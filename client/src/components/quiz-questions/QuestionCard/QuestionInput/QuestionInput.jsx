import React from "react";
import styles from "./QuestionInput.module.scss";
import useInput from "../../../../hooks/user-input";
import { isEmpty } from "../../../../utils/validation";

const QuestionInput = ({ themeMode, onUpdateQuestionInput }) => {
  const {
    enteredValue: questionEnteredValue,
    hasError: questionHasError,
    isValid: questionIsValid,
    onBlurHandler: questionBlurHandler,
    onChangeHandler: questionChangeHandler,
  } = useInput(isEmpty);

  const updateQuestionData = () => {
    const data = {
      questionIsValid,
      questionEnteredValue,
    };
    onUpdateQuestionInput(data);
  };

  return (
    <div
      className={`${styles["question-input"]} ${
        questionHasError && styles["is-valid"]
      } ${themeMode && styles.dark}`}
    >
      <input
        type="text"
        placeholder={`${questionHasError ? "Do not leave the question empty" : "Enter the question"}`}
        defaultValue={questionEnteredValue}
        onChange={questionChangeHandler}
        onBlur={updateQuestionData}
      />
    </div>
  );
};

export default QuestionInput;
