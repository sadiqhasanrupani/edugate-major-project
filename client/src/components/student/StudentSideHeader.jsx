import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

//^ styles
import styles from "../../scss/components/student/StudentSideHeader.module.scss";

//^ logo
import EdugateLogoLight from "../../components/UI/logo/EdugateLightMode";
import EdugateLogoDark from "../../components/UI/logo/EdugateDarkMode";

//^ components
import StudentNavBtn from "./NavBtn/StudentNavBtn.jsx";

const StudentSideHeader = ({ NAV_ITEMS, className }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  useEffect(() => {
    gsap.fromTo(`.student-nav-bar`, { x: -200 }, { x: 0, ease: "power4" });
  }, []);

  return (
    <>
      <nav
        className={`student-nav-bar ${styles["student-side-nav"]} ${
          themeMode ? styles["dark-side-nav"] : undefined
        } ${className}`}
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
