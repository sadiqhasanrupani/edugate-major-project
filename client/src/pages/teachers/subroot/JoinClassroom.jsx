import React, { useEffect } from "react";
import { json as Json, redirect, useActionData } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getAuthToken } from "../../../utils/auth";

//* action
import { uiAction } from "../../../store/ui-slice";

const JoinClassroom = () => {
  const data = useActionData();
  // console.log(data);

  // const dispatch = useDispatch();

  // const actionData = data && data.errorMessage;

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     dispatch(uiAction.joinClassroomFormHandler());
  //   }, 2000);

  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [data && data.errorMessage]);

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
};

export default JoinClassroom;
