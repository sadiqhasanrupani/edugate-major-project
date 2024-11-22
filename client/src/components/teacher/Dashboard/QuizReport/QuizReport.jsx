import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//^ styles
import styles from "./QuizReport.module.scss";

//^ component
import QuizReportHeading from "./QuizReportHeading/QuizReportHeading";
import QuizzesCard from "./QuizzesCard/QuizzesCard";

//^ auth
import { getAuthToken } from "../../../../utils/auth";

const QuizReport = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ use states
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const getQuizzesForTeacher = async () => {
      const getQuizzes = await fetch(
        `${process.env.REACT_APP_HOSTED_URL}/quiz/get-quizzes-for-teacher`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        },
      );

      if (!getQuizzes.ok) {
        // console.log(await getQuizzes.json());

        throw new Error({ message: "Something went wrong" });
      }

      const response = await getQuizzes.json();

      setQuizzes(response.quizzesData);
    };
    getQuizzesForTeacher();
  }, []);

  return (
    <div className={styles["quiz-report"]}>
      <QuizReportHeading themeMode={themeMode} />
      <QuizzesCard themeMode={themeMode} quizzesData={quizzes} />
    </div>
  );
};

export default QuizReport;
