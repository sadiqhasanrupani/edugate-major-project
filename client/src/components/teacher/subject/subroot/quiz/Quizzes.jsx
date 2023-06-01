import React, { Fragment } from "react";

//^ styles
import styles from "./Quizzes.module.scss";

//^ component
import PrimaryCard from "../../../../UI/Card/TeacherCard";
import Quiz from "./Quiz/Quiz";
import NoData from "../../../../UI/Icons/EmptyFolder/NoData";

const Quizzes = ({ themeMode, quizzesData, student }) => {
  return (
    <div className={`${styles["quizzes"]} ${themeMode && styles["dark"]}`}>
      <PrimaryCard className={styles["primary-card"]}>
        <h4>QUIZ</h4>
        <div className={styles["quizzes-data"]}>
          {quizzesData.length < 0 ? (
            quizzesData.map((quiz) => {
              return !student ? (
                <Fragment key={quiz.quiz_id}>
                  <Quiz
                    quizId={quiz.quiz_id}
                    themeMode={themeMode}
                    quizTitle={quiz.title}
                    QuizDuration={quiz.duration}
                    endDate={quiz.end_date}
                    startDate={quiz.start_date}
                    totalMarks={quiz.total_marks}
                  />
                </Fragment>
              ) : (
                <Fragment key={quiz.join_quiz_id}>
                  <Quiz
                    quizId={quiz.join_quiz_id}
                    themeMode={themeMode}
                    quizTitle={quiz.quiz.title}
                    QuizDuration={quiz.quiz.duration}
                    endDate={quiz.quiz.end_date}
                    startDate={quiz.quiz.start_date}
                    totalMarks={quiz.quiz.total_marks}
                    student={true}
                  />
                </Fragment>
              );
            })
          ) : (
            <div className={styles["center"]}>
              <NoData />
            </div>
          )}
        </div>
      </PrimaryCard>
    </div>
  );
};

export default Quizzes;
