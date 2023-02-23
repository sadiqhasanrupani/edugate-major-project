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

// styles
import styles from "../../scss/components/teacher/TeacherSideHeader.module.scss";

const NAV_ITEMS = [
  {
    id: 1,
    to: "dashboard",
    icon: DashboardIcon,
    text: "Dashboard",
  },
  {
    id: 2,
    to: "classroom",
    icon: ClassrooomIcon,
    text: "Classrooms",
  },
  {
    id: 3,
    to: "message",
    icon: MessageIcon,
    text: "Message",
  },
  {
    id: 4,
    to: "video-session",
    icon: VideoIcon,
    text: "Video Session",
  },
  {
    id: 5,
    to: "schedule",
    icon: ScheduleIcon,
    text: "Schedule",
  },
];

const TeacherSideHeader = () => {
  const themeMode = JSON.parse(localStorage.getItem("theme"));

  return (
    <>
      <nav className={styles["teacher-side-nav"]}>
        <div className={styles.logo}>
          {themeMode ? (
            <Link to={"/teacher"}>
              <EdugateLogoDark />
            </Link>
          ) : (
            <Link to="/teacher">
              <EdugateLogoLight />
            </Link>
          )}
        </div>
        <h3 className={styles.pages}>PAGES</h3>
        <div className={styles["nav-items"]}>
          {NAV_ITEMS.map((item) => {
            return (
              <Fragment key={item.id}>
                <TeacherNavBtn to={item.to} Icon={item.icon} >
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
