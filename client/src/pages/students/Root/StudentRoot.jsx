import React, { useRef, useEffect, useState } from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//* styles
import styles from "../../scss/pages/student/Root/StudentRoot.module.scss";

//* components
import StudentSideHeader from "../../../components/student/StudentSideHeader";
import StudentMainNav from "../../../components/student/StudentMainNav";
import FormPortal from "../../../components/model/FormPortal";
import JoinClassroomForm from "../../../components/student/subroot/JoinClassroomForm";

//* icons
import DashboardIcon from "../../../components/UI/Icons/Dashboard";
import ClassroomIcon from "../../../components/UI/Icons/ClassroomIcon";
import MessageIcon from "../../../components/UI/Icons/MessageIcon";
import ScheduleIcon from "../../../components/UI/Icons/ScheduleIcon";

//* icons/Dark
import DarkDashboardIcon from "../../../components/UI/Icons/Dark/DashBoardIcon";
import DarkClassroomIcon from "../../../components/UI/Icons/Dark/ClassroomIcon";
import DarkMessageIcon from "../../../components/UI/Icons/Dark/DarkMessageIcon";
import DarkScheduleIcon from "../../../components/UI/Icons/Dark/DarkScheduleIcon";

//* actions
import { uiAction } from "../../../store/ui-slice";

//* utils
import { getAuthToken } from "../../../utils/auth";

const StudentRoot = () => {
  //* states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  //* themeMode coming from ui-slice file
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //* student loader
  const { student } = useLoaderData();

  //* StudentJoinClassroomIsActive
  const JoinClassroomIsActive = useSelector(
    (state) => state.ui.isStudentJoinClassroomActive
  );

  //* dispatch func,
  const dispatch = useDispatch();

  //^ Toggler func,
  const JoinClassroomToggler = () => {
    setIsLoading(false);
    setErrorMessage(null);
    dispatch(uiAction.ToggleStudentJoinClassroom());
  };

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
    // {
    //   id: 3,
    //   to: "messages",
    //   icon: themeMode ? DarkMessageIcon : MessageIcon,
    //   text: "Message",
    // },
    // {
    //   id: 5,
    //   to: "schedule",
    //   icon: themeMode ? DarkScheduleIcon : ScheduleIcon,
    //   text: "Schedule",
    // },
  ];

  //& form submission login ========================================================
  const onJoinClassroomFormHandler = async (e) => {
    e.preventDefault();

    //^ Starting the loading state
    setErrorMessage(null);
    setIsLoading(true);

    //^ accessing the classCode data through ref,
    const classCode = ref.current.classCode;

    /*
      ^ posting a request to join the class according 
      ^ to the respected class-code as a student.
    */
    const jcAsStudent = await fetch(
      `${process.env.REACT_APP_HOSTED_URL}/student-join-classroom`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({ classCode }),
      }
    );

    //^ If there is some server side error then the data will come here.
    if (jcAsStudent.status === 401 || jcAsStudent.status === 422) {
      setIsLoading(false);
      setErrorMessage(await jcAsStudent.json());
    }

    if (!jcAsStudent.ok) {
      setIsLoading(false);
      console.log(await jcAsStudent.json());
      throw new Error("Something went wrong");
    }

    setIsLoading(false);
    //^ getting the 200 status data here.
    const jcAsStudentResponse = await jcAsStudent.json();

    dispatch(uiAction.ToggleStudentJoinClassroom());

    navigate(`/student/join-classroom/${jcAsStudentResponse.joinClassroomId}`);
  };
  //& ==============================================================================

  //^ getting classCode using a function
  const getClassCodeHandler = (classCode) => {
    //^ storing the class-code-input data into ref.
    ref.current.classCode = classCode;
  };

  return (
    <>
      {JoinClassroomIsActive && (
        <FormPortal
          buttonOnClick={JoinClassroomToggler}
          onBackdrop={JoinClassroomToggler}
          modelTitle={`Join Classroom`}
          formOnSubmit={onJoinClassroomFormHandler}
        >
          <JoinClassroomForm
            classCode={getClassCodeHandler}
            errorMessage={errorMessage}
            isLoading={isLoading}
          />
        </FormPortal>
      )}
      <section className={styles.section}>
        <header className={styles.header}>
          <StudentSideHeader themeMode={themeMode} NAV_ITEMS={NAV_ITEMS} />
        </header>
        <main className={styles.main}>
          <div>
            <StudentMainNav
              themeMode={themeMode}
              message={student.student_first_name}
              studentData={student}
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
  if (!getAuthToken()) {
    return redirect("/login");
  }

  const response = await fetch(`${process.env.REACT_APP_HOSTED_URL}/student`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw json({ message: "Cannot find the page" }, { status: 404 });
  }

  return response;
};

export default StudentRoot;
