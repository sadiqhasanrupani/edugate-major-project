import React, { useEffect, useRef, useState } from "react";
import {
  json,
  redirect,
  useRouteLoaderData,
  useLoaderData,
  useParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { gsap } from "gsap";

//^ styles
import styles from "../../../../scss/pages/teacher/subject/subroot/TeacherSubjectPeoples.module.scss";

//^ components
import SubjectTeachers from "../../../../components/teacher/subject/subroot/SubjectTeachers";
import SubjectStudents from "../../../../components/teacher/subject/subroot/SubjectStudents";
import FormPortal from "../../../../components/model/FormPortal";
import TeacherOverlay from "../../../../components/teacher/subject/subroot/TeacherOverlay";
import StudentOverlay from "../../../../components/teacher/subject/subroot/StudentOverlay";

//^ Action
import { uiAction } from "../../../../store/ui-slice";
import { getAuthToken } from "../../../../utils/auth";

const TeacherSubjectPeoples = () => {
  //^ Animation useEffect
  useEffect(() => {
    gsap.fromTo(".section", { opacity: 0 }, { opacity: 1, ease: "linear" });
  }, []);

  //^ dispatch func
  const dispatch = useDispatch();

  //^ themeMode
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ state data
  const [teacherResponseData, setTeacherResponseData] = useState({});
  const [studentResponseData, setStudentResponseData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //^ ref data
  const refData = useRef({});

  //^ getting the subject id from useParams hook.
  const { subjectId } = useParams();

  //^ ui selectors
  const isTeacherOverlayActive = useSelector(
    (state) => state.ui.isTeacherOverlayActive
  );

  const isStudentOverlayActive = useSelector(
    (state) => state.ui.isStudentOverlayActive
  );

  //^ handler for TeacherOverlay.
  const ToggleTeacherOverlayHandler = () => {
    setIsLoading(false);
    setTeacherResponseData({});
    dispatch(uiAction.TogglerAddTeacherOverlay());
  };

  //^ handler for StudentOverlay.
  const ToggleStudentOverlayHandler = () => {
    setIsLoading(false);
    setStudentResponseData({});
    dispatch(uiAction.TogglerAddStudentOverlay());
  };

  //^ route loader data
  const { subject } = useRouteLoaderData("teacher-subject-root-loader");
  const { subject: subjectData } = subject;

  //^ loader data
  const { coTeacherJoinClassData, studentJoinClassData } = useLoaderData();

  //^ getting the array of ids from the onTeacherOverlay attribute
  const getTeacherOverlayData = (arrayData) => {
    refData.current.teacherIds = arrayData;
  };

  //^ getting the array of ids from the onStudentOverlay attribute
  const getStudentOverlayData = (arrayData) => {
    refData.current.studentIds = arrayData;
  };

  //^ this handler will help to add the selected teacher into the respected subject
  const addTeacherHandler = async (e) => {
    e.preventDefault();
    const { teacherIds } = refData.current;

    setIsLoading(true);

    const postTeacherData = await fetch(
      `${process.env.REACT_APP_HOSTED_URL}/subject/add-teachers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({ subjectId, teacherIds }),
      }
    );

    if (!postTeacherData.ok) {
      setIsLoading(true);
      throw json({ message: "Internal Server Error" }, { status: 500 });
    }

    setIsLoading(true);
    setTeacherResponseData(await postTeacherData.json());

    dispatch(uiAction.TogglerAddTeacherOverlay());
  };

  const addStudentHandler = async (e) => {
    e.preventDefault();
    const { studentIds } = refData.current;

    setIsLoading(true);

    const postTeacherData = await fetch(
      `${process.env.REACT_APP_HOSTED_URL}/subject/add-students`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({ subjectId, studentIds }),
      }
    );

    if (!postTeacherData.ok) {
      setIsLoading(true);
      throw json({ message: "Internal Server Error" }, { status: 500 });
    }

    setIsLoading(true);
    setStudentResponseData(await postTeacherData.json());

    dispatch(uiAction.TogglerAddStudentOverlay());
  };

  return (
    <>
      {isTeacherOverlayActive && (
        <FormPortal
          modelTitle={"Add Teacher"}
          onBackdrop={ToggleTeacherOverlayHandler}
          buttonOnClick={ToggleTeacherOverlayHandler}
          cardClassName={styles["card"]}
        >
          <TeacherOverlay
            classroomTeachersData={coTeacherJoinClassData}
            themeMode={themeMode}
            onTeacherOverlay={getTeacherOverlayData}
            isLoading={isLoading}
            onAddTeacher={addTeacherHandler}
          />
        </FormPortal>
      )}
      {isStudentOverlayActive && (
        <FormPortal
          modelTitle={"Add Student"}
          onBackdrop={ToggleStudentOverlayHandler}
          buttonOnClick={ToggleStudentOverlayHandler}
          cardClassName={styles["card"]}
          s
        >
          <StudentOverlay
            classroomStudentsData={studentJoinClassData}
            themeMode={themeMode}
            isLoading={isLoading}
            onAddStudent={addStudentHandler}
            onStudentOverlay={getStudentOverlayData}
          />
        </FormPortal>
      )}
      <section className={`section ${styles["section"]}`}>
        <SubjectTeachers subjectName={subjectData.subject_name} />
        <SubjectStudents subjectName={subjectData.subject_name} />
      </section>
    </>
  );
};

export const loader = async ({ request, params }) => {
  if (!getAuthToken()) {
    return redirect("/login");
  }

  const getClassroomMembers = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/subject/get-classroom-members/${params.subjectId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (!getClassroomMembers.ok) {
    throw json({ message: "Internal Server Error" }, { status: 500 });
  }

  return getClassroomMembers;
};

export default TeacherSubjectPeoples;
