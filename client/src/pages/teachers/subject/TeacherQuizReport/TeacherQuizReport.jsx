import React from "react";
import { useSelector } from "react-redux";
import { json, useLoaderData } from "react-router-dom";

//^ styles
import styles from "./TeacherQuizReport.module.scss";

//^ auth
import { getAuthToken } from "../../../../utils/auth";

//^ component
import TeacherQuizTabularReports from "../../../../components/teacher/subroot/TeacherQuizTabularReport/TeacherQuizTabularReport";

const TeacherQuizReport = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  const { getPresentStudents, getNotAttemptedStudents } = useLoaderData();
  const { attemptedStudents } = getPresentStudents;
  const { joinQuizzes } = getNotAttemptedStudents;

  return (
    <div className={styles["teacher-quiz-report"]}>
      <TeacherQuizTabularReports
        themeMode={themeMode}
        studentsData={attemptedStudents}
        notAttemptedStudentsData={joinQuizzes}
      />
    </div>
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

  const data = {
    getPresentStudents: await getPresentStudents.json(),
    getNotAttemptedStudents: await getNotAttemptedStudents.json(),
  };

  return data;
};

export default TeacherQuizReport;
