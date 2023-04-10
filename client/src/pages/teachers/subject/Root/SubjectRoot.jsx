import React, { useRef, useEffect, useState } from "react";
import { Outlet, useLoaderData, json, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//* styles
import styles from "../../../../scss/pages/teacher/subject/root/SubjectRoot.module.scss";

//* components
import SubjectSideNav from "../../../../components/teacher/subject/SubjectSideNav.jsx";
import SubjectMainNav from "../../../../components/teacher/SubjectMainNav";
import JoinFormPortal from "../../../../components/model/FormPortal";
import JoinFormModel from "../../../../components/JoinFormModel/JoinFormModel";

//* icons
import DashboardIcon from "../../../../components/UI/Icons/Dashboard";
import AssignmentIcon from "../../../../components/UI/Icons/subjectIcons/AssignmentIcon";
import ResourceIcon from "../../../../components/UI/Icons/subjectIcons/ResourceIcon";
import QuizIcon from "../../../../components/UI/Icons/subjectIcons/QuizIcon";
import AttendanceIcon from "../../../../components/UI/Icons/subjectIcons/AttendanceIcon";
import VideoIcon from "../../../../components/UI/Icons/VideoIcon";
import ScheduleIcon from "../../../../components/UI/Icons/ScheduleIcon";

//* icons/Dark
import DarkDashboardIcon from "../../../../components/UI/Icons/Dark/DashBoardIcon";
import DarkAssignmentIcon from "../../../../components/UI/Icons/subjectIcons/Dark/AssignmentIcon";
import DarkResourceIcon from "../../../../components/UI/Icons/subjectIcons/Dark/ResourceIcon";
import DarkQuizIcon from "../../../../components/UI/Icons/subjectIcons/Dark/QuizIcon";
import DarkAttendanceIcon from "../../../../components/UI/Icons/subjectIcons/Dark/AttendanceIcon";
import DarkVideoIcon from "../../../../components/UI/Icons/Dark/DarkVideoIcon";
import DarkScheduleIcon from "../../../../components/UI/Icons/Dark/DarkScheduleIcon";

//* actions
import { uiAction } from "../../../../store/ui-slice";

//* auth
import { getAuthToken } from "../../../../utils/auth";

const SubjectRoot = () => {
  const { subject, teacher } = useLoaderData();

  const { subject: subjectData } = subject;
  const { teacher: teacherData } = teacher;

  //* themeMode coming from ui-slice file
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
      to: "add-peoples",
      icon: themeMode ? DarkDashboardIcon : DashboardIcon,
      text: "Peoples",
    },
    {
      id: 2,
      to: "assignment",
      icon: themeMode ? DarkAssignmentIcon : AssignmentIcon,
      text: "Assignment",
    },
    {
      id: 3,
      to: "resources",
      icon: themeMode ? DarkResourceIcon : ResourceIcon,
      text: "Resources",
    },
    {
      id: 4,
      to: "quiz",
      icon: themeMode ? DarkQuizIcon : QuizIcon,
      text: "Quiz",
    },
    {
      id: 5,
      to: "attendance",
      icon: themeMode ? DarkAttendanceIcon : AttendanceIcon,
      text: "Attendance",
    },
    // {
    //   id: 6,
    //   to: "video-session",
    //   icon: themeMode ? DarkVideoIcon : VideoIcon,
    //   text: "Video Session",
    // },
    // {
    //   id: 7,
    //   to: "schedule",
    //   icon: themeMode ? DarkScheduleIcon : ScheduleIcon,
    //   text: "Schedule",
    // },
  ];

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <SubjectSideNav themeMode={themeMode} NAV_ITEMS={NAV_ITEMS} />
      </header>
      <main className={styles.main}>
        <div>
          <SubjectMainNav
            themeMode={themeMode}
            message={subjectData.subject_name}
            teacherData={teacherData}
          />
        </div>
        <div className={styles.Outlet}>
          <Outlet themeMode={themeMode} />
        </div>
      </main>
    </section>
  );
};

export const loader = async ({ request, params }) => {
  const subjectId = params.subjectId;

  const subject = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/subject/${subjectId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  const teacher = await fetch(`${process.env.REACT_APP_HOSTED_URL}/teacher`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (!subject.ok && !teacher.ok) {
    throw json({ message: "Something went wrong" }, { status: 5000 });
  }

  const subjectData = {
    subject: await subject.json(),
    teacher: await teacher.json(),
  };

  return subjectData;
};

export default SubjectRoot;
