import React from "react";

//^ stylesheet
import styles from "./QuestionChoice.module.scss";

//^ component
import ChoiceInput from "./ChoiceInput/ChoiceInput";

const QuestionChoice = () => {
  return (
    <div className={styles["question-choice"]}>
      <ChoiceInput radioName={"choice"} placeholder={"Choice 1"} />
      <ChoiceInput radioName={"choice"} placeholder={"Choice 2"} />
      <ChoiceInput radioName={"choice"} placeholder={"Choice 3"} />
      <ChoiceInput radioName={"choice"} placeholder={"Choice 4"} />
    </div>
  );
};

export default QuestionChoice;
