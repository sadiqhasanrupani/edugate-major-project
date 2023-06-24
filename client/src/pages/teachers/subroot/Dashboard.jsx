import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

//^ stylesheet
import styles from "../../../scss/pages/teacher/TeacherDashboard.module.scss";

//^ components
import ClassroomReport from "../teacher-reports/classroom-report/ClassroomReport";
import UnderLine from "../../../components/UI/underline/UnderLine";
import BarCharts from "../../../components/Charts/Barcharts/BarCharts";
import JoinClassroomLineChart from "../../../components/teacher/Dashboard/Charts/JoinClassroom";
import SubjectReport from "../../../components/teacher/Dashboard/SubjectReport/SubjectReport";
import AssignmentReport from "../../../components/teacher/Dashboard/AssignmentReport/AssignmentReport";
import EdugateLoadingAnimation from "../../../components/UI/loading/EdugateLoadingAnimation/EdugateLoadingAnimation";
import QuizReport from "../../../components/teacher/Dashboard/QuizReport/QuizReport";

//^ auth
import { getAuthToken } from "../../../utils/auth";
import { json } from "react-router-dom";

const TeacherDashboard = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  useEffect(() => {
    !isLoading &&
      gsap.fromTo(
        ".teacher-dashboard-section",
        { x: 1000 },
        { x: 0, ease: "power4" }
      );
  }, []);

  //^ loader data
  const { getClassrooms, getSubjects, getAssignments } = useLoaderData();
  const { createdClassroom, joinedClassroom } = getClassrooms;
  const { subjects } = getSubjects;
  const { assignments } = getAssignments;

  const classroomCountByMonth = Array(12).fill(0);

  useEffect(() => {
    createdClassroom.forEach((classroom) => {
      const createdAt = new Date(classroom.createdAt);
      const month = createdAt.getMonth(); //^ 0-indexed month
      classroomCountByMonth[month] += 1; //^ Increment the count for the corresponding month
    });

    setClassroomData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          ...prevData,
          data: classroomCountByMonth,
        },
      ],
    }));
  }, []);

  //^ states
  const [classroomData, setClassroomData] = useState({
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "classroom created",
        data: [],
      },
    ],
    backgroundColor: [
      `${themeMode ? `hsla(0, 0%, 100%, 0.616)` : "rgba(121, 89, 253, 0.2)"}`,
    ],
    borderColor: [
      `${themeMode ? `hsla(0, 0%, 100%, 0.616)` : "rgb(153, 102, 255)"}`,
    ],
    borderWidth: 1,
  });

  return (
    <>
      {isLoading ? (
        <div className={styles["loading"]}>
          <EdugateLoadingAnimation themeMode={themeMode} />
        </div>
      ) : (
        <section
          className={`teacher-dashboard-section ${
            styles["teacher-dashboard"]
          } ${themeMode && styles["dark"]}`}
        >
          <div className={styles["graphs"]}>
            <h2>Classroom Analysis</h2>
            <UnderLine themeMode={themeMode} className={styles["underline"]} />
            <div className={styles["charts"]}>
              <div>
                <h4>Classrooms Created per Month</h4>
                <div className={styles["chart"]}>
                  <BarCharts
                    className={styles["classroom-bar-chart"]}
                    data={classroomData}
                    options={{
                      scales: {
                        y: {
                          beginAtZero: true,
                          stepSize: 1,
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <div>
                <h4>Classroom joined per Month</h4>
                <div className={styles["chart"]}>
                  <JoinClassroomLineChart
                    themeMode={themeMode}
                    joinedClassroom={joinedClassroom}
                  />
                </div>
              </div>
            </div>
          </div>
          <ClassroomReport
            createdClassroom={createdClassroom}
            joinedClassroom={joinedClassroom}
          />
          <div className={styles["subject-report"]}>
            <SubjectReport subjects={subjects} themeMode={themeMode} />
          </div>
          <div className={styles["assignment-report"]}>
            <AssignmentReport assignments={assignments} themeMode={themeMode} />
          </div>
          <div className={styles["quiz-report"]}>
            <QuizReport />
          </div>
        </section>
      )}
    </>
  );
};

export const loader = async ({ request, params }) => {
  const getClassrooms = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/classroom/get-classrooms`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (getClassrooms.status === 401 || getClassrooms.status === 403) {
    const response = await getClassrooms.json();

    throw json({ message: response.message }, { status: getClassrooms.status });
  }

  if (!getClassrooms.ok) {
    console.log(await getClassrooms.json());
    throw json(
      { message: getClassrooms.statusText },
      { status: getClassrooms.status }
    );
  }

  const getSubjects = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/subject/get-subjects`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (getSubjects.status === 401 || getSubjects.status === 403) {
    const response = await getSubjects.json();

    throw json({ message: response.message }, { status: getSubjects.status });
  }

  if (!getSubjects.ok) {
    console.log(await getSubjects.json());
    throw json(
      { message: getSubjects.statusText },
      { status: getSubjects.status }
    );
  }

  const getAssignments = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/assignment/get-assignments-for-admin`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (getAssignments.status === 401 || getAssignments.status === 403) {
    const response = await getAssignments.json();

    throw json(
      { message: response.message },
      { status: getAssignments.status }
    );
  }

  if (!getAssignments.ok) {
    console.log(await getAssignments.json());
    throw json(
      { message: getAssignments.statusText },
      { status: getAssignments.status }
    );
  }

  const data = {
    getClassrooms: await getClassrooms.json(),
    getSubjects: await getSubjects.json(),
    getAssignments: await getAssignments.json(),
  };

  return data;
};

export default TeacherDashboard;
