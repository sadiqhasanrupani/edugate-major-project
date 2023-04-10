import React, { useEffect } from "react";
import { json, redirect, useRouteLoaderData } from "react-router-dom";
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

  const dispatch = useDispatch();

  //^ ui selectors
  const isTeacherOverlayActive = useSelector(
    (state) => state.ui.isTeacherOverlayActive
  );

  const isStudentOverlayActive = useSelector(
    (state) => state.ui.isStudentOverlayActive
  );

  //^ handler for TeacherOverlay.
  const ToggleTeacherOverlayHandler = () => {
    dispatch(uiAction.TogglerAddTeacherOverlay());
  };

  //^ handler for StudentOverlay.
  const ToggleStudentOverlayHandler = () => {
    dispatch(uiAction.TogglerAddStudentOverlay());
  };

  //^ route loader data
  const { subject } = useRouteLoaderData("teacher-subject-root-loader");
  const { subject: subjectData } = subject;

  return (
    <>
      {isTeacherOverlayActive && (
        <FormPortal
          modelTitle={"Add Teacher"}
          onBackdrop={ToggleTeacherOverlayHandler}
          buttonOnClick={ToggleTeacherOverlayHandler}
        >
          <TeacherOverlay />
        </FormPortal>
      )}
      {isStudentOverlayActive && (
        <FormPortal
          modelTitle={"Add Student"}
          onBackdrop={ToggleStudentOverlayHandler}
          buttonOnClick={ToggleStudentOverlayHandler}
        >
          <TeacherOverlay />
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
    `${process.env.REACT_APP_HOSTED_URL}/get-classroom-members/${params.subjectId}`,
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
