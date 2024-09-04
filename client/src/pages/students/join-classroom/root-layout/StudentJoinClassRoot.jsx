import React, { useEffect } from "react";
import {
  Outlet,
  json,
  redirect,
  useLoaderData,
  useParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

//* styles
import styles from "../../../scss/pages/student/Root/StudentRoot.module.scss";

//* components
import StudentSideHeader from "../../../../components/student/StudentSideHeader";
import StudentJoinClassMainNav from "../../../../components/student/join-classroom/StudentJoinClassMainNav";
import JoinClassBreadCrumb from "../../../../components/UX/BreadCrumb/join-class-bread-crumb/JoinClassBreadCrumb";

//* icons
import OverviewIcon from "../../../../components/UI/Icons/OverViewIcons";
import SubjectIcon from "../../../../components/UI/Icons/BookIcon";
// import PeopleIcon from "../../../../components/UI/Icons/TeacherIcon";

//* icons/Dark
import DarkOverviewIcon from "../../../../components/UI/Icons/Dark/DarkOverviewIcon";
import DarkSubjectIcon from "../../../../components/UI/Icons/Dark/DarkBookIcon";
// import DarkPeopleIcon from "../../../../components/UI/Icons/Dark/DarkTeacherIcon";

//* utils
import { getAuthToken } from "../../../../utils/auth";

const StudentJoinClassRoot = () => {
  //* themeMode coming from ui-slice file
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ Loader Data
  const { joinClassData, studentData } = useLoaderData();

  const { classData } = joinClassData;
  const { student } = studentData;

  const { joinClassId } = useParams();

  useEffect(() => {
    if (themeMode) {
      document.body.className = "dark-theme";
    } else {
      document.body.className = "light-theme";
    }
  }, [themeMode]);

  useEffect(() => {
    gsap.fromTo(
      ".join-classroom-header",
      { x: -200 },
      { x: 0, ease: "power4" }
    );
    gsap.fromTo(
      ".join-classroom-main",
      {
        x: -200,
      },
      { x: 0, ease: "power4" }
    );
  }, []);

  const NAV_ITEMS = [
    {
      id: 1,
      to: "overview",
      icon: themeMode ? DarkOverviewIcon : OverviewIcon,
      text: "Overview",
    },
    {
      id: 2,
      to: "subject",
      icon: themeMode ? DarkSubjectIcon : SubjectIcon,
      text: "Subjects",
    },
    // {
    //   id: 3,
    //   to: "peoples",
    //   icon: themeMode ? DarkPeopleIcon : PeopleIcon,
    //   text: "Peoples",
    // },
  ];

  return (
    <>
      <section className={styles.section}>
        <header className={`join-classroom-header ${styles.header}`}>
          <StudentSideHeader themeMode={themeMode} NAV_ITEMS={NAV_ITEMS} />
        </header>
        <main className={`join-classroom-main ${styles.main}`}>
          <div>
            <StudentJoinClassMainNav
              themeMode={themeMode}
              classroomName={classData.classroom_name}
              studentData={student}
            />
          </div>
          <div className={styles.Outlet}>
            <JoinClassBreadCrumb
              joinClassId={joinClassId}
              joinClassName={classData.classroom_name}
            />
            <Outlet />
          </div>
        </main>
      </section>
    </>
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

  if (!getJoinClassData.ok) {
    return redirect("/student/classrooms");
  }

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
