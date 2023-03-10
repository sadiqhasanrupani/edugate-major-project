import React from "react";
import { useLoaderData } from "react-router-dom";

//* utils
import { getAuthToken } from "../../../utils/auth";

const ClassroomStudents = () => {
  const { joinClassData } = useLoaderData();

  return (
    <>
      <section>
        <JoinStudents studentsData={joinClassData} />
      </section>
    </>
  );
};

//* component
import JoinStudents from "../../../components/teacher/Classrooms/JoinStudents.jsx";

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
