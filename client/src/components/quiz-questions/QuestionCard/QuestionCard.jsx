import React from "react";

//^ styles
import styles from "./QuestionCard.module.scss";

//^ component
import SecondaryCard from "../../UI/Card/CardSecondary";
import QuestionInput from "./QuestionInput/QuestionInput";
import QuestionChoice from "./QuestionChoice/QuestionChoice.jsx"

const QuestionCard = ({ marks, themeMode }) => {
  return (
    <SecondaryCard className={styles["secondary-card"]}>
      <div className={styles["question-title"]}>
        <p>Question</p>
        <p>
          Marks: <b>{marks ? marks : 0}</b>
        </p>
      </div>

      <QuestionInput themeMode={themeMode} />
      <QuestionChoice />
    </SecondaryCard>
  );
};

export default QuestionCard;
