import React from "react";
import { Outlet, useRouteLoaderData } from "react-router-dom";

import styles from "../../scss/pages/teacher/TeacherRoot.module.scss";

import TeacherSideHeader from "../../components/teacher/TeacherSideHeader";
import TeacherMainNav from "../../components/teacher/TeacherMainNav";

const TeacherRoot = () => {
  const { user } = useRouteLoaderData("teacher-loader");

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <TeacherSideHeader />
      </header>
      <main>
        <div>
          <TeacherMainNav message={user.userName.split(" ")[0]}/>
        </div>
        <div>
          <Outlet />
        </div>
      </main>
    </section>
  );
};

export default TeacherRoot;
