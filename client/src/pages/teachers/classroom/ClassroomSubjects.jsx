import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { json, redirect, useRouteLoaderData, Link } from "react-router-dom";
import { gsap } from "gsap";

//* styles
import styles from "../../../scss/pages/teacher/classrooms/ClassroomSubjects.module.scss";

//* UI
import PrimaryCard from "../../../components/UI/Card/TeacherCard";
import SecondaryCard from "../../../components/UI/Card/CardSecondary";

//* Component
import { uiAction } from "../../../store/ui-slice";
import { getAuthToken } from "../../../utils/auth";
import SubjectHeader from "../../../components/subject/SubjectHeader";
import SubjectFooter from "../../../components/subject/SubjectFooter";
import CompulsorySubject from "../../../components/subject/CompulsorySubject";
import OptionalSubject from "../../../components/subject/OptionalSubject";

const ClassroomSubjects = () => {
  //* Selectors
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //* dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    gsap.fromTo(".section", { opacity: 0 }, { opacity: 1, ease: "power3" });
  });

  //* Fetching classroom Data from the root level of the classroom route.
  const { classroomData } = useRouteLoaderData("classroom-root-loader");
  const { classroomData: classroom } = classroomData;

  //* Loading the data
  const { compulsorySubjects, optionalSubjects } = useRouteLoaderData(
    "class-subject-loader"
  );

  console.log(compulsorySubjects, optionalSubjects);

  return (
    <>
      <section
        className={`section ${styles["section"]} ${
          themeMode ? styles["dark"] : undefined
        }`}
      >
        <h2>{classroom.classroom_name} Subjects</h2>
        <CompulsorySubject compulsorySubjects={compulsorySubjects} />
        <OptionalSubject optionalSubjects={optionalSubjects} />
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

  const response = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/subject/add-compulsory-subjects`,
    {
      method: "POST",
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

  return redirect(`/teacher/subject/${resData.subjectId}`);
};

export default ClassroomSubjects;

// {subjectData &&
//   subjectData.subjects &&
//   subjectData.subjects.map((subject) => {
//     return (
//       <Fragment key={subject.subject_id}>
//         <Link to={`/teacher/subject/${subject.subject_id}/assignment`}>
//           <SecondaryCard className={styles["subject-card"]}>
//             <SubjectHeader
//               themeMode={themeMode}
//               subjectName={subject.subject_name}
//             />
//             <SubjectFooter
//               themeMode={themeMode}
//               teacherImg={
//                 subject &&
//                 subject.teacher &&
//                 subject.teacher.teacher_img &&
//                 subject.teacher.teacher_img
//               }
//               studentImg={
//                 subject &&
//                 subject.student &&
//                 subject.student.student_img &&
//                 subject.student.student_img
//               }
//             />
//           </SecondaryCard>
//         </Link>
//       </Fragment>
//     );
//   })}
