import React, { useEffect } from "react";
import { json as Json, redirect, useActionData } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getAuthToken } from "../../../utils/auth";

//* action
import { uiAction } from "../../../store/ui-slice";

const JoinClassroom = () => {
  const data = useActionData();
  console.log(data);

  const dispatch = useDispatch();

  const actionData = data && data.errorMessage;

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(uiAction.joinClassroomFormHandler());
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [actionData]);

  return (
    <div align="center">
      {data && data.errorMessage && <h1>{data.errorMessage} </h1>}
    </div>
  );
};

export const loader = ({ request, params }) => {
  const token = getAuthToken();
  if (!token) {
    return redirect("/login");
  }

  return null;
};

export const action = async ({ request, params }) => {
  const data = await request.formData();

  const JoinClassroomData = {
    classCode: data.get("class-code"),
  };

  const response = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/classroom/join-classroom-as-teacher`,
    {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(JoinClassroomData),
    }
  );

  if (response.status === 401 || response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw Json({ message: "Something went wrong" }, { status: 500 });
  }

  const resData = await response.json();

  return redirect(`/teacher/classroom/${resData.joinClassroom.classroom_id}`);
};

export default JoinClassroom;
