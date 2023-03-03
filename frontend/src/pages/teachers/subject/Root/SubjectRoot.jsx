import React from "react";
import { json, useLoaderData } from "react-router-dom";

//* auth
import { getAuthToken } from "../../../../utils/auth";

const SubjectRoot = () => {
  const data = useLoaderData();

  return <h1>{data.subject.subject_name}</h1>;
};

export const loader = async ({ request, params }) => {
  const subjectId = params.subjectId;

  const response = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/subject/${subjectId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (!response.ok) {
    throw json({ message: "Something went wrong" }, { status: 5000 });
  }
  return response;
};

export default SubjectRoot;
