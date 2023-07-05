import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { gsap } from "gsap";

//* utils
import { getAuthToken } from "../../../utils/auth";

//* component
import JoinStudents from "../../../components/teacher/Classrooms/JoinStudents.jsx";

const ClassroomStudents = () => {
  const { joinClassData } = useLoaderData();

  useEffect(() => {
    gsap.fromTo(
      ".section",
      { opacity: 0 },
      { opacity: 1, ease: "Linear.easeInOut" }
    );
  });

  return (
    <>
      <section className={`section`}>
        <JoinStudents studentsData={joinClassData} />
      </section>
    </>
  );
};



export const loader = async ({ request, params }) => {
  const classId = await params.classId;

  const response = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/student/get-joined-students/${classId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  return response;
};

export default ClassroomStudents;
