import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//^ stylesheet
import styles from "./AskStudentToGiveQuiz.module.scss";

//^ slice actions
import { quizAction } from "../../../../../../store/quiz-slice";

//^ components
import DeleteBtn from "../../../../../../components/UI/Buttons/DeleteBtn/DeleteBtn";
import PrimaryBtn from "../../../../../../components/UI/Buttons/PrimaryBtn";

const AskStudentToGiveQuiz = ({ themeMode, quizName }) => {
  //^ quiz global state.
  const studentNavigateToQuiz = useSelector(
    (state) => state.quiz.studentNavigateToQuiz
  );

  //^ dispatch method
  const dispatch = useDispatch();

  //^ navigate hook
  const navigate = useNavigate();

  const navigateToQuizHandler = () => {
    navigate(studentNavigateToQuiz);

    dispatch(quizAction.studentCloseAskQuizModel());
  };

  const closeAskQuizHandler = () => {
    dispatch(quizAction.studentCloseAskQuizModel());
  };

  return (
    <div
      className={`${styles["student-ask-to-give-quiz"]} ${
        themeMode && styles.dark
      }`}
    >
      <p>
        Are you sure you want to take the <b>"{quizName}"</b> quiz?
      </p>

      <div className={styles["buttons"]}>
        <DeleteBtn onClick={closeAskQuizHandler}>Close</DeleteBtn>
        <PrimaryBtn
          className={styles["primary-card"]}
          onClick={navigateToQuizHandler}
        >
          Start Quiz
        </PrimaryBtn>
      </div>
    </div>
  );
};

export default AskStudentToGiveQuiz;
