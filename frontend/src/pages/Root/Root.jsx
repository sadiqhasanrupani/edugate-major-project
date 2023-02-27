import { useEffect } from "react";
import {
  Outlet,
  Navigation,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useSelector } from "react-redux";

// components
import MainHeader from "../../components/main/MainHeader";
import MainFooter from "../../components/main/MainFooter";

// token
import { getAuthToken } from "../../utils/auth";

const RootLayout = () => {
  const { role } = useLoaderData();

  const navigate = useNavigate();

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const isDarkMode = useSelector((state) => state.ui.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.body.className = "dark-theme";
    } else {
      document.body.className = "light-theme";
    }
  }, [isDarkMode]);

  useEffect(() => {
    const token = getAuthToken();

    if (token) {
      if (role === "teacher") {
        navigate("/teacher/dashboard");
      } else if (role === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/");
      }
    }
  }, []);

  return (
    <>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <MainHeader />
          <Outlet />
          <MainFooter />
        </>
      )}
    </>
  );
};

export const loader = async () => {
  const token = getAuthToken();

  if (token) {
    const response = await fetch(
      `${process.env.REACT_APP_HOSTED_URL}/get-role`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  }

  return 0;
};

export default RootLayout;
