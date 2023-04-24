import { useEffect } from "react";
import { Outlet, useLoaderData, json } from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

//* styles
import styles from "../../../../scss/pages/teacher/subject/root/SubjectRoot.module.scss";

//* components
import SubjectSideNav from "../../../../components/teacher/subject/SubjectSideNav.jsx";
import SubjectMainNav from "../../../../components/teacher/SubjectMainNav";
import BreadCrumb from "../../../../components/UX/BreadCrumb/BreadCrumb";

//* icons
import DashboardIcon from "../../../../components/UI/Icons/Dashboard";
import AssignmentIcon from "../../../../components/UI/Icons/subjectIcons/AssignmentIcon";
import ResourceIcon from "../../../../components/UI/Icons/subjectIcons/ResourceIcon";
import QuizIcon from "../../../../components/UI/Icons/subjectIcons/QuizIcon";
import AttendanceIcon from "../../../../components/UI/Icons/subjectIcons/AttendanceIcon";
import BackIcon from "../../../../components/UI/Icons/subjectIcons/BackIcon.jsx";

//* icons/Dark
import DarkDashboardIcon from "../../../../components/UI/Icons/Dark/DashBoardIcon";
import DarkAssignmentIcon from "../../../../components/UI/Icons/subjectIcons/Dark/AssignmentIcon";
import DarkResourceIcon from "../../../../components/UI/Icons/subjectIcons/Dark/ResourceIcon";
import DarkQuizIcon from "../../../../components/UI/Icons/subjectIcons/Dark/QuizIcon";
import DarkAttendanceIcon from "../../../../components/UI/Icons/subjectIcons/Dark/AttendanceIcon";
import DarkBackIcon from "../../../../components/UI/Icons/subjectIcons/Dark/DarkBackIcon.jsx";

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

  useEffect(() => {
    gsap.fromTo(".subject-root-section", { x: -200 }, { x: 0, ease: "power5" });
    gsap.fromTo(".subject-side-nav", { x: -200 }, { x: 0, ease: "power5" });
  }, []);

  const NAV_ITEMS = [
    {
      id: 1,
      to: "assignment",
      icon: themeMode ? DarkAssignmentIcon : AssignmentIcon,
      text: "Assignment",
    },
    {
      id: 2,
      to: "add-peoples",
      icon: themeMode ? DarkDashboardIcon : DashboardIcon,
      text: "Add Participants",
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
    {
      id: 6,
      to: `/teacher/classroom/${subjectData.class_id}/overview`,
      icon: themeMode ? DarkBackIcon : BackIcon,
      text: "Back to classroom",
    },
  ];

  return (
    <section className={`subject-root-section ${styles.section}`}>
      <header className={`subject-side-nav ${styles.header}`}>
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
          <BreadCrumb />
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
