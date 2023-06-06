// dependencies
import React, { useEffect, useState } from "react";
import { json, useNavigation, useRouteLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

// styles
import styles from "../../../scss/pages/teacher/subroot/Classroom.module.scss";

// token
import { getAuthToken, verifyToken } from "../../../utils/auth";

// components
import AdminClassroom from "../../../components/teacher/Classrooms/AdminClassrooms";
import JoinedClassroom from "../../../components/teacher/Classrooms/JoinedClassrooms";
import EdugateLoadingAnimation from "../../../components/UI/loading/EdugateLoadingAnimation/EdugateLoadingAnimation";

const Classroom = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  //^ Animation useEffect
  useEffect(() => {
    !isLoading &&
      gsap.fromTo(".main", { x: 1000 }, { x: 0, ease: "power4" });
  }, []);

  const data = useRouteLoaderData("classroom-loader");
  let adminTeacherData;
  let joinedTeacherData;

  if (data && data.joinedClassrooms && data.teacherClassrooms) {
    adminTeacherData = data.teacherClassrooms;
    joinedTeacherData = data.joinedClassrooms.joinedClassrooms;
  }

  return (
    <>
      {isLoading ? (
        <div className={styles["loading"]}>
          <EdugateLoadingAnimation themeMode={themeMode} />
        </div>
      ) : (
        <main className={`main ${styles.main}`}>
          <AdminClassroom classroomData={adminTeacherData} />
          <JoinedClassroom
            classroomsData={data.joinedClassrooms.joinedClassrooms}
          />
        </main>
      )}
    </>
  );
};

export const loader = async ({ request, params }) => {
  verifyToken();

  const response1 = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/classroom/getAdminClasses`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (response1.status === 401) {
    return response1;
  }

  if (!response1.ok) {
    console.log(await response1.json());
    throw json({ message: "Something went wrong" }, { status: 500 });
  }

  const response2 = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/classroom/getJoinedClassesForTeacher`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (response2.status === 401) {
    return response2;
  }

  if (!response2.ok) {
    throw json({ message: "Something went wrong" }, { status: 500 });
  }

  const resData1 = await response1.json();
  const resData2 = await response2.json();

  const data = {
    teacherClassrooms: resData1,
    joinedClassrooms: resData2,
  };

  return data;
};

export default Classroom;
