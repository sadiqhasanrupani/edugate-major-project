import React, { useEffect } from "react";
import { json, useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { gsap } from "gsap";

//^ stylesheet
import styles from "../../../../scss/pages/teacher/subject/subroot/TeacherSubjectQuiz.module.scss";

//^ components
import SubjectQuizHeading from "../../../../components/teacher/subject/subroot/teacher-subject-quiz/subject-quiz-heading/SubjectQuizHeading";
import NewSuccessModel from "../../../../components/model/success-model/new-success-mode/NewSuccessModel.jsx";
import Quizzes from "../../../../components/teacher/subject/subroot/quiz/Quizzes";

//^ ui-action
import { uiAction } from "../../../../store/ui-slice";

//^ auth
import { getAuthToken } from "../../../../utils/auth";

const TeacherSubjectQuiz = () => {
  //^ redux useSelector
  const themeMode = useSelector((state) => state.ui.isDarkMode);
  const quizSuccessResponseData = useSelector(
    (state) => state.ui.quizSuccessResponseData
  );
  const isQuizCreated = useSelector((state) => state.ui.isQuizCreated);

  //^ redux useDispatch
  const dispatch = useDispatch();

  useEffect(() => {
    gsap.fromTo(".section", { x: 1000 }, { x: 0, ease: "power4" });
  }, []);

  const closeQuizSuccessResponse = () => {
    dispatch(uiAction.closeQuizSuccessMessage());
  };

  const { quizzes } = useLoaderData();

  return (
    <>
      {isQuizCreated && (
        <NewSuccessModel onCloseBtn={closeQuizSuccessResponse}>
          {quizSuccessResponseData}
        </NewSuccessModel>
      )}
      <section className={`section ${styles["section"]}`}>
        <SubjectQuizHeading themeMode={themeMode} />
        <Quizzes themeMode={themeMode} quizzesData={quizzes} />
      </section>
    </>
  );
};

export const loader = async ({ request, params }) => {
  const getQuizzes = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/quiz/get-quizzes/${params.subjectId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (getQuizzes.status === 401 || getQuizzes.status === 403) {
    const response = await getQuizzes.json();

    throw json({ message: response.message }, { status: getQuizzes.status });
  }

  if (!getQuizzes.ok) {
    throw json({ message: "Something went wrong" }, { status: 500 });
  }

  return getQuizzes;
};

export default TeacherSubjectQuiz;
