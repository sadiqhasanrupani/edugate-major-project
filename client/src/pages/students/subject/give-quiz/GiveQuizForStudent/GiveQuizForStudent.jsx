import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  json,
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";
import { gsap } from "gsap";

//^ stylesheet
import styles from "./GiveQuizForStudent.module.scss";

//^ auth
import { getAuthToken } from "../../../../../utils/auth";

//^ slice action
import { quizAction } from "../../../../../store/quiz-slice";

//^ component
import QuizForStudent from "../../../../../components/student/subject/subroot/quiz/quiz-for-student/QuizForStudent";
import EdugateLoadingAnimation from "../../../../../components/UI/loading/EdugateLoadingAnimation/EdugateLoadingAnimation";
import PrimaryBtn from "../../../../../components/UI/Buttons/PrimaryBtn";
import LoadingWheel from "../../../../../components/UI/loading/LoadingWheel";

const GiveQuizForStudent = () => {
  //^ redux states
  // const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ getting the joinSubjectId and joinQuizId from the params hook
  const { joinSubjectId, joinQuizId } = useParams();

  //^ use-states
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [isSubmitQuizLoading, setIsSubmitQuizLoading] = useState(false);
  const [_, setErrorResponseMsg] = useState(undefined);
  const [answer, setAnswer] = useState("");

  //^ on-load useEffect
  useEffect(() => {
    // const postSubmitStartTime = async () => {
    //   const submitStartTimeInQuiz = await fetch(
    //     `${process.env.REACT_APP_HOSTED_URL}/submit-quiz/submit-start-time-quiz`,
    //     {
    //       method: "POST",
    //       headers: {
    //         Authorization: `Bearer ${getAuthToken()}`,
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ startTime: new Date(), joinQuizId }),
    //     },
    //   );
    //   if (
    //     submitStartTimeInQuiz.status === 401 ||
    //     submitStartTimeInQuiz.status === 403
    //   ) {
    //     const response = await submitStartTimeInQuiz.json();
    //     throw Error({ message: response?.message });
    //   }
    //   if (!submitStartTimeInQuiz.ok) {
    //     const response = await submitStartTimeInQuiz.json();
    //     throw Error({ message: response.message });
    //   }
    // };
    // postSubmitStartTime();
    // eslint-disable-next-line
  }, []);

  //^ dispatch function
  const dispatch = useDispatch();

  //^ navigate function
  const navigate = useNavigate();

  //^ getting the theme value from the local-storage
  const themeMode = JSON.parse(localStorage.getItem("theme"));

  //^ getting the data from loader function using use-loader-data hook.
  const { quizData } = useLoaderData();

  const { joinQuizData } = quizData;

  //^ navigation hook
  const navigation = useNavigation();
  const isNavigationLoading = navigation.state === "loading";

  //^ transition effect useEffect
  useEffect(() => {
    gsap.fromTo(
      ".quiz-for-student-section",
      { x: 1000 },
      { x: 0, ease: "power4" },
    );
  }, []);

  const onSelectAnswer = (questionIndex, answer) => {
    //^ Check if the student has already answered the question
    const existingAnswerIndex = studentAnswers.findIndex(
      (item) => item.questionQuizIndex === questionIndex,
    );

    setAnswer(answer);

    //^ If the student has already answered, update the answer
    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...studentAnswers];
      updatedAnswers[existingAnswerIndex].studentGiveAnswer = answer;
      setStudentAnswers(updatedAnswers);
    } else {
      //^ If the student is answering for the first time, add a new entry

      const newAnswer = {
        questionQuizIndex: questionIndex,
        studentGiveAnswer: answer.toString(),
      };
      setStudentAnswers([...studentAnswers, newAnswer]);
    }
  };

  //^ submit incomplete quiz
  const submitInCompleteQuiz = async () => {};

  //^ submit quiz handler
  const submitQuizHandler = async (e) => {
    e.preventDefault();

    setIsSubmitQuizLoading(true);

    //^ posting the student answers data to the backend to store in a submit-quiz table.
    // const postSubmitQuiz = await fetch(
    //   `${process.env.REACT_APP_HOSTED_URL}/submit-quiz/submit-quiz-for-student`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${getAuthToken()}`,
    //     },
    //     body: JSON.stringify({
    //       studentAnswers: studentAnswers,
    //       joinQuizId,
    //       endTime: new Date(),
    //       submittedOn: new Date(),
    //       answer,
    //     }),
    //   },
    // );

    //^ if any status error comes then this condition will run.
    // if (
    //   postSubmitQuiz.status === 401 ||
    //   postSubmitQuiz.status === 403 ||
    //   postSubmitQuiz.status === 400
    // ) {
    //   setIsSubmitQuizLoading(false);
    //   const response = await postSubmitQuiz.json();

    //   setErrorResponseMsg({
    //     message: response.message,
    //     status: postSubmitQuiz.statusText,
    //   });
    // }

    //^ if there is any problem in a fetch request call then this condition will run.
    // if (!postSubmitQuiz.ok) {
    //   setIsSubmitQuizLoading(false);

    //   setErrorResponseMsg({
    //     message: postSubmitQuiz.statusText,
    //     status: postSubmitQuiz.status,
    //   });
    // }

    setIsSubmitQuizLoading(false);

    //^ parsing the json data
    // const response = await postSubmitQuiz.json();

    // dispatch(
    //   quizAction.studentOpenQuizSubmittedModelHandler({
    //     responseMsg: response.message,
    //   }),
    // );

    navigate(`/student/subject/${joinSubjectId}/quiz`);
  };

  const quizQuestions = JSON.parse(joinQuizData.quiz.questions);

  const totalQuestions = quizQuestions.length || 0;
  const totalSelectedChoices = studentAnswers.length;

  const isSubmitDisabled = totalSelectedChoices < totalQuestions;

  return (
    <>
      {isNavigationLoading ? (
        <div className={`${styles["loading"]}`}>
          <EdugateLoadingAnimation themeMode={themeMode} />
        </div>
      ) : (
        <section
          className={`quiz-for-student-section ${styles["section"]} ${
            themeMode && styles.dark
          }`}
        >
          <QuizForStudent
            quizData={joinQuizData}
            themeMode={themeMode}
            onSelectAnswer={onSelectAnswer} // Pass the onSelectAnswer function to QuizForStudent
            submitInCompleteQuiz={submitInCompleteQuiz}
          />

          <div className={styles["primary-button"]}>
            <PrimaryBtn
              onClick={submitQuizHandler}
              disabled={isSubmitDisabled || isSubmitQuizLoading}
            >
              {isSubmitQuizLoading ? <LoadingWheel /> : "Submit"}
            </PrimaryBtn>
          </div>
        </section>
      )}
    </>
  );
};

export const loader = async ({ request, params }) => {
  const { joinQuizId } = params;

  //^ fetch request
  const quizData = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/quiz/get-quiz-for-student/${joinQuizId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    },
  );

  if (quizData.status === 401 || quizData.status === 403) {
    const response = await quizData.json();

    throw json({ message: response.message }, { status: quizData.status });
  }

  if (!quizData.ok) {
    throw json({ message: quizData.statusText }, { status: 500 });
  }

  const data = {
    quizData: await quizData.json(),
  };

  return data;
};

export default GiveQuizForStudent;
