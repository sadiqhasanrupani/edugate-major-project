import React, { useState } from "react";
import { json, redirect, useLoaderData } from "react-router-dom";
import { io } from "socket.io-client";
import NotificationSound from "../../../assets/audio/notification_sound.mp3";

//* auth
import { getAuthToken } from "../../../utils/auth";

const TeacherNotification = () => {
  const data = useLoaderData();
  // console.log(data);

  const [adminId, setAdminId] = useState(data.response2.teacher.teacher_id);

  const socket = io(process.env.REACT_APP_HOSTED_URL);

  socket.off("invitation-received").on("invitation-received", (data) => {
    if (adminId === data.receiver.teacher_id) {
      console.log(data);
      const audio = new Audio(NotificationSound);
      audio.play();
    }
  });

  // console.log(adminId);

  return <h1>Notification</h1>;
};

export const loader = async ({ request, params }) => {
  if (!getAuthToken()) {
    return redirect("/login");
  }

  const response1 = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/notification/get-teacher-invitation`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (response1.status === 401) {
    return response1;
  }

  if (!response1.ok) {
    throw json({ message: response1.statusText }, { status: 500 });
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
    response1: await response1.json(),
    response2: await response2.json(),
  };

  return data;
};

export default TeacherNotification;
