import React, { useCallback } from "react";
import ChoiceInput from "./ChoiceInput/ChoiceInput";

import styles from "./QuestionChoice.module.scss";

const QuestionChoice = ({
  choices,
  selectedChoice,
  onQuestionChoice,
  question,
  themeMode,
}) => {
  const getUpdatedChoiceHandler = useCallback(
    (index, choiceData) => {
      const data = {
        choices: [...choices],
        selectedChoice: selectedChoice,
      };
      data.choices[index] = choiceData.choice;
      data.selectedChoice = choiceData.selectedChoice;
      onQuestionChoice(data);
    },
    [choices, selectedChoice, onQuestionChoice]
  );

  return (
    <div
      className={`${styles["question-choice"]} ${themeMode && styles["dark"]}`}
    >
      {choices.map((choice, index) => (
        <ChoiceInput
          themeMode={themeMode}
          key={index}
          index={index}
          choice={choice}
          selectedChoice={selectedChoice}
          onUpdateChoiceQuestionInput={getUpdatedChoiceHandler}
          name={question}
        />
      ))}
    </div>
  );
};

export default QuestionChoice;
