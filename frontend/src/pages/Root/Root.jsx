import { useEffect } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// components
import MainHeader from "../../components/main/MainHeader";
import MainFooter from "../../components/main/MainFooter";

// token
import { getAuthToken } from "../../utils/auth";

const RootLayout = () => {
  const { role } = useLoaderData();
  console.log(role);
  const navigate = useNavigate();

  const isDarkMode = useSelector((state) => state.ui.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.body.className = "dark-theme";
    } else {
      document.body.className = "light-theme";
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (role === "teacher") {
      navigate("/teacher/dashboard");
    } else if (role === "student") {
      navigate("/student/dashboard");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <MainHeader />
      <Outlet />
      <MainFooter />
    </>
  );
};

export const loader = async () => {
  const token = getAuthToken();

  const response = await fetch(`${process.env.REACT_APP_HOSTED_URL}/get-role`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export default RootLayout;
