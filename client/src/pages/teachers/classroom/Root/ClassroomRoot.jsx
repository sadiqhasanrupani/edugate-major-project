import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { json, Outlet, useRouteLoaderData } from "react-router-dom";
import { gsap } from "gsap";

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
import ClassroomMainNav from "../../../../components/teacher/Classrooms/ClassroomMainNav";
import { getAuthToken, verifyToken } from "../../../../utils/auth";
import SubjectForm from "../../../../components/teacher/subject/SubjectForm";
import SubjectFormPortal from "../../../../components/model/Portal";

//* action
import { uiAction } from "../../../../store/ui-slice";

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
    // {
    //   id: 5,
    //   to: "messages",
    //   icon: themeMode ? DarkMessageIcon : MessageIcon,
    //   text: "Messages",
    // },
    // {
    //   id: 6,
    //   to: "schedule",
    //   icon: themeMode ? DarkScheduleIcon : ScheduleIcon,
    //   text: "Schedule",
    // },
    {
      id: 7,
      to: "setting",
      icon: themeMode ? DarkSettingIcon : SettingIcon,
      text: "Settings",
    },
  ];
  const dispatch = useDispatch();

  const isFormPortal = useSelector((state) => state.ui.isSubjectFormActive);

  const { teacherData, classroomData } = useRouteLoaderData(
    "classroom-root-loader"
  );

  //* Teacher Data
  const { teacher } = teacherData;

  //* Student Data
  const { classroomData: classroom } = classroomData;
  const { classroom_name } = classroom;

  const modelTogglerHandler = () => {
    dispatch(uiAction.SubjectFormHandler());
  };

  useEffect(() => {
    gsap.fromTo(
      ".teacher-classroom-side-nav",
      { x: -200 },
      { x: 0, ease: "linear" }
    );
  }, []);

  return (
    <>
      {isFormPortal && (
        <SubjectFormPortal onBackdrop={modelTogglerHandler}>
          <SubjectForm classId={classroom.classroom_id} />
        </SubjectFormPortal>
      )}
      <section className={styles.section}>
        <header className={`teacher-classroom-side-nav ${styles.header}`}>
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
  const classId = await params.classId;

  verifyToken();

  const response1 = await fetch(`${process.env.REACT_APP_HOSTED_URL}/teacher`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (response1.status === 401) {
    return response1;
  }

  if (!response1.ok) {
    throw json({ message: "Something went wrong" }, { status: 500 });
  }

  const response2 = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/classroom/${classId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (!response2.ok) {
    throw json({ message: "Something went wrong" }, { status: 500 });
  }

  if (response2.status === 401) {
    return response2;
  }

  const data = {
    teacherData: await response1.json(),
    classroomData: await response2.json(),
  };

  return data;
};

export default ClassroomRoot;
