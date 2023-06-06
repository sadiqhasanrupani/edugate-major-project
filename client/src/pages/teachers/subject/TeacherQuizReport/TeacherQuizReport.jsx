import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { json, useLoaderData } from "react-router-dom";
import { gsap } from "gsap";

//^ styles
import styles from "./TeacherQuizReport.module.scss";

//^ auth
import { getAuthToken } from "../../../../utils/auth";

//^ util
import shortenString from "../../../../utils/string-shrinker";

//^ component
import TeacherQuizTabularReports from "../../../../components/teacher/subroot/TeacherQuizTabularReport/TeacherQuizTabularReport";
import TeacherQuizGraphReport from "../../../../components/teacher/subroot/TeacherQuizGraphReport/TeacherQuizGraphReport";

const TeacherQuizReport = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ transition useEffect
  useEffect(() => {
    gsap.fromTo(
      ".teacher-quiz-report-section",
      { x: 1000 },
      { x: 0, ease: "power4" }
    );
  }, []);

  const { getPresentStudents, getNotAttemptedStudents, getQuizData } =
    useLoaderData();
  const { attemptedStudents } = getPresentStudents;
  const { joinQuizzes } = getNotAttemptedStudents;
  const { quizData } = getQuizData;

  const shrinkQuizTitle = shortenString(quizData.title, 15);

  return (
    <section
      className={`teacher-quiz-report-section ${styles["teacher-quiz-report"]}`}
    >
      <div className={styles["teacher-graph-report"]}>
        <TeacherQuizGraphReport
          submittedStudentsData={attemptedStudents}
          quizName={shrinkQuizTitle}
          notSubmittedStudentsData={joinQuizzes}
          themeMode={themeMode}
        />
      </div>
      <div className={styles["teacher-tabular-report"]}>
        <TeacherQuizTabularReports
          quizName={quizData.title}
          themeMode={themeMode}
          studentsData={attemptedStudents}
          notAttemptedStudentsData={joinQuizzes}
        />
      </div>
    </section>
  );
};

export const loader = async ({ request, params }) => {
  const getPresentStudents = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/quiz/get-attempted-students/${params.quizId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (getPresentStudents.status === 401 || getPresentStudents.status === 403) {
    const response = await getPresentStudents.json();

    throw json(
      { message: response.message },
      { status: getPresentStudents.status }
    );
  }

  if (!getPresentStudents.ok) {
    throw json(
      { message: "Internal server error" },
      { status: getPresentStudents.status }
    );
  }

  const getNotAttemptedStudents = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/quiz/get-not-attempted-students/${params.quizId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (
    getNotAttemptedStudents.status === 401 ||
    getNotAttemptedStudents.status === 403
  ) {
    const response = await getNotAttemptedStudents.json();

    throw json(
      { message: response.message },
      { status: getNotAttemptedStudents.status }
    );
  }

  if (!getNotAttemptedStudents.ok) {
    throw json(
      { message: "Internal server error" },
      { status: getNotAttemptedStudents.status }
    );
  }

  const getQuizData = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/quiz/get-quiz/${params.quizId}`,
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
    throw json(
      { message: "Internal server error" },
      { status: getQuizData.status }
    );
  }

  const data = {
    getPresentStudents: await getPresentStudents.json(),
    getNotAttemptedStudents: await getNotAttemptedStudents.json(),
    getQuizData: await getQuizData.json(),
  };

  return data;
};

export default TeacherQuizReport;
