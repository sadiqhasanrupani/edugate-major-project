import React from "react";
import { json, useLoaderData } from "react-router-dom";

//^ stylesheet
import styles from "../../../scss/pages/teacher/dashboard/TeacherClassroomReport.module.scss"

//^ auth
import { getAuthToken } from "../../../utils/auth";

//^ components
import ClassroomPDF from "../teacher-reports/classroom-report/classroomPDF/ClassroomPDF";
import ClassroomChart from "../teacher-analysis/classroom-analysis/ClassroomCharts";

const TeacherClassroomReport = () => {
  const { getClassroomTeacherStudents } = useLoaderData();
  const { teachersJoinClass, studentsJoinClass, classroom } =
    getClassroomTeacherStudents;

  return (
    <div className={styles['teacher-classroom-report']}>
      <div>
        <ClassroomChart
          studentsData={studentsJoinClass}
          teachersData={teachersJoinClass}
        />
      </div>
      <div>
        <ClassroomPDF
          classroomName={classroom.classroom_name}
          teachersData={teachersJoinClass}
          studentsData={studentsJoinClass}
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

  const data = {
    getClassroomTeacherStudents: await getClassroomTeacherStudents.json(),
  };

  return data;
};

export default TeacherClassroomReport;
