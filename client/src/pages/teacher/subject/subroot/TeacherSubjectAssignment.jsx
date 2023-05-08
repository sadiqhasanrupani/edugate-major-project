import React from "react";
import { json } from "react-router-dom";

//^ auth
import { getAuthToken } from "../../../../utils/auth";

const TeacherSubjectAssignment = () => {
  return <div>TeacherSubjectAssignment</div>;
};

export const loader = async ({ request, params }) => {
  const { assignmentId } = await params;

  const getAssignment = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/assignment/get-assignment/${assignmentId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (getAssignment.status == 401) {
    const response = await getAssignment.json();

    throw json({ message: response.message }, { status: getAssignment.status });
  }

  if (!getAssignment.ok) {
    throw json(
      { message: getAssignment.statusText },
      { status: getAssignment.status }
    );
  }

  return getAssignment;
};

export default TeacherSubjectAssignment;
