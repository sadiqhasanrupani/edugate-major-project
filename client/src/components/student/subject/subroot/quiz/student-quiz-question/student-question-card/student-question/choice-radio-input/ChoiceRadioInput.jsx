import React from "react";

import styles from "./ChoiceRadioInput.module.scss";

const ChoiceRadioInput = ({ themeMode, choice, isSelected, onSelect }) => {
  const handleInputChange = () => {
    onSelect(choice);
  };

  return (
    <div
      className={`${styles["choice-radio-input"]} ${themeMode && styles.dark} ${
        isSelected && styles.selected
      }`}
    >
      <input
        type="radio"
        value={choice}
        checked={isSelected}
        onChange={handleInputChange}
      />
      <div className={styles["choice-content"]}>
        <p>{choice}</p>
      </div>
    </div>
  );
};

export default ChoiceRadioInput;
