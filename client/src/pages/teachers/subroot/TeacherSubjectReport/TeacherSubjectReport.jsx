import React, { useEffect } from "react";
import { useLoaderData, json } from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

//^ styles
import styles from "./TeacherSubjectReport.module.scss";

//^ auth
import { getAuthToken } from "../../../../utils/auth";

//^ components
import SubjectTeacherReport from "./SubjectTeacherReport/SubjectTeacherReport";
import SubjectStudentReport from "./SubjectStudentReport/SubjectStudentReport";
import SubjectAssignmentReport from "./SubjectAssignmentReport/SubjectAssignmentReport";
import SubjectTeacherStudentDonutChart from "./SubjectTeacherStudentDonutChart/SubjectTeacherStudentDonutChart";
import SubjectStudentBarChart from "./SubjectStudentLineChart/SubjectStudentBarChart";
import SubjectAssignmentBarChart from "./SubjectAssignmentBarChart/SubjectAssignmentPolarChart";
import SubjectQuizzesBarChart from "./SubjectQuizzesBarChart/SubjectQuizzesBarChart.jsx";

const TeacherSubjectReport = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);
  const { subjectTeacher, getQuizzesData } = useLoaderData();
  const { students, teachers, assignments, subjectName } = subjectTeacher;
  const { quizzes } = getQuizzesData;

  useEffect(() => {
    gsap.fromTo(
      ".teacher-subject-report-section",
      { x: 1000 },
      { x: 0, ease: "power4" },
    );
  }, []);

  return (
    <section
      className={`teacher-subject-report-section ${styles["teacher-subject-report"]}`}
    >
      <div className={styles["report-charts"]}>
        <div className={styles["doughnut-chart"]}>
          <h5>Assignment, Quiz Insights: Student Participation</h5>
          <SubjectTeacherStudentDonutChart
            assignmentsData={assignments}
            studentsData={students}
            quizzesData={quizzes}
            themeMode={themeMode}
          />
        </div>
        <div className={styles["student-line-chart"]}>
          <h5>Student Line Chart</h5>
          <SubjectStudentBarChart
            themeMode={themeMode}
            studentsData={students}
          />
        </div>
        <div className={styles["assignment-bar-chart"]}>
          <h5>Assignment Analysis: Total Marks</h5>
          <SubjectAssignmentBarChart
            themeMode={themeMode}
            assignmentsData={assignments}
          />
        </div>
        <div className={styles["quiz-bar-chart"]}>
          <h5>Quizzes Analysis: Total Marks</h5>
          <SubjectQuizzesBarChart themeMode={themeMode} quizzesData={quizzes} />
        </div>
      </div>
      <SubjectTeacherReport
        subjectName={subjectName}
        teachersData={teachers}
        themeMode={themeMode}
      />
      <div className={`${styles["student-report"]}`}>
        <SubjectStudentReport
          subjectName={subjectName}
          studentsData={students}
          themeMode={themeMode}
        />
      </div>
      <div className={`${styles["student-assignment"]}`}>
        <SubjectAssignmentReport
          subjectName={subjectName}
          assignments={assignments}
          themeMode={themeMode}
        />
      </div>
    </section>
  );
};

export const loader = async ({ request, params }) => {
  const subjectTeacher = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/join-subject/get-subject-teachers-students-assignments/${params.joinSubjectId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    },
  );

  if (!subjectTeacher.ok) {
    // console.log(await subjectTeacher.json());
    throw json(
      { message: subjectTeacher.statusText },
      { status: subjectTeacher.status },
    );
  }

  const data = {
    subjectTeacher: await subjectTeacher.json(),
  };

  const getQuizzesData = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/quiz/get-quizzes/${data.subjectTeacher.subjectId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    },
  );

  if (!getQuizzesData.ok) {
    // console.log(await getQuizzesData.json());
    throw json(
      { message: getQuizzesData.statusText },
      { status: getQuizzesData.status },
    );
  }

  const data2 = {
    subjectTeacher: data.subjectTeacher,
    getQuizzesData: await getQuizzesData.json(),
  };

  return data2;
};

export default TeacherSubjectReport;
