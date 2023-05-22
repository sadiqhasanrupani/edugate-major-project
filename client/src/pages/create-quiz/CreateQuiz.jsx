import React, { useCallback, useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { gsap } from "gsap";

import styles from "../../scss/pages/create-quiz/CreateQuiz.module.scss";

//^ components
import QuizTitle from "../../components/create-quiz/QuizTitle";
import QuizStartAndEndDate from "../../components/quiz-start-and-end-date/QuizStartAndEndDate";
import QuizQuestions from "../../components/quiz-questions/QuizQuestion.jsx";
import PrimaryBtn from "../../components/UI/Buttons/PrimaryBtn";
import LoadingWheel from "../../components/UI/loading/LoadingWheel";

//^ action
import { uiAction } from "../../store/ui-slice";

//^ auth
import { getAuthToken } from "../../utils/auth";

const CreateQuiz = () => {
  //^ getting the subjectId through the url's param id
  const { subjectId } = useParams();

  //^ navigate hook
  const navigate = useNavigate();

  //^ creating dispatch method using useDispatch hook
  const dispatch = useDispatch();

  //^ state
  const [timeMarksData, setTimeMarksData] = useState({});
  const [marks, setMarks] = useState(0);
  const [questionsData, setQuestionsData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  //^ response states
  const [errorResponseData, setErrorResponseData] = useState(undefined);

  //^ loading states
  const [quizIsLoading, setQuizIsLoading] = useState(false);

  //^ when the CreateQuiz component render for the first time then this function will run for once.
  useEffect(() => {
    gsap.fromTo(".create-quiz-main", { x: -300 }, { x: 0, ease: "power4" });
  }, []);

  //^ getting the theme value from the local storage of the browser.
  const themeMode = JSON.parse(localStorage.getItem("theme"));

  //^ getting start and end date
  const getDatesHandler = useCallback(
    (startDate, endDate) => {
      setStartDate(startDate);
      setEndDate(endDate);
    },
    [startDate, endDate]
  );

  //^ getting all the data which in the title fo the form
  const getQuizTitleData = useCallback(
    (timeMarksData) => {
      setTimeMarksData(timeMarksData);
    },
    [setTimeMarksData]
  );

  //^ getting quiz question through this handler
  const quizQuestionDataHandler = (data) => {
    setQuestionsData(data);
  };

  //^ whenever there is a update in timeMarksData and in the questionsData then this useEffect function will run.
  useEffect(() => {
    timeMarksData &&
      timeMarksData.timeMarks &&
      setMarks(timeMarksData.timeMarks.marks / questionsData.length);
  }, [timeMarksData, questionsData]);

  //^ create quiz handler
  const createQuizHandler = async (e) => {
    //^ preventing the browser to not to send any request.
    e.preventDefault();

    setQuizIsLoading(true);

    //^ storing all the data inside the data constant
    const data = {
      quizTitle: timeMarksData.quizTitleEnteredValue,
      quizDuration: timeMarksData.timeMarks.time,
      quizTotalMarks: timeMarksData.timeMarks.marks,
      startDate,
      endDate,
      questionsData,
      subjectId,
    };

    const postCreateQuiz = await fetch(
      `${process.env.REACT_APP_HOSTED_URL}/quiz/create-quiz`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (
      postCreateQuiz.status === 401 ||
      postCreateQuiz.status === 422 ||
      postCreateQuiz.status === 400
    ) {
      setQuizIsLoading(true);
      const response = await postCreateQuiz.json();

      console.log(response);
    }

    if (!postCreateQuiz.ok) {
      setQuizIsLoading(true);
      const response = await postCreateQuiz.json();
      console.log(response);
    }

    setQuizIsLoading(true);

    const responseData = await postCreateQuiz.json();

    //^ dispatching a action of isQuizCreated
    dispatch(uiAction.openQuizSuccessMessage(responseData.message));

    //^ If the response is 200 then we navigate to the quiz page of teacher
    navigate(`/teacher/subject/${subjectId}/quiz`);
  };

  //^ checking that in questionsData, is there any field is empty or not.
  const isQuestionsData = questionsData.every(
    (question) =>
      question.question.enteredValidValue &&
      question.question.enteredValue &&
      question.choices.length !== 0 &&
      question.selectedChoice.length !== 0
  );

  //^ when all the validation is true then isFormIsValid constant will be true and false
  const isFormIsValid =
    isQuestionsData && timeMarksData && marks && startDate && endDate;

  return (
    <>
      <main className={`create-quiz-main ${styles["main"]}`}>
        <Form>
          <QuizTitle themeMode={themeMode} onQuizTitle={getQuizTitleData} />
          <div className={styles["quiz-date-time"]}>
            <QuizStartAndEndDate
              themeMode={themeMode}
              onQuizStartEndDate={getDatesHandler}
            />
          </div>
          <div className={styles["quiz-questions"]}>
            <QuizQuestions
              marks={marks.toFixed(1)}
              onQuizQuestion={quizQuestionDataHandler}
            />
          </div>
          <div className={`${styles["margin"]} ${styles["create-quiz-btn"]}`}>
            {/**
             //^ if the isFormIsValid then and then only the primary btn will be able click unless not
            */}
            <PrimaryBtn
              disabled={!isFormIsValid | quizIsLoading}
              onClick={createQuizHandler}
            >
              {quizIsLoading ? <LoadingWheel /> : "Create Quiz"}
            </PrimaryBtn>
          </div>
        </Form>
      </main>
    </>
  );
};

export const loader = async ({ request, params }) => {
  return null;
};

export default CreateQuiz;
