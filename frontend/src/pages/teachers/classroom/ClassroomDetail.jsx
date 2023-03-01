import React from "react";
import { json, redirect, useLoaderData } from "react-router-dom";

import { getAuthToken } from "../../../utils/auth";

const ClassroomDetail = () => {
  const { classroomData } = useLoaderData();
  // console.log(classroomData);
  return <div>{classroomData.classroom_code}</div>;
};

export const loader = async ({ request, params }) => {
  const classId = await params.classId;
  const token = getAuthToken();

  if (!token) {
    return redirect("/login");
  }

  const response = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/classroom/${classId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw json({ message: "Something went wrong" }, { status: 500 });
  }

  if (response.status === 401) {
    return response;
  }

  return response;
};

export default ClassroomDetail;
