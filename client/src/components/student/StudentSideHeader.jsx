import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//^ styles
import styles from "../../scss/components/student/StudentSideHeader.module.scss";

//^ logo
import EdugateLogoLight from "../../components/UI/logo/EdugateLightMode";
import EdugateLogoDark from "../../components/UI/logo/EdugateDarkMode";

//^ components
import StudentNavBtn from "./NavBtn/StudentNavBtn.jsx";

const StudentSideHeader = ({ NAV_ITEMS }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);
  return (
    <>
      <nav
        className={`${styles["student-side-nav"]} ${
          themeMode ? styles["dark-side-nav"] : undefined
        }`}
      >
        <div className={styles.logo}>
          {themeMode ? (
            <Link to={"/student/dashboard"}>
              <EdugateLogoDark />
            </Link>
          ) : (
            <Link to="/student/dashboard">
              <EdugateLogoLight />
            </Link>
          )}
        </div>
        <h3 className={styles.pages}>PAGES</h3>
        <div className={styles["nav-items"]}>
          {NAV_ITEMS.map((item) => {
            return (
              <Fragment key={item.id}>
                <StudentNavBtn
                  to={item.to}
                  Icon={item.icon}
                  themeMode={themeMode}
                >
                  {item.text}
                </StudentNavBtn>
              </Fragment>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default StudentSideHeader;
