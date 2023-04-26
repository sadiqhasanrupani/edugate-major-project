import React, { useEffect, useRef, useState } from "react";
import {
  json,
  redirect,
  useRouteLoaderData,
  useLoaderData,
  useParams,
  useNavigate,
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

//^ auth
import { getAuthToken } from "../../../../utils/auth";

const TeacherSubjectPeoples = () => {
  //^ Animation useEffect
  useEffect(() => {
    gsap.fromTo(".section", { opacity: 0 }, { opacity: 1, ease: "linear" });
  }, []);

  //^ navigate
  const navigate = useNavigate();

  //^ dispatch func
  const dispatch = useDispatch();

  //^ themeMode
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ state data
  const [teacherResponseData, setTeacherResponseData] = useState({});
  const [studentResponseData, setStudentResponseData] = useState({});
  const [teacherIsLoading, setTeacherIsLoading] = useState(false);
  const [studentIsLoading, setStudentIsLoading] = useState(false);

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
    setTeacherIsLoading(false);
    setTeacherResponseData({});
    dispatch(uiAction.TogglerAddTeacherOverlay());
  };

  //^ handler for StudentOverlay.
  const ToggleStudentOverlayHandler = () => {
    setStudentIsLoading(false);
    setStudentResponseData({});
    dispatch(uiAction.TogglerAddStudentOverlay());
  };

  //^ route loader data
  const { subject } = useRouteLoaderData("teacher-subject-root-loader");
  const { subject: subjectData } = subject;

  //^ loader data
  const { getClassroomMembers, getJoinedSubjectMembers } = useLoaderData();
  const { coTeacherJoinClassData, studentJoinClassData } = getClassroomMembers;

  //^ Destructuring the getJoinSubjectMembers
  const { joinSubjectTeachersData, joinSubjectStudentsData } =
    getJoinedSubjectMembers;

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

    setTeacherIsLoading(true);

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
      setTeacherIsLoading(false);
      throw json({ message: "Internal Server Error" }, { status: 500 });
    }

    setTeacherIsLoading(false);
    setTeacherResponseData(await postTeacherData.json());

    navigate(`/teacher/subject/${subjectId}/add-peoples`);

    dispatch(uiAction.TogglerAddTeacherOverlay());
  };

  //^ This handler will add the student classroom members into student subject members
  const addStudentHandler = async (e) => {
    e.preventDefault();
    const { studentIds } = refData.current;

    setStudentIsLoading(true);

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
      setStudentIsLoading(false);
      throw json({ message: "Internal Server Error" }, { status: 500 });
    }

    setStudentIsLoading(false);
    setStudentResponseData(await postTeacherData.json());

    navigate(`/teacher/subject/${subjectId}/add-peoples`);

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
            isLoading={teacherIsLoading}
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
        >
          <StudentOverlay
            classroomStudentsData={studentJoinClassData}
            themeMode={themeMode}
            isLoading={studentIsLoading}
            onAddStudent={addStudentHandler}
            onStudentOverlay={getStudentOverlayData}
          />
        </FormPortal>
      )}
      <main className={`main ${styles["main"]}`}>
        <SubjectTeachers
          subjectTeachersData={joinSubjectTeachersData}
          subjectName={subjectData.subject_name}
        />
        <SubjectStudents
          subjectStudentsData={joinSubjectStudentsData}
          subjectName={subjectData.subject_name}
        />
      </main>
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

  const getJoinedSubjectMembers = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/subject/get-join-subject-teachers-students/${params.subjectId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (!getJoinedSubjectMembers.ok) {
    throw json(
      { message: getJoinedSubjectMembers.statusText },
      { status: 500 }
    );
  }

  if (getJoinedSubjectMembers.status === 401) {
    throw json(
      { message: await getJoinedSubjectMembers.json().message },
      { status: getJoinedSubjectMembers.status }
    );
  }

  const data = {
    getClassroomMembers: await getClassroomMembers.json(),
    getJoinedSubjectMembers: await getJoinedSubjectMembers.json(),
  };

  return data;
};

export default TeacherSubjectPeoples;
