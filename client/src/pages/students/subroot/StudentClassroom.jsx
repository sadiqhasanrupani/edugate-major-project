import React, { useEffect } from "react";
import { json, redirect, useLoaderData } from "react-router-dom";
import { gsap } from "gsap";

//^ components
import StudentJoinClassroom from "../../../components/student/subroot/StudentJoinClassroom.jsx";

//^ auth
import { getAuthToken } from "../../../utils/auth.js";

const StudentClassroom = () => {
  const { joinClassroomData } = useLoaderData();

  useEffect(() => {
    gsap.fromTo(".student-join-classroom", { opacity: 0 }, { opacity: 1 });
  }, []);

  return (
    <>
      <section className={`student-join-classroom`}>
        <StudentJoinClassroom data={joinClassroomData} />
      </section>
    </>
  );
};

export const loader = async () => {
  if (!getAuthToken()) {
    return redirect("/login");
  }

  const getJcAsStudent = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/get-join-classroom-as-student`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (!getJcAsStudent.ok) {
    throw json({ message: "Internal Server Error" }).status(500);
  }

  return getJcAsStudent;
};

export default StudentClassroom;
