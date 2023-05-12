import React, { useEffect } from "react";
import { json, redirect, useNavigate } from "react-router-dom";

import { getAuthToken } from "../../utils/auth";

const Teacher = () => {

  const navigate = useNavigate();

  useEffect(() => {
    navigate("dashboard")
  }, [])

  return (
    <>
      <div>
        <h1>Teacher</h1>
      </div>
    </>
  );
};

export const loader = async () => {
  const token = getAuthToken();

  if (!token) {
    return redirect("/login");
  }

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
