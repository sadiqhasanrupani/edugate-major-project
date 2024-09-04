//^ dependencies
import React, { useEffect } from "react";
import { json, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

//^ styles
import styles from "../../../scss/pages/teacher/classrooms/ClassroomSettings.module.scss";

//^ auth
import { getAuthToken } from "../../../utils/auth";

//^ components
import TeacherClassroomSetting from "../../../components/teacher/Classrooms/subroot/TeacherClassroomSetting/TeacherClassroomSetting";

const ClassroomSettings = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ loader's data
  const { getClassroomData } = useLoaderData();
  const { classroomData } = getClassroomData;

  //^ transition useEffect
  useEffect(() => {
    gsap.fromTo(
      ".classroom-settings-section",
      { x: 1000 },
      { x: 0, ease: "power4" }
    );
  }, []);

  return (
    <section
      className={`classroom-settings-section ${styles.section} ${
        themeMode && styles.dark
      }`}
    >
      <TeacherClassroomSetting
        themeMode={themeMode}
        classroomData={classroomData}
      />
    </section>
  );
};

export const loader = async ({ request, params }) => {
  const classroomId = params.classId;

  const getClassroomData = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/classroom/${classroomId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (getClassroomData.status === 401 || getClassroomData.status === 403) {
    const response = await getClassroomData.json();

    throw json(
      { message: response.message },
      { status: getClassroomData.status }
    );
  }

  if (!getClassroomData.ok) {
    const response = await getClassroomData.json();

    throw json(
      { message: response.message },
      { status: getClassroomData.status }
    );
  }

  const data = {
    getClassroomData: await getClassroomData.json(),
  };

  return data;
};

export default ClassroomSettings;
