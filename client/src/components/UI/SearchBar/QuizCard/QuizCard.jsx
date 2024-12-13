import React, { Fragment } from "react";

import styles from "./QuizCard.module.scss";

import SearchCard from "../SearchCard/SearchCard";

const QuizCard = ({ themeMode, quizData }) => {
  console.log("quizData", quizData);

  return (
    <div className={`${styles["quiz-card"]} ${themeMode && styles.dark}`}>
      {Array.isArray(quizData) &&
        quizData.length > 0 &&
        quizData.map((quiz) => {
          return (
            <Fragment key={quiz.quiz_id}>
              <SearchCard
                classroomName={quiz.classroom.classroom_name}
                itemName={"Quiz"}
                link={`/teacher/dashboard/quiz-report/${quiz.quiz_id}`}
                name={quiz.title}
                profileImg={quiz.classroom.classroom_profile_img}
                subjectName={quiz.subject.subject_name}
                themeMode={themeMode}
              />
            </Fragment>
          );
        })}
    </div>
  );
};

export default QuizCard;
