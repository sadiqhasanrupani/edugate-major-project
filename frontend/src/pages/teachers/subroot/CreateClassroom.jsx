import React from "react";
import { json, redirect, useActionData } from "react-router-dom";

import styles from "../../../scss/pages/teacher/CreateInstitute.module.scss";

// components
import ClassroomForm from "../../../components/teacher/CreateInstitute/ClassroomForm";

import { getAuthToken } from "../../../utils/auth";

const CreateInstitute = () => {
  const data = useActionData();
  console.log(data);

  return (
    <>
      <section className={styles.section}>
        <ClassroomForm />
      </section>
    </>
  );
};

export const loader = async ({ request, params }) => {
  const token = getAuthToken();

  if (!token) {
    return redirect("/login");
  }
  return null;
};

export const action = async ({ request, param }) => {
  const data = await request.formData();

  const token = getAuthToken();

  const formData = new FormData();
  formData.append("classroomBackgroundImg", data.get("classroom-background"));
  formData.append("classroomProfileImg", data.get("classroom-profile-img"));
  formData.append("classroomName", data.get("classroom-name"));
  formData.append("classroomCategory", data.get("classroom-category"));

  const url = `${process.env.REACT_APP_HOSTED_URL}/classroom/create-classroom`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (response.status === 422) {
    const resData = await response.json();
    console.log(resData);
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Something went wrong" }, { status: 500 });
  }

  const resData = await response.json();
  const { classId } = resData;

  return redirect(`/teacher/classroom/${classId}`);
};

export default CreateInstitute;
