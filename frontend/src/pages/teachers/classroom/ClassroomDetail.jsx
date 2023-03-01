import React from "react";
import { redirect, useLoaderData } from "react-router-dom";

import { getAuthToken } from "../../../utils/auth";

const ClassroomDetail = () => {
  const data = useLoaderData();

  return <div>{data}</div>;
};

export const loader = async ({ request, params }) => {
  const token = getAuthToken();

  if (!token) {
    return redirect("/login");
  }

  const classId = await params.classId;

  return classId;
};

export default ClassroomDetail;
