//^ dependencies
import React, { useEffect } from "react";
import { useLoaderData, json } from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

//^ styles
import styles from "./EditClassroom.module.scss";

//^ auth
import { getAuthToken } from "../../../../utils/auth";

//^ components
import TeacherEditClassroom from "../../../../components/teacher/Classrooms/subroot/TeacherEditClassroom/TeacherEditClassroom";

const EditClassroom = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ getting route loader data
  const { getClassroomData } = useLoaderData();
  const { classroomData } = getClassroomData;

  useEffect(() => {
    gsap.fromTo(
      ".edit-classroom-section",
      { x: 1000 },
      { x: 0, ease: "power4" }
    );
  }, []);

  return (
    <section
      className={`edit-classroom-section ${styles.section} ${
        themeMode && styles.dark
      }`}
    >
      <TeacherEditClassroom classroomData={classroomData} themeMode={themeMode} />
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

export default EditClassroom;
