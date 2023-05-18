import React from "react";

//^ styles
import styles from "./QuizQuestion.module.scss";

//^ component
import QuestionCard from "./QuestionCard/QuestionCard.jsx";

const QuizQuestion = ({ themMode, marks }) => {
  // console.log(marks);
  return (
    <div className={styles["quiz-question"]}>
      <QuestionCard themeMode={themMode} marks={marks} />
    </div>
  );
};

export default QuizQuestion;
