import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";

//^ stylesheet
import styles from "../../../scss/pages/teacher/TeacherDashboard.module.scss";

//^ components
import ClassroomReport from "../teacher-reports/classroom-report/ClassroomReport";
import UnderLine from "../../../components/UI/underline/UnderLine";
import BarCharts from "../../../components/Charts/Barcharts/BarCharts";
import JoinClassroomLineChart from "../../../components/teacher/Dashboard/Charts/JoinClassroom";

//^ auth
import { getAuthToken } from "../../../utils/auth";
import { json } from "react-router-dom";

const TeacherDashboard = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ loader data
  const { getClassrooms } = useLoaderData();
  const { createdClassroom, joinedClassroom } = getClassrooms;

  const classroomCountByMonth = Array(12).fill(0);

  useEffect(() => {
    createdClassroom.forEach((classroom) => {
      const createdAt = new Date(classroom.createdAt);
      const month = createdAt.getMonth(); // 0-indexed month
      classroomCountByMonth[month] += 1; // Increment the count for the corresponding month
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
    backgroundColor: ["rgba(121, 89, 253, 0.2)"],
    borderColor: ["rgb(153, 102, 255)"],
    borderWidth: 1,
  });

  return (
    <>
      <section
        className={`${styles["teacher-dashboard"]} ${
          themeMode && styles["dark"]
        }`}
      >
        <div className={styles["graphs"]}>
          <h2>Classroom Analysis</h2>
          <UnderLine className={styles["underline"]} />
          <div className={styles["charts"]}>
            <div>
              <h4>Classrooms Created per Month</h4>
              <div className={styles["chart"]}>
                <BarCharts
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
                <JoinClassroomLineChart joinedClassroom={joinedClassroom} />
              </div>
            </div>
          </div>
        </div>
        <ClassroomReport
          createdClassroom={createdClassroom}
          joinedClassroom={joinedClassroom}
        />
      </section>
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

  const data = {
    getClassrooms: await getClassrooms.json(),
  };

  return data;
};

export default TeacherDashboard;
