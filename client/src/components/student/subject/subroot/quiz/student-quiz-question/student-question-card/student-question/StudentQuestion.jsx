import React, { useState } from "react";

import styles from "./StudentQuestion.module.scss";

//^ component
import ChoiceRadioInput from "./choice-radio-input/ChoiceRadioInput"

const StudentQuestion = ({ themeMode, question, questionChoices, index, onSelectAnswer }) => {
  const [selectedChoice, setSelectedChoice] = useState("");

  const handleChoiceSelection = (choice) => {
    setSelectedChoice(choice);
    onSelectAnswer(index, choice);
  };

  return (
    <div className={`${styles["student-question"]} ${themeMode && styles["dark"]}`}>
      <h4>{question}</h4>
      <div className={styles["question-choices"]}>
        {questionChoices.map((choice) => (
          <ChoiceRadioInput
            key={choice}
            themeMode={themeMode}
            choice={choice}
            isSelected={selectedChoice === choice}
            onSelect={handleChoiceSelection}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentQuestion;
