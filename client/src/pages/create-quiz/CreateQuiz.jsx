import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { gsap } from "gsap";

import styles from "../../scss/pages/create-quiz/CreateQuiz.module.scss";

//^ components
import QuizTitle from "../../components/create-quiz/QuizTitle";
import QuizStartAndEndDate from "../../components/quiz-start-and-end-date/QuizStartAndEndDate";
import QuizQuestions from "../../components/quiz-questions/QuizQuestion.jsx";
import PrimaryBtn from "../../components/UI/Buttons/PrimaryBtn";

const CreateQuiz = () => {
  //^ state
  const [timeMarksData, setTimeMarksData] = useState({});
  const [marks, setMarks] = useState(0);

  useEffect(() => {
    gsap.fromTo(".create-quiz-main", { x: -300 }, { x: 0, ease: "power4" });
  }, []);

  const themeMode = JSON.parse(localStorage.getItem("theme"));

  //^ getting start and end date
  const getDatesHandler = (startDate, endDate) => {
    // console.log(startDate, endDate);
  };

  const getQuizTitleData = useCallback((timeMarksData) => {
    setTimeMarksData(timeMarksData);
  }, []);

  console.log(timeMarksData);

  useEffect(() => {
    timeMarksData &&
      timeMarksData.timeMarks &&
      setMarks(timeMarksData.timeMarks.marks / 10);
  }, [timeMarksData]);

  //^ create quiz handler
  const createQuizHandler = async () => {};

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
            <QuizQuestions marks={marks} />
          </div>
          <PrimaryBtn onClick={createQuizHandler}>Create Quiz</PrimaryBtn>
        </Form>
      </main>
    </>
  );
};

export const loader = async ({ request, params }) => {
  return null;
};

export default CreateQuiz;
