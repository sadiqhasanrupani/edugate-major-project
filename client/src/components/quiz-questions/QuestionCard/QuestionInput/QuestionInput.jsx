import React, { useState } from "react";
import styles from "./QuestionInput.module.scss";

const QuestionInput = ({ themeMode, onUpdateQuestionInput, question }) => {
  const [enteredValue, setEnteredValue] = useState(
    question ? question.toString() : ""
  );
  const [isTouched, setIsTouched] = useState(false);

  const enteredValidValue = enteredValue.trim().length !== 0;
  const hasError = !enteredValidValue && isTouched;

  const onChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const onBlurHandler = () => {
    setIsTouched(true);

    //^ also updating the data and sending on onUpdateQuestionInput callback to update the question data

    const data = {
      enteredValidValue,
      enteredValue,
    };
    onUpdateQuestionInput(data);
  };

  return (
    <div
      className={`${styles["question-input"]} ${
        hasError && styles["is-valid"]
      } ${themeMode && styles.dark}`}
    >
      <input
        type="text"
        placeholder={`${
          hasError ? "Do not leave the question empty" : "Enter the question"
        }`}
        value={enteredValue}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />
    </div>
  );
};

export default QuestionInput;
