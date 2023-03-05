//* dependencies
import React, { useEffect } from "react";
import { json, Outlet, useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//* styles
import styles from "../../../scss/pages/teacher/join-classroom/JoinClassroomRoot.module.scss";

//* components

//* utils
import { getAuthToken, verifyToken } from "../../../utils/auth";

//* light-theme-icons
import DashboardIcon from "../../../components/UI/Icons/Dashboard";
import TeacherIcon from "../../../components/UI/Icons/TeacherIcon";
import StudentIcon from "../../../components/UI/Icons/StudentIcon";
import SubjectIcon from "../../../components/UI/Icons/BookIcon";
import MessageIcon from "../../../components/UI/Icons/MessageIcon";
import VideoSessionIcon from "../../../components/UI/Icons/VideoIcon";
import ScheduleIcon from "../../../components/UI/Icons/ScheduleIcon";
import SettingIcon from "../../../components/UI/Icons/SettingsSmallIcon";

//* dark-theme-icons
import DarkDashboardIcon from "../../../components/UI/Icons/Dark/DashBoardIcon";
import DarkTeacherIcon from "../../../components/UI/Icons/Dark/DarkTeacherIcon";
import DarkStudentIcon from "../../../components/UI/Icons/Dark/DarkStudentIcon";
import DarkSubjectIcon from "../../../components/UI/Icons/Dark/DarkBookIcon";
import DarkMessageIcon from "../../../components/UI/Icons/Dark/DarkMessageIcon";
import DarkVideoSessionIcon from "../../../components/UI/Icons/Dark/DarkVideoIcon";
import DarkScheduleIcon from "../../../components/UI/Icons/Dark/DarkScheduleIcon";
import DarkSettingIcon from "../../../components/UI/Icons/Dark/DarkSettingSmallIcon";

//* components
import ClassroomSideHeader from "../../../components/teacher/TeacherSideHeader";
import ClassroomMainNav from "../../../components/teacher/Classrooms/ClassroomMainNav";
import SubjectForm from "../../../components/teacher/subject/SubjectForm";
import SubjectFormPortal from "../../../components/model/Portal";

const JoinClassroomRoot = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  useEffect(() => {
    if (themeMode) {
      document.body.className = "dark-theme";
    } else {
      document.body.className = "light-theme";
    }
  }, [themeMode]);

  const dispatch = useDispatch();

  const isFormPortal = useSelector((state) => state.ui.isSubjectFormActive);

  const { joinClassroomData } = useLoaderData();
  //* Teacher Data
  const { teacher } = joinClassroomData;

  //* Student Data
  const { classroom } = joinClassroomData;
  const { classroom_name } = classroom;

  const NAV_ITEMS = [
    {
      id: 1,
      to: `/teacher/join-classroom/${joinClassroomData.join_classroom_id}`,
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
      id: 5,
      to: "messages",
      icon: themeMode ? DarkMessageIcon : MessageIcon,
      text: "Messages",
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

  const modelTogglerHandler = () => {
    dispatch(uiAction.SubjectFormHandler());
  };

  return (
    <>
      {isFormPortal && (
        <SubjectFormPortal onBackdrop={modelTogglerHandler}>
          <SubjectForm classId={classroom.classroom_id} />
        </SubjectFormPortal>
      )}
      <section className={styles.section}>
        <header className={styles.header}>
          <ClassroomSideHeader NAV_ITEMS={NAV_ITEMS} themeMode={themeMode} />
        </header>
        <main className={styles.main}>
          <div>
            <ClassroomMainNav
              themeMode={themeMode}
              message={classroom_name}
              teacherData={teacher}
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

export const loader = async ({ request, params }) => {
  verifyToken();

  const joinClassroomId = params.joinClassroomId;

  const response = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/classroom/get-classroom/${joinClassroomId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (!response.ok) {
    throw new json({ message: "Something went wrong" }, { status: 500 });
  }

  return response;
};

export default JoinClassroomRoot;
