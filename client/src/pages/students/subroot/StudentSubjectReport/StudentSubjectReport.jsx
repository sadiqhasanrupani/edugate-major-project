//^ dependencies
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { json, useLoaderData } from "react-router-dom";
import { gsap } from "gsap";

//^ stylesheet
import styles from "./StudentSubjectReport.module.scss";

//^ auth
import { getAuthToken } from "../../../../utils/auth";

//^ component
import StudentClassReportAnalysis from "../../../../components/student/dashboard/student-classroom-report-analysis/StudentClassReportAnalysis";
import UnderLine from "../../../../components/UI/underline/UnderLine";

const StudentSubjectReport = ({ teacher }) => {
  //^ redux useSelector
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  const {
    getUpcomingAssignments,
    getUpcomingQuizzesData,
    getStudentAssignmentScore,
    getStudentQuizzesScores,
  } = useLoaderData();
  const { upcomingAssignments } = getUpcomingAssignments;
  const { upcomingQuizzes } = getUpcomingQuizzesData;
  const { studentAssignmentsData } = getStudentAssignmentScore;
  const { quizzesScores } = getStudentQuizzesScores;

  //^ transition useEffect
  useEffect(() => {
    gsap.fromTo(
      ".subject-report-section",
      { x: 1000 },
      { x: 0, ease: "power4" }
    );
  }, []);

  return (
    <section
      className={`subject-report-section ${styles["subject-report"]} ${
        themeMode && styles.dark
      }`}
    >
      <div className={styles["subject-report-title"]}>
        <h1>Subject Report</h1>
        <UnderLine themeMode={themeMode} />
      </div>
      <StudentClassReportAnalysis
        themeMode={themeMode}
        upcomingAssignmentsData={upcomingAssignments}
        upcomingQuizzesData={upcomingQuizzes}
        assignmentsScore={studentAssignmentsData}
        quizzesScore={quizzesScores}
      />
    </section>
  );
};

export const loader = async ({ params }) => {
  //^ Assignments Data
  const getUpcomingAssignments = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/assignment/get-upcoming-assignments/${params.joinSubjectId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify({ studentId: params.studentId }),
    }
  );

  if (
    getUpcomingAssignments.status === 401 ||
    getUpcomingAssignments.status === 403
  ) {
    const response = await getUpcomingAssignments.json();

    console.log(response);

    throw json(
      { message: response.message },
      { status: getUpcomingAssignments.status }
    );
  }

  if (!getUpcomingAssignments.ok) {
    console.log(await getUpcomingAssignments.json());

    throw json({ message: "Something went wrong" }, { status: 500 });
  }

  //^ Quiz data
  const getUpcomingQuizzesData = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/quiz/get-upcoming-quizzes/${params.joinSubjectId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (
    getUpcomingQuizzesData.status === 401 ||
    getUpcomingQuizzesData.status === 403
  ) {
    const response = await getUpcomingQuizzesData.json();

    throw json(
      { message: response.message },
      { status: getUpcomingQuizzesData.status }
    );
  }

  if (!getUpcomingQuizzesData.ok) {
    throw json({ message: "Something went wrong" }, { status: 500 });
  }

  //^ Current Student Assignment data.
  const getStudentAssignmentScore = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/assignment/get-all-assignments-student-score/${params.joinSubjectId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (
    getStudentAssignmentScore.status === 401 ||
    getStudentAssignmentScore.status === 403
  ) {
    const response = await getStudentAssignmentScore.json();
    console.log(response);

    throw json(
      { message: response.message },
      { status: getStudentAssignmentScore.status }
    );
  }

  if (!getStudentAssignmentScore.ok) {
    throw json({ message: "Something went wrong" }, { status: 500 });
  }

  //^ current student's quizzes score data
  const getStudentQuizzesScores = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/quiz/get-quizzes-scores/${params.joinSubjectId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (
    getStudentQuizzesScores.status === 401 ||
    getStudentQuizzesScores.status === 403
  ) {
    const response = await getStudentQuizzesScores.json();
    console.log(response);

    throw json(
      { message: response.message },
      { status: getStudentQuizzesScores.status }
    );
  }

  if (!getStudentQuizzesScores.ok) {
    throw json({ message: "Something went wrong" }, { status: 500 });
  }

  const data = {
    getUpcomingAssignments: await getUpcomingAssignments.json(),
    getUpcomingQuizzesData: await getUpcomingQuizzesData.json(),
    getStudentAssignmentScore: await getStudentAssignmentScore.json(),
    getStudentQuizzesScores: await getStudentQuizzesScores.json(),
  };

  return data;
};

export default StudentSubjectReport;
