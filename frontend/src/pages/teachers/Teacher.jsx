import React from "react";
import { json, useLoaderData } from "react-router-dom";

import { getAuthToken } from "../../utils/auth";

const Teacher = () => {
  const data = useLoaderData();

  return (
    <>
      <div>
        <h1>{data.message}</h1>
      </div>
    </>
  );
};

export const loader = async () => {
  const token = getAuthToken();

  const response = await fetch(`${process.env.REACT_APP_HOSTED_URL}/teacher`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw json({ message: "Cannot find the page" }, { status: 404 });
  }

  return response;
};

export default Teacher;
