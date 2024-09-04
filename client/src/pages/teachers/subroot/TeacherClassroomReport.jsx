import React, { useEffect } from "react";
import { json, useLoaderData } from "react-router-dom";
import { gsap } from "gsap";

//^ stylesheet
import styles from "../../../scss/pages/teacher/dashboard/TeacherClassroomReport.module.scss";

//^ auth
import { getAuthToken } from "../../../utils/auth";

//^ components
import ClassroomPDF from "../teacher-reports/classroom-report/classroomPDF/ClassroomPDF";
import ClassroomChart from "../teacher-analysis/classroom-analysis/ClassroomCharts";

const TeacherClassroomReport = () => {
  const { getClassroomTeacherStudents, getClassroomSubjects } = useLoaderData();
  const { teachersJoinClass, studentsJoinClass, classroom } =
    getClassroomTeacherStudents;

  const {
    compulsorySubjects,
    optionalSubjects,
    compulsorySubjectsCount,
    optionalSubjectsCount,
  } = getClassroomSubjects;

  useEffect(() => {
    gsap.fromTo(
      ".teacher-classroom-report-div",
      { x: 1000 },
      { x: 0, ease: "power4" }
    );
  }, []);

  return (
    <div
      className={`teacher-classroom-report-div ${styles["teacher-classroom-report"]}`}
    >
      <div>
        <ClassroomChart
          studentsData={studentsJoinClass}
          teachersData={teachersJoinClass}
          compulsorySubjects={compulsorySubjects}
          optionalSubjects={optionalSubjects}
          compulsoryCount={compulsorySubjectsCount}
          optionalCount={optionalSubjectsCount}
        />
      </div>
      <div>
        <ClassroomPDF
          classroomName={classroom.classroom_name}
          teachersData={teachersJoinClass}
          studentsData={studentsJoinClass}
          compulsorySubjects={compulsorySubjects}
          optionalSubjects={optionalSubjects}
        />
      </div>
    </div>
  );
};

export const loader = async ({ request, params }) => {
  const { classroomId } = params;

  const getClassroomTeacherStudents = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/classroom/get-classroom-teacher-students/${classroomId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (!getClassroomTeacherStudents.ok) {
    throw json(
      { message: getClassroomTeacherStudents.statusText },
      { status: getClassroomTeacherStudents.status }
    );
  }

  const getClassroomSubjects = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/subject/classroom-subjects?classId=${classroomId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (!getClassroomSubjects.ok) {
    throw json(
      { message: getClassroomSubjects.statusText },
      { status: getClassroomSubjects.status }
    );
  }

  const data = {
    getClassroomTeacherStudents: await getClassroomTeacherStudents.json(),
    getClassroomSubjects: await getClassroomSubjects.json(),
  };

  return data;
};

export default TeacherClassroomReport;
