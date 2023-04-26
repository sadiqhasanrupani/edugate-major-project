import React, { useRef, useEffect, useState } from "react";
import {
  Outlet,
  json,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//* styles
import styles from "../../../scss/pages/student/Root/StudentRoot.module.scss";

//* components
import StudentSideHeader from "../../../../components/student/StudentSideHeader";
import StudentJoinClassMainNav from "../../../../components/student/join-classroom/StudentJoinClassMainNav";
import BreadCrumb from "../../../../components/UX/BreadCrumb/BreadCrumb";

//* icons
import DashboardIcon from "../../../../components/UI/Icons/Dashboard";
import SubjectIcon from "../../../../components/UI/Icons/BookIcon";
import PeopleIcon from "../../../../components/UI/Icons/TeacherIcon";
import SettingsIcon from "../../../../components/UI/Icons/SettingsSmallIcon";

//* icons/Dark
import DarkDashboardIcon from "../../../../components/UI/Icons/Dark/DashBoardIcon";
import DarkSubjectIcon from "../../../../components/UI/Icons/Dark/DarkBookIcon";
import DarkPeopleIcon from "../../../../components/UI/Icons/Dark/DarkTeacherIcon";
import DarkSettingIcon from "../../../../components/UI/Icons/Dark/DarkSettingSmallIcon";

//* actions
import { uiAction } from "../../../../store/ui-slice";

//* utils
import { getAuthToken } from "../../../../utils/auth";

const StudentJoinClassRoot = () => {
  //* themeMode coming from ui-slice file
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ Loader Data
  const { joinClassData, studentData } = useLoaderData();

  const { classData } = joinClassData;
  const { student } = studentData;

  //* dispatch func,
  const dispatch = useDispatch();

  //* use ref
  const ref = useRef({});

  //^ navigate func
  const navigate = useNavigate();

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
      to: "subject",
      icon: themeMode ? DarkSubjectIcon : SubjectIcon,
      text: "Subjects",
    },
    {
      id: 3,
      to: "peoples",
      icon: themeMode ? DarkPeopleIcon : PeopleIcon,
      text: "Peoples",
    },
    {
      id: 6,
      to: "settings",
      icon: themeMode ? DarkSettingIcon : SettingsIcon,
      text: "Settings",
    },
  ];

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <StudentSideHeader themeMode={themeMode} NAV_ITEMS={NAV_ITEMS} />
      </header>
      <main className={styles.main}>
        <div>
          <StudentJoinClassMainNav
            themeMode={themeMode}
            classroomName={classData.classroom_name}
            studentData={student}
          />
        </div>
        <div className={styles.Outlet}>
          <BreadCrumb />
          <Outlet />
        </div>
      </main>
    </section>
  );
};

export const loader = async ({ request, params }) => {
  if (!getAuthToken()) {
    return redirect("/login");
  }

  const joinClassId = params.joinClassId;

  //^ Fetch request to get the join-classroom data.
  const getJoinClassData = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/joinClassroom/${joinClassId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  //^ Fetch request to get the student data.
  const getStudentData = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/student`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (!(getJoinClassData.ok && getStudentData.ok)) {
    throw json({ message: getJoinClassData.statusText }).status(500);
  }

  const response = {
    joinClassData: await getJoinClassData.json(),
    studentData: await getStudentData.json(),
  };

  return response;
};

export default StudentJoinClassRoot;
