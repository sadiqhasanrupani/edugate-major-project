// StudentQuizQuestion.jsx

import React from "react";
import styles from "./StudentQuizQuestion.module.scss";
import StudentQuestionCard from "./student-question-card/StudentQuestionCard";

const StudentQuizQuestion = ({
  themeMode,
  questionQuestions,
  questionTotalMarks,
  onSelectAnswer,
}) => {
  const quizQuestions = JSON.parse(questionQuestions);
  const everyQuestionMarks = questionTotalMarks / quizQuestions.length;

  return (
    <div
      className={`${styles["quiz-questions"]} ${themeMode && styles["dark"]}`}
    >
      <div className={styles["question-cards"]}>
        {Array.isArray(quizQuestions) &&
          quizQuestions.map((question, index) => {
            return (
              <StudentQuestionCard
                key={index}
                themeMode={themeMode}
                questionCount={index + 1}
                perQuestionMark={everyQuestionMarks.toFixed(1)}
                question={question.question.enteredValue}
                questionChoices={question.choices}
                index={index} // Pass the index of the question to StudentQuestionCard
                onSelectAnswer={onSelectAnswer} // Pass the onSelectAnswer function to StudentQuestionCard
              />
            );
          })}
      </div>
    </div>
  );
};

export default StudentQuizQuestion;
