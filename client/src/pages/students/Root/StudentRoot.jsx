import React, { useRef, useEffect, useState } from "react";
import {
  Outlet,
  ScrollRestoration,
  redirect,
  useLoaderData,
  useNavigate,
  json
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { gsap } from "gsap";

//* styles
import styles from "../../scss/pages/student/Root/StudentRoot.module.scss";

//* components
import StudentSideHeader from "../../../components/student/StudentSideHeader";
import StudentMainNav from "../../../components/student/StudentMainNav";
import FormPortal from "../../../components/model/FormPortal";
import JoinClassroomForm from "../../../components/student/subroot/JoinClassroomForm";
import BreadCrumb from "../../../components/UX/BreadCrumb/BreadCrumb";

//* icons
import DashboardIcon from "../../../components/UI/Icons/Dashboard";
import ClassroomIcon from "../../../components/UI/Icons/ClassroomIcon";

//* icons/Dark
import DarkDashboardIcon from "../../../components/UI/Icons/Dark/DashBoardIcon";
import DarkClassroomIcon from "../../../components/UI/Icons/Dark/ClassroomIcon";

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

  useEffect(() => {
    gsap.fromTo(".subject-root-main", { x: -200 }, { x: 0, ease: "power4" });
  }, []);

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
      <ScrollRestoration
        getKey={(location, matches) => {
          // default behavior
          return location.key;
        }}
      />
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
        <main className={`subject-root-main ${styles.main}`}>
          <div>
            <StudentMainNav
              themeMode={themeMode}
              message={student.student_first_name}
              studentData={student}
            />
          </div>
          <div className={styles.Outlet}>
            <BreadCrumb />
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
      Authorization: `Bearer ${getAuthToken}`,
    },
  });

  if (!response.ok) {
    throw json({ message: "Cannot find the page" }, { status: 404 });
  }

  return response;
};

export default StudentRoot;
