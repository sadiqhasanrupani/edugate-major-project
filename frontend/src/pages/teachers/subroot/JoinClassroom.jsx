import React from "react";
import { redirect } from "react-router-dom";

import { getAuthToken } from "../../../utils/auth";

const JoinClassroom = () => {
  return <div>JoinClassroom</div>;
};

export const loader = ({ request, params }) => {
  const token = getAuthToken();
  if (!token) {
    return redirect("/login");
  }
};

export default JoinClassroom;
