import React, { useEffect } from "react";
import { json, useLoaderData, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { gsap } from "gsap";

//^ styles
import styles from "./StudentAllQuizzes.module.scss";

//^ auth
import { getAuthToken } from "../../../../../utils/auth";
import Quizzes from "../../../../../components/teacher/subject/subroot/quiz/Quizzes";

//^ slice actions
import { quizAction } from "../../../../../store/quiz-slice";

//^ components
import FormPortal from "../../../../../components/model/FormPortal";
import AskStudentToGiveQuiz from "./ask-student-to-give-quiz/AskStudentToGiveQuiz";
import NewSuccessModel from "../../../../../components/model/success-model/new-success-mode/NewSuccessModel";

const StudentAllQuizzes = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ getting the join-subject-id params using useParams hook
  const { joinSubjectId } = useParams();

  //^ redux states for quiz.
  const isStudentAskQuizModel = useSelector(
    (state) => state.quiz.isStudentAskQuizModel
  );
  const studentNavigateToQuiz = useSelector(
    (state) => state.quiz.studentNavigateToQuiz
  );
  const quizName = useSelector((state) => state.quiz.quizName);

  const isStudentQuizSubmitted = useSelector(
    (state) => state.quiz.isStudentQuizSubmitted
  );

  const studentQuizSubmitMsg = useSelector(
    (state) => state.quiz.studentQuizSubmitMsg
  );

  const dispatch = useDispatch();

  const closeModelHandler = () => {
    dispatch(quizAction.studentDontWantToGiveQuiz());
  };

  const closeQuizSuccessModelHandler = () => {
    dispatch(quizAction.studentCloseQuizSubmittedModelHandler())
  }

  useEffect(() => {
    gsap.fromTo(
      ".student-all-quizzes-section",
      { x: 1000 },
      { x: 0, ease: "power4" }
    );
  }, []);

  //^ loader data
  const { getJoinedQuizzes } = useLoaderData();
  const { quizzesData } = getJoinedQuizzes;

  console.log(getJoinedQuizzes)

  return (
    <>
      {isStudentQuizSubmitted && (
        <NewSuccessModel onCloseBtn={closeQuizSuccessModelHandler}>{studentQuizSubmitMsg}</NewSuccessModel>
      )}
      {isStudentAskQuizModel && (
        <FormPortal
          modelTitle={"Are you Sure?"}
          onBackdrop={closeModelHandler}
          buttonOnClick={closeModelHandler}
        >
          <AskStudentToGiveQuiz themeMode={themeMode} quizName={quizName} />
        </FormPortal>
      )}
      <section
        className={`student-all-quizzes-section ${styles["student-all-quizzes"]}`}
        key={Math.random()}
      >
        <Quizzes
          student={true}
          quizzesData={quizzesData}
          themeMode={themeMode}
        />
      </section>
    </>
  );
};

export const loader = async ({ request, params }) => {
  const { joinSubjectId } = params;

  const getJoinedQuizzes = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/quiz/get-quizzes-for-student/${joinSubjectId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (getJoinedQuizzes.status === 401) {
    const response = await getJoinedQuizzes.json();

    throw json(
      { message: response.message },
      { status: getJoinedQuizzes.status }
    );
  }

  if (!getJoinedQuizzes.ok) {
    throw json(
      { message: getJoinedQuizzes.statusText },
      { status: getJoinedQuizzes.status }
    );
  }

  const data = {
    getJoinedQuizzes: await getJoinedQuizzes.json(),
  };

  return data;
};

export default StudentAllQuizzes;
