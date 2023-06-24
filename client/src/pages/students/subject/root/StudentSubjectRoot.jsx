import React, { useEffect } from "react";
import { Outlet, json, useLoaderData, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

//^ stylesheet
import styles from "../../../Root/root-scss/Root.module.scss";

//^ components
import JoinSubjectBreadCrumb from "../../../../components/UX/BreadCrumb/join-subject-bread-crumb/JoinSubjectBreadCrumb";
import StudentSideHeader from "../../../../components/student/StudentSideHeader";
import StudentMainHeader from "../../../../components/student/subject/navigation/StudentMainHeader";

//^ icon
import AssignmentIcon from "../../../../components/UI/Icons/subjectIcons/AssignmentIcon";
import ParticipantsIcon from "../../../../components/UI/Icons/subjectIcons/Participants";
import ResourceIcon from "../../../../components/UI/Icons/subjectIcons/ResourceIcon";
import QuizIcon from "../../../../components/UI/Icons/subjectIcons/QuizIcon";
import BackIcon from "../../../../components/UI/Icons/subjectIcons/BackIcon";

//^ dark icons
import DarkAssignmentIcon from "../../../../components/UI/Icons/subjectIcons/Dark/AssignmentIcon";
import DarkParticipants from "../../../../components/UI/Icons/subjectIcons/Dark/DarkParticipants";
import DarkResourceIcon from "../../../../components/UI/Icons/subjectIcons/Dark/ResourceIcon";
import DarkQuizIcon from "../../../../components/UI/Icons/subjectIcons/Dark/QuizIcon";
import DarkBackIcon from "../../../../components/UI/Icons/subjectIcons/Dark/DarkBackIcon";

//^ auth
import { getAuthToken } from "../../../../utils/auth";

const StudentSubjectRoot = () => {
  //^ themeMode
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ loader data
  const { getStudent, getJoinSubject } = useLoaderData();

  const { student } = getStudent;
  const { subject, join_classroom_id } = getJoinSubject;

  const { joinSubjectId } = useParams();

  useEffect(() => {
    gsap.fromTo(".student-subject-main", { x: -300 }, { x: 0, ease: "power4" });
  }, []);

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
      to: "assignment",
      icon: themeMode ? DarkAssignmentIcon : AssignmentIcon,
      text: "Assignments",
    },
    {
      id: 2,
      to: "participants",
      icon: themeMode ? DarkParticipants : ParticipantsIcon,
      text: "Participants",
    },
    // {
    //   id: 3,
    //   to: "resources",
    //   icon: themeMode ? DarkResourceIcon : ResourceIcon,
    //   text: "Resources",
    // },
    {
      id: 4,
      to: "quiz",
      icon: themeMode ? DarkQuizIcon : QuizIcon,
      text: "Quiz",
    },
    {
      id: 5,
      to: `/student/join-classroom/${join_classroom_id}/subject`,
      icon: themeMode ? DarkBackIcon : BackIcon,
      text: "Back to classroom",
    },
  ];
  return (
    <>
      <section className={`${styles.section}`}>
        <header className={`${styles.header}`}>
          <StudentSideHeader NAV_ITEMS={NAV_ITEMS} />
        </header>
        <main className={`student-subject-main ${styles.main}`}>
          <div>
            <StudentMainHeader
              studentImg={student.student_img}
              subjectName={subject.subject_name}
            />
          </div>
          <div className={`${styles.Outlet}`}>
            <JoinSubjectBreadCrumb 
              joinSubjectId={joinSubjectId}
              subjectName={subject.subject_name}
            />
            <Outlet />
          </div>
        </main>
      </section>
    </>
  );
};

export const loader = async ({ request, params }) => {
  const { joinSubjectId } = params;

  //^ getting the current user data.
  const getStudent = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/student`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (!getStudent.ok) {
    throw json({ message: getStudent.statusText }, { status: 500 });
  }

  //^ getting the current users join-subject data.
  const getJoinSubject = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/join-subject/${joinSubjectId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (!getJoinSubject.ok) {
    throw json({ message: getJoinSubject.statusText }, { status: 500 });
  }

  const data = {
    getJoinSubject: await getJoinSubject.json(),
    getStudent: await getStudent.json(),
  };

  return data;
};

export default StudentSubjectRoot;
