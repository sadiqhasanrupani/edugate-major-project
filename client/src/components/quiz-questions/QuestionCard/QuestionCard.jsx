import React, { useCallback } from "react";
import QuestionInput from "./QuestionInput/QuestionInput";
import QuestionChoice from "./QuestionChoice/QuestionChoice";
import SecondaryCard from "../../UI/Card/CardSecondary";
import DeleteBtn from "../../UI/Buttons/DeleteBtn/DeleteBtn";

import styles from "./QuestionCard.module.scss";

const QuestionCard = ({
  marks,
  themeMode,
  question,
  onUpdateQuestionData,
  onUpdateChoiceInputData,
  onDeleteQuestion,
}) => {
  const updateQuestionInputData = useCallback(
    (data) => {
      const updatedQuestion = { ...question };
      updatedQuestion.question = {
        ...updatedQuestion.question,
        enteredValue: data.enteredValue,
        enteredValidValue: data.enteredValidValue,
      };
      onUpdateQuestionData(updatedQuestion);
    },
    [onUpdateQuestionData, question]
  );

  const getQuestionChoiceData = useCallback(
    (data) => {
      const updatedQuestion = { ...question };
      updatedQuestion.choices = data.choices;
      updatedQuestion.selectedChoice = data.selectedChoice;
      onUpdateChoiceInputData(updatedQuestion);
    },
    [onUpdateChoiceInputData, question]
  );

  return (
    <SecondaryCard
      className={`${styles["secondary-card"]} ${themeMode && styles["dark"]}`}
    >
      <div className={styles["question-title"]}>
        <p>Question</p>
        <p>
          Marks: <b>{marks ? marks : 0}</b>
        </p>
      </div>
      <QuestionInput
        themeMode={themeMode}
        question={
          question.question.enteredValue
            ? question.question.enteredValue
            : question.question
        }
        onUpdateQuestionInput={updateQuestionInputData}
      />
      <QuestionChoice
        themeMode={themeMode}
        choices={question.choices}
        selectedChoice={question.selectedChoice}
        onQuestionChoice={getQuestionChoiceData}
      />
      <div className={styles["delete-btn"]}>
        <DeleteBtn onClick={onDeleteQuestion}>Delete</DeleteBtn>
      </div>
    </SecondaryCard>
  );
};

export default QuestionCard;
