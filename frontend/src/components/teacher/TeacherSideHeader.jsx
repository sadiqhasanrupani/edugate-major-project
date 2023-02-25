import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// logo
import EdugateLogoLight from "../../components/UI/logo/EdugateLightMode";
import EdugateLogoDark from "../../components/UI/logo/EdugateDarkMode";

// components
import TeacherNavBtn from "./NavBtn/TeacherNavBtn";

// icons
import DashboardIcon from "../UI/Icons/Dashboard";
import ClassrooomIcon from "../UI/Icons/ClassroomIcon";
import MessageIcon from "../UI/Icons/MessageIcon";
import VideoIcon from "../UI/Icons/VideoIcon";
import ScheduleIcon from "../UI/Icons/ScheduleIcon";

// icons/Dark
import DarkDashboardIcon from "../UI/Icons/Dark/DashBoardIcon";
import DarkClassroomIcon from "../UI/Icons/Dark/ClassroomIcon";
import DarkMessageIcon from "../UI/Icons/Dark/DarkMessageIcon";
import DarkVideoIcon from "../UI/Icons/Dark/DarkVideoIcon";
import DarkScheduleIcon from "../UI/Icons/Dark/DarkScheduleIcon";

// styles
import styles from "../../scss/components/teacher/TeacherSideHeader.module.scss";

const TeacherSideHeader = ({ themeMode }) => {
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
