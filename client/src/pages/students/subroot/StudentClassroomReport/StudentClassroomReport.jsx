import React, { useEffect } from "react";
import { useLoaderData, json } from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

import { getAuthToken } from "../../../../utils/auth";

import StudentSubjects from "./StudentSubjects/StudentSubjects";

const StudentClassroomReport = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  const { getJoinedSubjects } = useLoaderData();
  const { compulsorySubjects, optionalSubjects } = getJoinedSubjects;

  useEffect(() => {
    gsap.fromTo(
      ".student-subjects-section",
      { x: 1000 },
      { x: 0, ease: "power4" }
    );
  }, []);

  return (
    <section className={`student-subjects-section`}>
      <StudentSubjects
        themeMode={themeMode}
        compulsorySubjectsData={compulsorySubjects}
        optionalsSubjectsData={optionalSubjects}
      />
    </section>
  );
};

export async function loader({ params }) {
  const joinClassroomId = params.joinClassroomId;

  const getOptionalSubject = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/optional-subject/for-student/${joinClassroomId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (!getOptionalSubject.ok) {
    throw json({ message: getOptionalSubject.statusText }, { status: 500 });
  }

  const getJoinedSubjects = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/join-subject/get-joined-subjects-for-student/${joinClassroomId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (getJoinedSubjects.status === 401) {
    const badResponse = await getJoinedSubjects.json();

    throw json({ message: badResponse.message }, { status: 500 });
  }

  if (!getJoinedSubjects.ok) {
    throw json(
      { message: getJoinedSubjects.statusText },
      { status: getJoinedSubjects.status }
    );
  }

  const data = {
    getOptionalSubject: await getOptionalSubject.json(),
    getJoinedSubjects: await getJoinedSubjects.json(),
  };

  return data;
}

export default StudentClassroomReport;
