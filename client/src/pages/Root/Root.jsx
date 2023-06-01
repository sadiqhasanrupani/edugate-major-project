import { useEffect } from "react";
import {
  Outlet,
  Navigation,
  useLoaderData,
  useNavigate,
  useNavigation,
  ScrollRestoration,
} from "react-router-dom";
import { useSelector } from "react-redux";

//^ styles
import styles from "../../scss/pages/Root.module.scss";

// components
import MainHeader from "../../components/main/MainHeader";
import MainFooter from "../../components/main/MainFooter";
import EdugateLoadingAnimation from "../../components/UI/loading/EdugateLoadingAnimation/EdugateLoadingAnimation.jsx";

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
        navigate("/student/classrooms");
      } else {
        navigate("/");
      }
    }
  }, []);

  return (
    <>
      <ScrollRestoration
        getKey={(location, matches) => {
          // default behavior
          return location.key;
        }}
      />
      {isLoading ? (
        <div className={styles['loading-animation']}>
          <EdugateLoadingAnimation themeMode={isDarkMode} />
        </div>
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
