import React, { useEffect } from "react";
import { json, redirect, useNavigate, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "../../scss/pages/teacher/Teacher.module.scss"

import EdugateLoadingAnimation from "../../components/UI/loading/EdugateLoadingAnimation/EdugateLoadingAnimation";

import { getAuthToken } from "../../utils/auth";

const Teacher = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);
  const navigate = useNavigate();

  useEffect(() => {
    !isLoading && navigate("dashboard");
  }, []);

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      <div className={styles["is-loading"]}>
        {isLoading && <EdugateLoadingAnimation themeMode={themeMode} />}
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
