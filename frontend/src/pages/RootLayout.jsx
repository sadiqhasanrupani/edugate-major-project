import { Outlet } from "react-router-dom";

// components
import MainHeader from "../components/main/MainHeader";
import MainFooter from "../components/main/MainFooter";

const RootLayout = () => {
  return (
    <>
      <MainHeader />
      <Outlet />
      <MainFooter />
    </>
  )
}

export default RootLayout;