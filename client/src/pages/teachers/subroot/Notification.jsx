import React, { useState } from "react";
import { json, redirect } from "react-router-dom";
// import NotificationSound from "../../../assets/audio/notification_sound.mp3";

//* auth
import { getAuthToken } from "../../../utils/auth";

const TeacherNotification = () => {
  // const { getNotifications } = useLoaderData();
  // console.log(getNotifications);

  return <h1>Notification</h1>;
};

export const loader = async ({ request, params }) => {
  if (!getAuthToken()) {
    return redirect("/login");
  }

  const getNotifications = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/notification/get-teacher-notifications`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    },
  );

  if (getNotifications.status === 401) {
    return getNotifications;
  }

  if (!getNotifications.ok) {
    // console.log(await getNotifications.json());
    throw json({ message: getNotifications.statusText }, { status: 500 });
  }

  const response2 = await fetch(`${process.env.REACT_APP_HOSTED_URL}/teacher`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (!response2.ok) {
    throw json({ message: response2.statusText }, { status: 500 });
  }

  const data = {
    getNotifications: await getNotifications.json(),
    response2: await response2.json(),
  };

  return data;
};

export default TeacherNotification;
