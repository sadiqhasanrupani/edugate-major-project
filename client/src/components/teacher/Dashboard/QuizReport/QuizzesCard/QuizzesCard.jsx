import React, { Fragment } from "react";

//^ styles
import styles from "./QuizzesCard.module.scss";

//^ component
import PrimaryCard from "../../../../UI/Card/TeacherCard";
import SmallEmptyFolder from "../../../../UI/Icons/EmptyFolder/SmallEmptyFolder";
import QuizCard from "./QuizCard/QuizCard";

const QuizzesCard = ({ themeMode, quizzesData }) => {
  return (
    <div className={`${styles["quizzes-card"]} ${themeMode && styles.dark}`}>
      {quizzesData && quizzesData.length > 0 ? (
        <PrimaryCard className={styles["primary-card"]}>
          <h5>QUIZZES</h5>
          <div className={styles['quizzes-data']}>
            {quizzesData.map((quiz) => {
              return (
                <Fragment key={quiz.quiz_id}>
                  <QuizCard
                    themeMode={themeMode}
                    quizTitle={quiz.title}
                    quizId={quiz.quiz_id}
                    classroomName={quiz.classroom.classroom_name}
                    subjectName={quiz.subject.subject_name}
                  />
                </Fragment>
              );
            })}
          </div>
        </PrimaryCard>
      ) : (
        <div style={{ textAlign: "center" }}>
          <SmallEmptyFolder />
        </div>
      )}
    </div>
  );
};

export default QuizzesCard;
