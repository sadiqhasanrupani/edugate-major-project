import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { json, Outlet, useRouteLoaderData } from "react-router-dom";

//* styles
import styles from "../../../../scss/pages/teacher/ClassroomDetail.module.scss";

//* light-theme-icons
import DashboardIcon from "../../../../components/UI/Icons/Dashboard";
import TeacherIcon from "../../../../components/UI/Icons/TeacherIcon";
import StudentIcon from "../../../../components/UI/Icons/StudentIcon";
import SubjectIcon from "../../../../components/UI/Icons/BookIcon";
import MessageIcon from "../../../../components/UI/Icons/MessageIcon";
import VideoSessionIcon from "../../../../components/UI/Icons/VideoIcon";
import ScheduleIcon from "../../../../components/UI/Icons/ScheduleIcon";
import SettingIcon from "../../../../components/UI/Icons/SettingsSmallIcon";

//* dark-theme-icons
import DarkDashboardIcon from "../../../../components/UI/Icons/Dark/DashBoardIcon";
import DarkTeacherIcon from "../../../../components/UI/Icons/Dark/DarkTeacherIcon";
import DarkStudentIcon from "../../../../components/UI/Icons/Dark/DarkStudentIcon";
import DarkSubjectIcon from "../../../../components/UI/Icons/Dark/DarkBookIcon";
import DarkMessageIcon from "../../../../components/UI/Icons/Dark/DarkMessageIcon";
import DarkVideoSessionIcon from "../../../../components/UI/Icons/Dark/DarkVideoIcon";
import DarkScheduleIcon from "../../../../components/UI/Icons/Dark/DarkScheduleIcon";
import DarkSettingIcon from "../../../../components/UI/Icons/Dark/DarkSettingSmallIcon";

//* components
import ClassroomSideHeader from "../../../../components/teacher/TeacherSideHeader";
import ClassroomMainNav from "../../../../components/teacher/TeacherMainNav";
import { getAuthToken, verifyToken } from "../../../../utils/auth";

const ClassroomRoot = () => {
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
      to: "overview",
      icon: themeMode ? DarkDashboardIcon : DashboardIcon,
      text: "Overview",
    },
    {
      id: 2,
      to: "subjects",
      icon: themeMode ? DarkSubjectIcon : SubjectIcon,
      text: "Subjects",
    },
    {
      id: 3,
      to: "teachers",
      icon: themeMode ? DarkTeacherIcon : TeacherIcon,
      text: "Teachers",
    },
    {
      id: 4,
      to: "students",
      icon: themeMode ? DarkStudentIcon : StudentIcon,
      text: "Students",
    },
    {
      id: 7,
      to: "messages",
      icon: themeMode ? DarkMessageIcon : MessageIcon,
      text: "Messages",
    },
    {
      id: 5,
      to: "video-sessions",
      icon: themeMode ? DarkVideoSessionIcon : VideoSessionIcon,
      text: "Video Session",
    },
    {
      id: 6,
      to: "schedule",
      icon: themeMode ? DarkScheduleIcon : ScheduleIcon,
      text: "Schedule",
    },
    {
      id: 7,
      to: "setting",
      icon: themeMode ? DarkSettingIcon : SettingIcon,
      text: "Settings",
    },
  ];

  // const { teacher } = useRouteLoaderData("classroom-detail-loader");
  return (
    <>
      <section className={styles.section}>
        <header className={styles.header}>
          <ClassroomSideHeader NAV_ITEMS={NAV_ITEMS} themeMode={themeMode} />
        </header>
        <main className={styles.main}>
          <div>
            {/* <ClassroomMainNav
              themeMode={themeMode}
              message={teacher.teacher_name.split(" ")[0]}
              teacherData={teacher}
            /> */}
          </div>
          <div className={styles.Outlet}>
            <Outlet themeMode={themeMode} />
          </div>
        </main>
      </section>
    </>
  );
};

export const loader = async ({ request, params }) => {
  verifyToken();

  const response = await fetch(`${process.env.REACT_APP_HOSTED_URL}/teacher`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Something went wrong" }, { status: 500 });
  }

  return response;
};

export default ClassroomRoot;
