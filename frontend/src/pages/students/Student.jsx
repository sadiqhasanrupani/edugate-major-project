import React from "react";
import { json, redirect, useLoaderData } from "react-router-dom";

import { getAuthToken } from "../../utils/auth";

const Student = () => {
  const { student } = useLoaderData();

  return (
    <>
      <div>
        <h1>{student.student_name}</h1>
      </div>
    </>
  );
};

export const loader = async () => {
  const token = getAuthToken();

  if (!token) {
    return redirect("/login");
  }

  const response = await fetch(`${process.env.REACT_APP_HOSTED_URL}/student`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw json({ message: "Cannot find the page" }, { status: 404 });
  }

  return response;
};

export default Student;
