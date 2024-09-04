import React from "react";

//^ styles
import styles from "./StudentQuestionCard.module.scss";

//^ component
import SecondaryCard from "../../../../../../UI/Card/CardSecondary";
import StudentQuestion from "./student-question/StudentQuestion";

const StudentQuestionCard = ({
  themeMode,
  questionCount,
  perQuestionMark,
  questionChoices,
  question,
  index,
  onSelectAnswer,
}) => {
  return (
    <div
      className={`${styles["student-question-card"]} ${
        themeMode && styles.dark
      }`}
    >
      <SecondaryCard propsThemeMode={themeMode} className={styles["secondary-card"]}>
        <div className={styles["question-title"]}>
          <p>Question {questionCount}</p>
          <p>
            Per Question: {perQuestionMark}{" "}
            {perQuestionMark === 1 || perQuestionMark <= 0 ? "mark" : "marks"}
          </p>
        </div>
        <div className={styles["question-content"]}>
          <StudentQuestion
            themeMode={themeMode}
            question={question}
            questionChoices={questionChoices}
            index={index}
            onSelectAnswer={onSelectAnswer}
          />
        </div>
      </SecondaryCard>
    </div>
  );
};

export default StudentQuestionCard;
