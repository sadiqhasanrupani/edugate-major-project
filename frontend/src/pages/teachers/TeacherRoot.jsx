import React, { useEffect } from "react";
import { Outlet, useRouteLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "../../scss/pages/teacher/TeacherRoot.module.scss";

//* components
import TeacherSideHeader from "../../components/teacher/TeacherSideHeader";
import TeacherMainNav from "../../components/teacher/TeacherMainNav";
import JoinFormPortal from "../../components/model/FormPortal";
import JoinFormModel from "../../components/JoinFormModel/JoinFormModel";

//* icons
import DashboardIcon from "../../components/UI/Icons/Dashboard";
import ClassrooomIcon from "../../components/UI/Icons/ClassroomIcon";
import MessageIcon from "../../components/UI/Icons/MessageIcon";
import VideoIcon from "../../components/UI/Icons/VideoIcon";
import ScheduleIcon from "../../components/UI/Icons/ScheduleIcon";

//* icons/Dark
import DarkDashboardIcon from "../../components/UI/Icons/Dark/DashBoardIcon";
import DarkClassroomIcon from "../../components/UI/Icons/Dark/ClassroomIcon";
import DarkMessageIcon from "../../components/UI/Icons/Dark/DarkMessageIcon";
import DarkVideoIcon from "../../components/UI/Icons/Dark/DarkVideoIcon";
import DarkScheduleIcon from "../../components/UI/Icons/Dark/DarkScheduleIcon";

//* actions
import { uiAction } from "../../store/ui-slice";

const TeacherRoot = () => {
  const { teacher } = useRouteLoaderData("teacher-loader");

  const themeMode = useSelector((state) => state.ui.isDarkMode);

  useEffect(() => {
    if (themeMode) {
      document.body.className = "dark-theme";
    } else {
      document.body.className = "light-theme";
    }
  }, [themeMode]);

  const NAV_ITEMS = [
    {
      id: 1,
      to: "dashboard",
      icon: themeMode ? DarkDashboardIcon : DashboardIcon,
      text: "Dashboard",
    },
    {
      id: 2,
      to: "classroom",
      icon: themeMode ? DarkClassroomIcon : ClassrooomIcon,
      text: "Classrooms",
    },
    {
      id: 3,
      to: "message",
      icon: themeMode ? DarkMessageIcon : MessageIcon,
      text: "Message",
    },
    {
      id: 4,
      to: "video-session",
      icon: themeMode ? DarkVideoIcon : VideoIcon,
      text: "Video Session",
    },
    {
      id: 5,
      to: "schedule",
      icon: themeMode ? DarkScheduleIcon : ScheduleIcon,
      text: "Schedule",
    },
  ];

  const dispatch = useDispatch();

  const isJoinClassroomActive = useSelector(
    (state) => state.ui.isJoinClassroomActive
  );

  const joinFormToggler = () => {
    dispatch(uiAction.joinClassroomFormHandler());
  };

  return (
    <>
      {isJoinClassroomActive && (
        <JoinFormPortal
          modelTitle={"Join Classroom"}
          method={"POST"}
          action={"/teacher/join-classroom"}
          buttonOnClick={joinFormToggler}
          onBackdrop={joinFormToggler}
          formOnSubmit={joinFormToggler}
        >
          <JoinFormModel />
        </JoinFormPortal>
      )}
      <section className={styles.section}>
        <header className={styles.header}>
          <TeacherSideHeader themeMode={themeMode} NAV_ITEMS={NAV_ITEMS} />
        </header>
        <main className={styles.main}>
          <div>
            <TeacherMainNav
              themeMode={themeMode}
              message={teacher.teacher_name.split(" ")[0]}
              teacherData={teacher}
            />
          </div>
          <div className={styles.Outlet}>
            <Outlet themeMode={themeMode} />
          </div>
        </main>
      </section>
    </>
  );
};

export default TeacherRoot;
