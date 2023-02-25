import React, { useEffect } from "react";
import { Outlet, useRouteLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "../../scss/pages/teacher/TeacherRoot.module.scss";

import TeacherSideHeader from "../../components/teacher/TeacherSideHeader";
import TeacherMainNav from "../../components/teacher/TeacherMainNav";

const TeacherRoot = () => {
  const { user } = useRouteLoaderData("teacher-loader");

  const themeMode = useSelector((state) => state.ui.isDarkMode);

  useEffect(() => {
    if (themeMode) {
      document.body.className = "dark-theme";
    } else {
      document.body.className = "light-theme";
    }
  }, [themeMode]);

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <TeacherSideHeader themeMode={themeMode} />
      </header>
      <main>
        <div>
          <TeacherMainNav
            themeMode={themeMode}
            message={user.userName.split(" ")[0]}
          />
        </div>
        <div className={styles.Outlet} >
          <Outlet themeMode={themeMode} />
        </div>
      </main>
    </section>
  );
};

export default TeacherRoot;
