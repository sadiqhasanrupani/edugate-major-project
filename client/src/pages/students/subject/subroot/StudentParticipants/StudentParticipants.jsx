import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { json, useLoaderData } from "react-router-dom";
import { gsap } from "gsap";

import styles from "../../../../../scss/pages/student/subject/subroot/StudentParticipants.module.scss";

import { getAuthToken } from "../../../../../utils/auth";

import SubjectParticipants from "../../../../../components/student/subject/subroot/SubjectParticipants/SubjectParticipants.jsx";

const StudentParticipants = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  const { getParticipants } = useLoaderData();
  const { teachersData, studentsData } = getParticipants;

  useEffect(() => {
    gsap.fromTo(
      ".student-participants-section",
      { x: 1000 },
      { x: 0, ease: "power4" }
    );
  }, []);

  return (
    <section
      className={`student-participants-section ${styles["section"]} ${
        themeMode && styles.dark
      }`}
    >
      <SubjectParticipants
        themeMode={themeMode}
        students={studentsData}
        teachers={teachersData}
      />
    </section>
  );
};

export const loader = async ({ request, params }) => {
  const { joinSubjectId } = params;

  const getParticipants = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/join-subject/get-participants-for-students/${joinSubjectId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (getParticipants.status === 401 || getParticipants.status === 403) {
    const response = await getParticipants.json();
    console.log(response);

    throw json(
      { message: response.message },
      { status: getParticipants.status }
    );
  }

  if (!getParticipants.ok) {
    console.log(await getParticipants.json());

    throw json(
      { message: "Internal server error" },
      { status: getParticipants.status }
    );
  }

  const data = {
    getParticipants: await getParticipants.json(),
  };

  return data;
};

export default StudentParticipants;
