import React, { useEffect } from "react";
import { json, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

import styles from "../../../scss/pages/student/subroot/StudentDashboard.module.scss";

//^ auth
import { getAuthToken } from "../../../utils/auth";

//^ components
import StudentDashboardComponent from "../../../components/student/subroot/StudentDashboardComponent/StudentDashboardComponent";

const StudentDashboard = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  const { getClassrooms } = useLoaderData();
  const { joinClassroomData } = getClassrooms;

  useEffect(() => {
    gsap.fromTo(
      ".student-dashboard-section",
      { x: 1000 },
      { x: 0, ease: "power4" }
    );
  }, []);
  return (
    <section
      className={`student-dashboard-section ${styles["student-dashboard"]}`}
    >
      <StudentDashboardComponent
        themeMode={themeMode}
        classroomsData={joinClassroomData}
      />
    </section>
  );
};

export async function loader() {
  const getClassrooms = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/get-join-classroom-as-student`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (getClassrooms.status === 401) {
    const response = await getClassrooms.json();

    throw json({ message: response.message }, { status: getClassrooms.status });
  }

  if (!getClassrooms.ok) {
    throw json(
      { message: getClassrooms.statusText },
      { status: getClassrooms.status }
    );
  }

  const data = {
    getClassrooms: await getClassrooms.json(),
  };
  return data;
}

export default StudentDashboard;
