import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  json,
  Outlet,
  useRouteLoaderData,
  useParams,
  useNavigate,
} from "react-router-dom";
import { gsap } from "gsap";

//* styles
import styles from "../../../../scss/pages/teacher/ClassroomDetail.module.scss";

//* light-theme-icons
import DashboardIcon from "../../../../components/UI/Icons/Dashboard";
import TeacherIcon from "../../../../components/UI/Icons/TeacherIcon";
import StudentIcon from "../../../../components/UI/Icons/StudentIcon";
import SubjectIcon from "../../../../components/UI/Icons/BookIcon";
import SettingIcon from "../../../../components/UI/Icons/SettingsSmallIcon";

//* dark-theme-icons
import DarkDashboardIcon from "../../../../components/UI/Icons/Dark/DashBoardIcon";
import DarkTeacherIcon from "../../../../components/UI/Icons/Dark/DarkTeacherIcon";
import DarkStudentIcon from "../../../../components/UI/Icons/Dark/DarkStudentIcon";
import DarkSubjectIcon from "../../../../components/UI/Icons/Dark/DarkBookIcon";
import DarkSettingIcon from "../../../../components/UI/Icons/Dark/DarkSettingSmallIcon";

//* components
import ClassroomSideHeader from "../../../../components/teacher/TeacherSideHeader";
import ClassroomMainNav from "../../../../components/teacher/Classrooms/ClassroomMainNav";
import SubjectForm from "../../../../components/teacher/subject/SubjectForm";
import SubjectFormPortal from "../../../../components/model/Portal";
import ClassroomBreadCrumb from "../../../../components/UX/BreadCrumb/classroom-bread-crumb/ClassroomBreadCrumb";
import FormPortal from "../../../../components/model/FormPortal";
import OptionalSubjectFrom from "../../../../components/teacher/Classrooms/Subjects/OptionalSubjectFrom/OptionalSubjectFrom";

//* action
import { uiAction } from "../../../../store/ui-slice";

//^ auth
import { getAuthToken, verifyToken } from "../../../../utils/auth";

const ClassroomRoot = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  const dispatch = useDispatch();

  //^ classId params
  const { classId } = useParams();

  //^ navigate function
  const navigate = useNavigate();

  const isFormPortal = useSelector(
    (state) => state.ui.isCompulsorySubjectFormActive
  );

  const isOptionalSubjectFormPortal = useSelector(
    (state) => state.ui.isOptionalSubjectFormActive
  );

  const { teacherData, classroomData } = useRouteLoaderData(
    "classroom-root-loader"
  );

  //^ using state hooks
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [responseMessage, setResponseMessage] = useState({});
  const [errorResponseMessage, setErrorResponseMessage] = useState({});
  const refData = useRef({});

  useEffect(() => {
    if (themeMode) {
      document.body.className = "dark-theme";
    } else {
      document.body.className = "light-theme";
    }
  }, [themeMode]);

  useEffect(() => {
    gsap.fromTo(
      ".teacher-classroom-side-nav",
      { x: -200 },
      { x: 0, ease: "power6" }
    );
    gsap.fromTo(
      ".teacher-classroom-main",
      { x: -200 },
      { x: 0, ease: "power4" }
    );
  }, []);

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
    {
      id: 7,
      to: "setting",
      icon: themeMode ? DarkSettingIcon : SettingIcon,
      text: "Settings",
    },
  ];

  //* Teacher Data
  const { teacher } = teacherData;

  //* Student Data
  const { classroomData: classroom } = classroomData;
  const { classroom_name } = classroom;

  const modelTogglerHandler = () => {
    setIsLoading(false);
    setErrorMessage({});
    setErrorResponseMessage({});
    setResponseMessage({});
    dispatch(uiAction.compulsorySubjectFormHandler());
  };

  //^ this function will toggle the optional subject model
  const optionalSubjectModelHandler = () => {
    dispatch(uiAction.optionalSubjectFormHandler());
  };

  //^ getting the data from the optionalSubjectFormModel using this handler
  const getSubjectDataHandler = (data) => {
    refData.current.subjectNameOne = data.subjectNameOneEnteredValue;
    refData.current.subjectNameTwo = data.subjectNameTwoEnteredValue;
  };

  //^ This function handler will allows to send the optional subject form data for
  //^ creation of the new subject inside the respected classroom.
  const addOptionalSubjectHandler = async (e) => {
    e.preventDefault();

    //^ storing the subject-name data which is inside the refData into the subjectName
    const { subjectNameOne, subjectNameTwo } = refData.current;

    setIsLoading(true);

    const createOptionalSubject = await fetch(
      `${process.env.REACT_APP_HOSTED_URL}/subject/create-optional-subject`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subjectNameOne, subjectNameTwo, classId }),
      }
    );

    if (createOptionalSubject.status === 401) {
      setIsLoading(false);

      const response = await createOptionalSubject.json();
      setErrorResponseMessage({
        message: response.message,
        status: createOptionalSubject.status,
      });
    }

    if (!createOptionalSubject.ok) {
      setIsLoading(false);

      const response = await createOptionalSubject.json();
      setErrorResponseMessage({
        message: response.message,
        status: createOptionalSubject.status,
      });
    }

    setIsLoading(false);

    const resData = await createOptionalSubject.json();
    setResponseMessage(resData);

    navigate(`/teacher/classroom/${classId}/subjects`);

    dispatch(uiAction.optionalSubjectFormHandler());
  };

  return (
    <>
      {/* 
        //^ Compulsory subject form model 
      */}
      {isFormPortal && (
        <SubjectFormPortal onBackdrop={modelTogglerHandler}>
          <SubjectForm classId={classroom.classroom_id} />
        </SubjectFormPortal>
      )}
      {/* 
        //^ Optional subject form model 
      */}
      {isOptionalSubjectFormPortal && (
        <FormPortal
          modelTitle="Optional Subject"
          onBackdrop={optionalSubjectModelHandler}
          buttonOnClick={optionalSubjectModelHandler}
        >
          <OptionalSubjectFrom
            isLoading={isLoading}
            errorMessage={errorMessage}
            onSubmit={addOptionalSubjectHandler}
            onOptionalSubjectForm={getSubjectDataHandler}
          />
        </FormPortal>
      )}
      <section className={styles.section}>
        <header className={`teacher-classroom-side-nav ${styles.header}`}>
          <ClassroomSideHeader NAV_ITEMS={NAV_ITEMS} themeMode={themeMode} />
        </header>
        <main className={`teacher-classroom-main ${styles.main}`}>
          <div>
            <ClassroomMainNav
              themeMode={themeMode}
              message={classroom_name}
              teacherData={teacher}
            />
          </div>
          <div className={styles.Outlet}>
            <ClassroomBreadCrumb
              classroomId={classId}
              classroomName={classroom_name}
            />
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
