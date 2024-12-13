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
import moment from "moment";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import styles from "./EditQuiz.module.scss";

import QuizTitle from "../../components/create-quiz/QuizTitle";
import QuizStartAndEndDate from "../../components/quiz-start-and-end-date/QuizStartAndEndDate";
import QuizQuestion from "../../components/quiz-questions/QuizQuestion";
import PrimaryBtn from "../../components/UI/Buttons/PrimaryBtn";
import EdugateLoadingAnimation from "../../components/UI/loading/EdugateLoadingAnimation/EdugateLoadingAnimation";
import LoadingWheel from "../../components/UI/loading/LoadingWheel";

import { getAuthToken } from "../../utils/auth";

//^ uiAction
import { postUpdateQuizHandler } from "../../http/post";

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
  // eslint-disable-next-line
  const [_, setErrorResponseData] = useState(undefined);

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
    setStartDate(moment(startDate).toDate());
    setEndDate(moment(endDate).toDate());
  }, []);

  const quizQuestionDataHandler = useCallback((data) => {
    setQuestionsData(data);
  }, []);

  const isQuestionsData =
    Array.isArray(questionsData) && questionsData.length > 0
      ? false
      : questionsData.every(
        (question) =>
          question?.question?.enteredValidValue &&
          question?.question?.enteredValue &&
          question?.choices?.length !== 0 &&
          question?.selectedChoice?.length !== 0,
      );

  useEffect(() => {
    if (timeMarksData && timeMarksData.timeMarks) {
      setMarks(timeMarksData.timeMarks.marks / questionsData.length);
    }

    // eslint-disable-next-line
  }, [timeMarksData.timeMarks, questionsData, marks]);

  const isFormIsValid =
    isQuestionsData && timeMarksData && startDate && endDate;

  const {
    isPending: updateQuizIsPending,
    isError: updateQuizIsError,
    error: updateQuizError,
    mutate: updateQuizMutate,
    reset: udpateQuizReset,
  } = useMutation({
    mutationKey: ["post-update-quiz"],
    mutationFn: postUpdateQuizHandler,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate(`/teacher/subject/${subjectId}/quiz`);
    },
  });

  useEffect(() => {
    if (updateQuizIsError) {
      if (updateQuizError.status === 401 || updateQuizError.status === 400) {
        toast.error(updateQuizError.message);
      }
      udpateQuizReset();
    }

    // eslint-disable-next-line
  }, [updateQuizError, updateQuizIsError]);

  const postOnClickUpdateQuiz = async (e) => {
    e.preventDefault();
    setErrorResponseData(undefined);

    //^ storing all the data inside the data constant
    const data = {
      quizTitle:
        timeMarksData.quizTitleEnteredValue.trim().length === 0
          ? quizData.title
          : timeMarksData.quizTitleEnteredValue,
      quizDuration: timeMarksData.timeMarks.time,
      quizTotalMarks: timeMarksData.timeMarks.marks,
      startDate: moment(startDate).toDate(),
      endDate: moment(endDate).toDate(),
      questionsData,
      subjectId,
      quizId,
    };

    updateQuizMutate({ data });
  };

  return (
    <>
      {isLoading ? (
        <div className={styles["loading"]}>
          <EdugateLoadingAnimation themeMode={themeMode} />
        </div>
      ) : (
        <section
          className={`edit-quiz-section ${styles["edit-quiz"]} ${themeMode && styles["dark"]
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
            quizQuestionData={JSON.parse(quizData.questions)}
            onQuizQuestion={quizQuestionDataHandler}
          />
          <PrimaryBtn
            disabled={isFormIsValid || updateQuizIsPending}
            className={styles["update-quiz-btn"]}
            onClick={postOnClickUpdateQuiz}
          >
            {updateQuizIsPending ? <LoadingWheel /> : "Update Quiz"}
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
    },
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
