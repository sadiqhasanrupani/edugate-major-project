import React, { useRef, useEffect, useState } from "react";
import { Outlet, useLoaderData, json, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//* styles
import styles from "../../scss/pages/student/Root/StudentRoot.module.scss";

//* utils
import { getAuthToken } from "../../../utils/auth";

//* components
import StudentSideHeader from "../../../components/student/StudentSideHeader.jsx";
import StudentMainNav from "../../../components/student/StudentMainNav.jsx";
import JoinFormPortal from "../../../components/model/FormPortal";
import JoinFormModel from "../../../components/JoinFormModel/JoinFormModel";

//* icons
import DashboardIcon from "../../../components/UI/Icons/Dashboard";
import ClassroomIcon from "../../../components/UI/Icons/ClassroomIcon";
import InviteIcon from "../../../components/UI/Icons/InviteIcon";
import MessageIcon from "../../../components/UI/Icons/MessageIcon";
import VideoIcon from "../../../components/UI/Icons/VideoIcon";
import ScheduleIcon from "../../../components/UI/Icons/ScheduleIcon";

//* icons/Dark
import DarkDashboardIcon from "../../../components/UI/Icons/Dark/DashBoardIcon";
import DarkClassroomIcon from "../../../components/UI/Icons/Dark/ClassroomIcon";
import DarkInviteIcon from "../../../components/UI/Icons/Dark/InviteIcon";
import DarkMessageIcon from "../../../components/UI/Icons/Dark/DarkMessageIcon";
import DarkVideoIcon from "../../../components/UI/Icons/Dark/DarkVideoIcon";
import DarkScheduleIcon from "../../../components/UI/Icons/Dark/DarkScheduleIcon";

//* actions
import { uiAction } from "../../../store/ui-slice";

const StudentRoot = () => {
  //* themeMode coming from ui-slice file
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //* student loader
  const { student } = useLoaderData();

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
      to: "classrooms",
      icon: themeMode ? DarkClassroomIcon : ClassroomIcon,
      text: "Classrooms",
    },
    {
      id: 3,
      to: "messages",
      icon: themeMode ? DarkMessageIcon : MessageIcon,
      text: "Message",
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
      <section className={styles.section}>
        <header className={styles.header}>
          <StudentSideHeader themeMode={themeMode} NAV_ITEMS={NAV_ITEMS} />
        </header>
        <main className={styles.main}>
          <div>
            <StudentMainNav
              themeMode={themeMode}
              message={student.student_first_name}
              teacherData={student}
            />
          </div>
          <div className={styles.Outlet}>
            <Outlet />
          </div>
        </main>
      </section>
    </>
  );
};

export default StudentRoot;
