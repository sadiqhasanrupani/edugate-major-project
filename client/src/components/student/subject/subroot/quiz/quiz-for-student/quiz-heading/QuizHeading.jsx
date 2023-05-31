import React from "react";
import CountDown from "../../../../../../CountDown/CountDown";

import styles from "./QuizHeading.module.scss";

const QuizHeading = ({
  quizTitle,
  quizDuration,
  quizTotalMarks,
  themeMode,
  submitInCompleteQuiz,
}) => {
  return (
    <div className={`${styles["quiz-heading"]} ${themeMode && styles.dark}`}>
      <div className={styles["quiz-title"]}>
        <h1>{quizTitle}</h1>
      </div>
      <div className={styles["total-marks-duration"]}>
        <div className={styles["duration"]}>
          <p>
            <span>Time: </span>
            <span className={styles["count-down"]}>
              <CountDown
                quizName={quizTitle}
                duration={quizDuration}
                submitInCompleteQuiz={submitInCompleteQuiz}
              />
            </span>
          </p>
        </div>
        <div className={styles["total-marks"]}>
          <p>
            Total marks:{" "}
            <span>
              {quizTotalMarks}{" "}
              {quizTotalMarks <= 0 || quizTotalMarks === 1 ? "mark" : "marks"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizHeading;
