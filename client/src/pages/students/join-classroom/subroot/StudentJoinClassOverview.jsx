import React, { useEffect } from "react";
import { json, redirect, useLoaderData } from "react-router-dom";
import { gsap } from "gsap";

//^ styles
import styles from "../../../../scss/pages/students/join-classroom/StudentJoinClassOverview.module.scss";

//^ components
import StudentJoinClassProfile from "../../../../components/student/join-classroom/StudentJoinClassProfile";

//^ Auth
import { getAuthToken } from "../../../../utils/auth";

const StudentJoinClassOverview = () => {
  const { classData: joinClassroomData } = useLoaderData();

  //^ Animation useEffect
  useEffect(() => {
    gsap.fromTo(
      `.student-join-classroom-dashboard`,
      { opacity: 0 },
      { opacity: 1, ease: "linear" }
    );
  }, []);

  return (
    <section className={`student-join-classroom-dashboard`}>
      <header className={styles["classroom-profile"]}>
        <StudentJoinClassProfile
          bannerImg={joinClassroomData.classroom_banner_img}
          profileImg={joinClassroomData.classroom_profile_img}
          classroomName={joinClassroomData.classroom_name}
        />
      </header>
    </section>
  );
};

export const loader = async ({ request, params }) => {
  if (!getAuthToken()) {
    return redirect("/login");
  }

  const getStudentJoinClassroom = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/joinClassroom/${params.joinClassId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (!getStudentJoinClassroom.ok) {
    throw json({ message: "Internal Server Error" }, { status: 500 });
  }

  return getStudentJoinClassroom;
};

export default StudentJoinClassOverview;
