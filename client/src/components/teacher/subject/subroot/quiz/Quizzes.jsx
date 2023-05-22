import React, { Fragment } from "react";

//^ styles
import styles from "./Quizzes.module.scss";

//^ component
import PrimaryCard from "../../../../UI/Card/TeacherCard";
import Quiz from "./Quiz/Quiz";

const Quizzes = ({ themeMode, quizzesData }) => {
  return (
    <div className={`${styles["quizzes"]} ${themeMode && styles["dark"]}`}>
      <PrimaryCard className={styles["primary-card"]}>
        <h4>QUIZ</h4>
        <div className={styles["quizzes-data"]}>
          {quizzesData.map((quiz) => {
            return (
              <Fragment key={quiz.quiz_id}>
                <Quiz
                  themeMode={themeMode}
                  quizTitle={quiz.title}
                  QuizDuration={quiz.duration}
                  endDate={quiz.end_date}
                  startDate={quiz.start_date}
                  totalMarks={quiz.total_marks}
                />
              </Fragment>
            );
          })}
        </div>
      </PrimaryCard>
    </div>
  );
};

export default Quizzes;
