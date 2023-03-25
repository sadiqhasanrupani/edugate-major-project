import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { json, redirect, useRouteLoaderData, Link } from "react-router-dom";

//* styles
import styles from "../../../scss/pages/teacher/classrooms/ClassroomSubjects.module.scss";

//* UI
import PrimaryCard from "../../../components/UI/Card/TeacherCard";
import SecondaryCard from "../../../components/UI/Card/CardSecondary";

//* Component
import { uiAction } from "../../../store/ui-slice";
import { getAuthToken } from "../../../utils/auth";
import SubjectHeader from "../../../components/subject/SubjectHeader";
import SubjectFooter from "../../../components/subject/SubjectFooter.jsx";

const ClassroomSubjects = () => {
  //* Selectors
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //* dispatch
  const dispatch = useDispatch();

  //* Fetching classroom Data from the root level of the classroom route.
  const { classroomData } = useRouteLoaderData("classroom-root-loader");
  const { classroomData: classroom } = classroomData;

  //* Loading the data
  const subjectData = useRouteLoaderData("class-subject-loader");

  //* function to open a portal model
  const modelTogglerHandler = () => {
    dispatch(uiAction.SubjectFormHandler());
  };

  return (
    <>
      <section
        className={`${styles["section"]} ${
          themeMode ? styles["dark"] : undefined
        }`}
      >
        <h2>{classroom.classroom_name} Subjects</h2>
        <PrimaryCard className={styles["primary-card"]}>
          {subjectData &&
            subjectData.subjects &&
            subjectData.subjects.map((subject) => {
              return (
                <Fragment key={subject.subject_id}>
                  <Link to={`/teacher/subject/${subject.subject_id}/dashboard`}>
                    <SecondaryCard className={styles["subject-card"]}>
                      <SubjectHeader
                        themeMode={themeMode}
                        subjectName={subject.subject_name}
                      />
                      <SubjectFooter
                        themeMode={themeMode}
                        teacherImg={
                          subject &&
                          subject.teacher &&
                          subject.teacher.teacher_img &&
                          subject.teacher.teacher_img
                        }
                        studentImg={
                          subject &&
                          subject.student &&
                          subject.student.student_img &&
                          subject.student.student_img
                        }
                      />
                    </SecondaryCard>
                  </Link>
                </Fragment>
              );
            })}
          <div>
            <button onClick={modelTogglerHandler}>
              <SecondaryCard className={styles["add-subject-card"]}>
                Add new subject
              </SecondaryCard>
            </button>
          </div>
        </PrimaryCard>
      </section>
    </>
  );
};

export const loader = async ({ request, params }) => {
  const classId = params.classId;

  const response = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/subject/classroom-subjects?classId=${classId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (!response.ok) {
    throw json({ message: "Something went wrong" }, { status: 500 });
  }

  return response;
};

export const action = async ({ request, params }) => {
  const data = await request.formData();

  const subjectFormData = {
    subjectName: data.get("subject-name"),
    classId: data.get("class-id"),
  };

  console.log(subjectFormData);

  const response = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/subject/create-subject`,
    {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(subjectFormData),
    }
  );

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Something went wrong" }, { status: 500 });
  }

  const resData = await response.json();

  return redirect(`/teacher/subject/${resData.subject.subject_id}`);
};

export default ClassroomSubjects;
