import React, { useCallback, useEffect, useState } from "react";
import {
  useParams,
  useLoaderData,
  useNavigation,
  useNavigate,
  json,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { gsap } from "gsap";

import styles from "./EditQuiz.module.scss";

import QuizTitle from "../../components/create-quiz/QuizTitle";
import QuizStartAndEndDate from "../../components/quiz-start-and-end-date/QuizStartAndEndDate";
import QuizQuestion from "../../components/quiz-questions/QuizQuestion";
import PrimaryBtn from "../../components/UI/Buttons/PrimaryBtn";
import EdugateLoadingAnimation from "../../components/UI/loading/EdugateLoadingAnimation/EdugateLoadingAnimation";
import LoadingWheel from "../../components/UI/loading/LoadingWheel";

import { getAuthToken } from "../../utils/auth";

//^ uiAction
import { uiAction } from "../../store/ui-slice";

const EditQuiz = () => {
  const themeMode = JSON.parse(localStorage.getItem("theme"));
  const { quizData } = useLoaderData();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const [timeMarksData, setTimeMarksData] = useState({});
  const [marks, setMarks] = useState(0);
  const [questionsData, setQuestionsData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorResponseData, setErrorResponseData] = useState(undefined);

  //^ getting the subject id using the useParams hook
  const { subjectId, quizId } = useParams();

  //^ dispatch hook
  const dispatch = useDispatch();

  //^ navigate hook
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(".edit-quiz-section", { x: -500 }, { x: 0, ease: "power4" });
  }, []);

  const getQuizTitleDataHandler = useCallback((timeMarksData) => {
    setTimeMarksData(timeMarksData);
  }, []);

  const getQuizStartEndDateHandler = useCallback((startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
  }, []);

  const quizQuestionDataHandler = useCallback((data) => {
    setQuestionsData(data);
  }, []);

  const isQuestionsData = questionsData.every(
    (question) =>
      question.question.enteredValidValue &&
      question.question.enteredValue &&
      question.choices.length !== 0 &&
      question.selectedChoice.length !== 0
  );

  useEffect(() => {
    if (timeMarksData && timeMarksData.timeMarks) {
      setMarks(timeMarksData.timeMarks.marks / questionsData.length);
    }
  }, [timeMarksData.timeMarks, questionsData, marks]);

  const isFormIsValid =
    isQuestionsData && timeMarksData && startDate && endDate;

  const postUpdateQuizHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorResponseData(undefined);

    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);

    //^ storing all the data inside the data constant
    const data = {
      quizTitle:
        timeMarksData.quizTitleEnteredValue.trim().length === 0
          ? quizData.title
          : timeMarksData.quizTitleEnteredValue,
      quizDuration: timeMarksData.timeMarks.time,
      quizTotalMarks: timeMarksData.timeMarks.marks,
      startDate: startDate,
      endDate: endDate,
      questionsData,
      subjectId,
      quizId,
    };

    console.log(data);

    // return;

    //^ Performing the API request to update the quiz
    const postUpdateQuiz = await fetch(
      `${process.env.REACT_APP_HOSTED_URL}/quiz/update-quiz`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (postUpdateQuiz.status === 401 || postUpdateQuiz.status === 400) {
      setIsSubmitting(false);
      const response = await postUpdateQuiz.json();

      setErrorResponseData({ message: response.message });
    }

    if (!postUpdateQuiz.ok) {
      setIsSubmitting(false);
      const response = await postUpdateQuiz.json();

      setErrorResponseData({ message: response.message });
    }

    setIsSubmitting(false);

    //^ getting the response data.
    const response = await postUpdateQuiz.json();

    //^ sending the data to the openQuizUpdateSuccessMsg function.
    dispatch(uiAction.openQuizUpdateSuccessMsg(response.message));

    navigate(`/teacher/subject/${subjectId}/quiz`);
  };
  return (
    <>
      {isLoading ? (
        <div className={styles["loading"]}>
          <EdugateLoadingAnimation themeMode={themeMode} />
        </div>
      ) : (
        <section
          className={`edit-quiz-section ${styles["edit-quiz"]} ${
            themeMode && styles["dark"]
          }`}
        >
          <div
            style={{
              marginLeft: "-20px",
              marginTop: "-20px",
              marginRight: "-20px",
            }}
          >
            <QuizTitle
              quizDuration={quizData.duration}
              totalMarks={quizData.total_marks}
              quizTitle={quizData.title}
              onQuizTitle={getQuizTitleDataHandler}
              themeMode={themeMode}
            />
          </div>
          <QuizStartAndEndDate
            themeMode={themeMode}
            quizEndDate={quizData.end_date}
            quizStartData={quizData.start_date}
            onQuizStartEndDate={getQuizStartEndDateHandler}
          />
          <QuizQuestion
            themeMode={themeMode}
            marks={marks.toFixed(1)}
            quizQuestionData={quizData.questions}
            onQuizQuestion={quizQuestionDataHandler}
          />
          <PrimaryBtn
            disabled={!isFormIsValid || isSubmitting}
            className={styles["update-quiz-btn"]}
            onClick={postUpdateQuizHandler}
          >
            {isSubmitting ? <LoadingWheel /> : "Update Quiz"}
          </PrimaryBtn>
        </section>
      )}
    </>
  );
};

export const loader = async ({ request, params }) => {
  const { quizId } = params;

  const getQuizData = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/quiz/get-quiz/${quizId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (getQuizData.status === 401 || getQuizData.status === 403) {
    const response = await getQuizData.json();

    throw json({ message: response.message }, { status: getQuizData.status });
  }

  if (!getQuizData.ok) {
    throw json({ message: "Something went wrong" }, { status: 500 });
  }

  return getQuizData;
};

export default EditQuiz;
