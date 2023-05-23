import React, { useState } from "react";

import styles from "./ChoiceInput.module.scss";

const ChoiceInput = ({
  index,
  choice,
  selectedChoice,
  onUpdateChoiceQuestionInput,
  name,
  themeMode,
}) => {
  const [enteredValue, setEnteredValue] = useState(choice);
  const [isTouched, setIsTouched] = useState(false);

  const enteredValidValue = enteredValue.trim().length !== 0;
  const hasError = !enteredValidValue && isTouched;

  const onChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const onBlurHandler = () => {
    setIsTouched(true);

    const data = {
      choice: enteredValue,
      selectedChoice: selectedChoice === index ? enteredValue : selectedChoice,
    };
    onUpdateChoiceQuestionInput(index, data);
  };

  return (
    <div
      className={`${styles["choice-input"]} ${hasError && styles["is-valid"]} ${
        themeMode && styles["dark"]
      }`}
    >
      <input
        type="radio"
        name={name}
        checked={selectedChoice === index}
        onChange={() => {
          setEnteredValue(choice);
          setIsTouched(false);
          onUpdateChoiceQuestionInput(index, {
            choice,
            selectedChoice: index,
          });
        }}
      />
      <input
        type="text"
        name="choice"
        placeholder={`Choice ${index + 1}`}
        value={enteredValue}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />
    </div>
  );
};

export default ChoiceInput;
