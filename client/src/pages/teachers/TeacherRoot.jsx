import React, { useRef, useEffect, useState } from "react";
import {
  Outlet,
  useRouteLoaderData,
  json,
  useNavigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { gsap } from "gsap";

//* styles
import styles from "../../scss/pages/teacher/TeacherRoot.module.scss";

//* utils
import { getAuthToken } from "../../utils/auth";

//* components
import TeacherSideHeader from "../../components/teacher/TeacherSideHeader";
import TeacherMainNav from "../../components/teacher/TeacherMainNav";
import JoinFormPortal from "../../components/model/FormPortal";
import JoinFormModel from "../../components/JoinFormModel/JoinFormModel";

//* icons
import DashboardIcon from "../../components/UI/Icons/Dashboard";
import ClassroomIcon from "../../components/UI/Icons/ClassroomIcon";
import InviteIcon from "../../components/UI/Icons/InviteIcon";
import MessageIcon from "../../components/UI/Icons/MessageIcon";
import VideoIcon from "../../components/UI/Icons/VideoIcon";
import ScheduleIcon from "../../components/UI/Icons/ScheduleIcon";

//* icons/Dark
import DarkDashboardIcon from "../../components/UI/Icons/Dark/DashBoardIcon";
import DarkClassroomIcon from "../../components/UI/Icons/Dark/ClassroomIcon";
import DarkInviteIcon from "../../components/UI/Icons/Dark/InviteIcon";
import DarkMessageIcon from "../../components/UI/Icons/Dark/DarkMessageIcon";
import DarkVideoIcon from "../../components/UI/Icons/Dark/DarkVideoIcon";
import DarkScheduleIcon from "../../components/UI/Icons/Dark/DarkScheduleIcon";

//* actions
import { uiAction } from "../../store/ui-slice";

const TeacherRoot = () => {
  //* useStates
  const [errorMessage, setErrorMessage] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //* teacher-loader
  const { teacher } = useRouteLoaderData("teacher-loader");

  //* themeMode coming from ui-slice file
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //* input ref
  const inputData = useRef({});

  //* navigate function
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(".teacher-side-nav", { x: -200 }, { x: 0, ease: "linear" });
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
      to: "dashboard",
      icon: themeMode ? DarkDashboardIcon : DashboardIcon,
      text: "Dashboard",
    },
    {
      id: 2,
      to: "classroom",
      icon: themeMode ? DarkClassroomIcon : ClassroomIcon,
      text: "Classrooms",
    },
    {
      id: 6,
      to: "invitation",
      icon: themeMode ? DarkInviteIcon : InviteIcon,
      text: "Invitations",
    },
    // {
    //   id: 3,
    //   to: "message",
    //   icon: themeMode ? DarkMessageIcon : MessageIcon,
    //   text: "Message",
    // },
    // {
    //   id: 4,
    //   to: "video-session",
    //   icon: themeMode ? DarkVideoIcon : VideoIcon,
    //   text: "Video Session",
    // },
    // {
    //   id: 5,
    //   to: "schedule",
    //   icon: themeMode ? DarkScheduleIcon : ScheduleIcon,
    //   text: "Schedule",
    // },
  ];

  const dispatch = useDispatch();

  const isJoinClassroomActive = useSelector(
    (state) => state.ui.isJoinClassroomActive
  );

  const joinFormToggler = () => {
    dispatch(uiAction.joinClassroomFormHandler());

    //* Resetting the state when the model is closed
    setIsLoading(false);
    setErrorMessage({});
  };

  const joinOnSubmit = async (e) => {
    e.preventDefault();

    //* Setting the isLoading state to true.
    setIsLoading(true);

    //* storing the ref data to this object.
    const JoinClassroomData = {
      classCode: inputData.current.inputData,
    };

    //* sending the request.
    const response = await fetch(
      `${process.env.REACT_APP_HOSTED_URL}/classroom/join-classroom-as-teacher`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(JoinClassroomData),
      }
    );

    //* if response.status is either 401 or 422 then this condition will start working.
    if (response.status === 401 || response.status === 422) {
      //* setting the isLoading to false because request have some issue.
      setIsLoading(false);
      setErrorMessage(await response.json());
      return;
    }

    //* If something went wrong on the server then this if condition will run.
    if (!response.ok) {
      setIsLoading(false);
      setErrorMessage(await response.json());
      // console.log(await response.json());
      throw new Error({ message: "Something went wrong" }, { status: 500 });
    }

    //& Response Successful ==============================================
    //* response data
    const resData = await response.json();

    //* If all possibility got success then will navigate to this route.
    navigate(`/teacher/classroom`);

    //* Resetting the states.
    setIsLoading(false);
    setErrorMessage({});

    //* dispatching the toggle function which is coming from redux
    dispatch(uiAction.joinClassroomFormHandler());

    //& ================================================================
  };

  const joinInputValueHandler = (value) => {
    inputData.current.inputData = value;
  };

  return (
    <>
      {isJoinClassroomActive && (
        <JoinFormPortal
          modelTitle={"Join Classroom"}
          buttonOnClick={joinFormToggler}
          onBackdrop={joinFormToggler}
          formOnSubmit={joinOnSubmit}
        >
          <JoinFormModel
            joinInputValue={joinInputValueHandler}
            errorMessage={errorMessage}
            isLoading={isLoading}
          />
        </JoinFormPortal>
      )}
      <section className={styles.section}>
        <header className={`teacher-side-nav ${styles.header}`}>
          <TeacherSideHeader themeMode={themeMode} NAV_ITEMS={NAV_ITEMS} />
        </header>
        <main className={styles.main}>
          <div>
            <TeacherMainNav
              themeMode={themeMode}
              message={teacher.teacher_first_name}
              teacherData={teacher}
            />
          </div>
          <div className={styles.Outlet}>
            <Outlet themeMode={themeMode} />
          </div>
        </main>
      </section>
    </>
  );
};

export default TeacherRoot;
