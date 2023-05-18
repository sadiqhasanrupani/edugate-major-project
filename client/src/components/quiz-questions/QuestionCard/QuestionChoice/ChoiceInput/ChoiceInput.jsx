import React from "react";

//^ stylesheet
import styles from "./ChoiceInput.module.scss";

const ChoiceInput = ({
  radioName,
  radioId,
  choiceName,
  nameId,
  placeholder,
  className,
}) => {
  return (
    <div className={styles["choice-input"]}>
      <input type="radio" name={radioName} id={radioId} />
      <input
        type="text"
        name={choiceName}
        id={nameId}
        placeholder={placeholder}
      />
    </div>
  );
};

export default ChoiceInput;
