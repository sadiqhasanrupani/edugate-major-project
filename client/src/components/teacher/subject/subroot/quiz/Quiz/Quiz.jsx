import React from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import styles from "./Quiz.module.scss";

import SecondaryCard from "../../../../../UI/Card/CardSecondary";
import DarkMenu from "../../../../../UI/Icons/Dark/DarkMenu";
import Menu from "../../../../../UI/Icons/More";

import useMonthDay from "../../../../../../hooks/use-month-day";

//^ slice model
import { quizAction } from "../../../../../../store/quiz-slice";

const Quiz = ({
  themeMode,
  quizTitle,
  startDate,
  endDate,
  QuizDuration: quizDuration,
  totalMarks,
  quizId,
  student,
}) => {
  const { subjectId, joinSubjectId } = useParams();
  const { formattedDate: formattedStartDate } = useMonthDay(startDate);
  const { formattedDate: formattedEndDate } = useMonthDay(endDate);

  //^ dispatch hook
  const dispatch = useDispatch();

  const askConformationHandler = (e) => {
    e.preventDefault();

    const navigateToQuizPath = `/student/${joinSubjectId}/give-quiz/${quizId}`;

    dispatch(
      quizAction.askStudentToGiveQuiz({
        navigateToQuiz: navigateToQuizPath,
        quizName: quizTitle,
      })
    );
  };

  return (
    <div className={`${styles["quiz"]} ${themeMode && styles["dark"]}`}>
      <SecondaryCard className={styles["secondary-card"]}>
        <div className={styles["quiz-title"]}>
          {!student ? (
            <Link to={`/teacher/${subjectId}/edit-quiz/${quizId}`}>
              {quizTitle}
            </Link>
          ) : (
            <Link onClick={askConformationHandler}>{quizTitle}</Link>
          )}
          {themeMode ? <DarkMenu /> : <Menu />}
        </div>
        <div className={styles["quiz-footer"]}>
          <div className={styles["start-date-end-date"]}>
            <h4>
              Start Date: <span>{formattedStartDate}</span>
            </h4>
            <h4>
              End Date: <span>{formattedEndDate}</span>
            </h4>
          </div>
          <div className={styles["duration-total-marks"]}>
            <h4>
              Quiz Duration: <span>{quizDuration}</span> mins
            </h4>
            <h4>
              Total Marks: <span>{totalMarks}</span>
            </h4>
          </div>
        </div>
      </SecondaryCard>
    </div>
  );
};

export default Quiz;
