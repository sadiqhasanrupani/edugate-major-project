import React, { useEffect } from "react";
import { json, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

import styles from "./StudentAllQuizzes.module.scss";

//^ auth
import { getAuthToken } from "../../../../../utils/auth";

const StudentAllQuizzes = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

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

  console.log(quizzesData);

  return (
    <section
      className={`student-all-quizzes-section ${styles["student-all-quizzes"]}`}
    >
      StudentAllQuizzes
    </section>
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
