import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// logo
import EdugateLogoLight from "../../components/UI/logo/EdugateLightMode";
import EdugateLogoDark from "../../components/UI/logo/EdugateDarkMode";

// components
import TeacherNavBtn from "./NavBtn/TeacherNavBtn";

// styles
import styles from "../../scss/components/teacher/TeacherSideHeader.module.scss";

const TeacherSideHeader = ({ themeMode, NAV_ITEMS}) => {
  

  return (
    <>
      <nav
        className={`${styles["teacher-side-nav"]} ${
          themeMode ? styles["dark-side-nav"] : undefined
        }`}
      >
        <div className={styles.logo}>
          {themeMode ? (
            <Link to={"/teacher/dashboard"}>
              <EdugateLogoDark />
            </Link>
          ) : (
            <Link to="/teacher/dashboard">
              <EdugateLogoLight />
            </Link>
          )}
        </div>
        <h3 className={styles.pages}>PAGES</h3>
        <div className={styles["nav-items"]}>
          {NAV_ITEMS.map((item) => {
            return (
              <Fragment key={item.id}>
                <TeacherNavBtn
                  to={item.to}
                  Icon={item.icon}
                  themeMode={themeMode}
                >
                  {item.text}
                </TeacherNavBtn>
              </Fragment>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default TeacherSideHeader;
