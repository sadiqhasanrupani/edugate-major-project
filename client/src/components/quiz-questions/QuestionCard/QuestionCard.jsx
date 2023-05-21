import React, { useCallback } from "react";

import styles from "./QuestionCard.module.scss";

import SecondaryCard from "../../UI/Card/CardSecondary";
import QuestionInput from "./QuestionInput/QuestionInput";
import QuestionChoice from "./QuestionChoice/QuestionChoice";

const QuestionCard = ({
  marks,
  themeMode,
  onUpdateQuestionData,
  onDeleteQuestion,
}) => {
  const updateQuestionInputData = useCallback(
    (data) => {
      onUpdateQuestionData(data);
    },
    [onUpdateQuestionData]
  );

  return (
    <SecondaryCard className={styles["secondary-card"]}>
      <div className={styles["question-title"]}>
        <p>Question</p>
        <p>
          Marks: <b>{marks ? marks : 0}</b>
        </p>
      </div>

      <QuestionInput
        themeMode={themeMode}
        onUpdateQuestionInput={updateQuestionInputData}
      />
      <QuestionChoice />

      <button onClick={onDeleteQuestion}>Delete</button>
    </SecondaryCard>
  );
};

export default QuestionCard;
