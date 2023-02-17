import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

// components
import MainHeader from "../../components/main/MainHeader";
import MainFooter from "../../components/main/MainFooter";

const RootLayout = () => {
  const isDarkMode = useSelector(state => state.ui.isDarkMode);
  useEffect(() => {
    if (isDarkMode) {
      document.body.className = "dark-theme";
    } else {
      document.body.className = "light-theme";
    }
  }, [isDarkMode]);

  return (
    <>
      <MainHeader />
      <Outlet />
      <MainFooter />
    </>
  );
};

export default RootLayout;
