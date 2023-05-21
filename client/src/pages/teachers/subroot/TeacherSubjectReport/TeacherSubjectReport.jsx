import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

import styles from "./TeacherSubjectReport.module.scss";

import SubjectTeacherReport from "./SubjectTeacherReport/SubjectTeacherReport";
import SubjectStudentReport from "./SubjectStudentReport/SubjectStudentReport";
import SubjectAssignmentReport from "./SubjectAssignmentReport/SubjectAssignmentReport";
import SubjectTeacherStudentDonutChart from "./SubjectTeacherStudentDonutChart/SubjectTeacherStudentDonutChart";
import SubjectStudentBarChart from "./SubjectStudentLineChart/SubjectStudentBarChart";
import SubjectAssignmentBarChart from "./SubjectAssignmentBarChart/SubjectAssignmentPolarChart";

import { getAuthToken } from "../../../../utils/auth";

const TeacherSubjectReport = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);
  const { subjectTeacher } = useLoaderData();

  const { students, teachers, assignments, subjectName } = subjectTeacher;

  useEffect(() => {
    gsap.fromTo(
      ".teacher-subject-report-section",
      { x: 1000 },
      { x: 0, ease: "power4" }
    );
  }, []);

  return (
    <section
      className={`teacher-subject-report-section ${styles["teacher-subject-report"]}`}
    >
      <div className={styles["report-charts"]}>
        <div className={styles["doughnut-chart"]}>
          <h5>Assignment Insights: Student Participation</h5>

          <SubjectTeacherStudentDonutChart
            assignmentsData={assignments}
            studentsData={students}
          />
        </div>
        <div className={styles["student-line-chart"]}>
          <h5>Student Line Chart</h5>
          <SubjectStudentBarChart studentsData={students} />
        </div>
        <div className={styles["assignment-bar-chart"]}>
          <h5>Assignment Analysis: Total Marks</h5>
          <SubjectAssignmentBarChart assignmentsData={assignments} />
        </div>
      </div>
      <SubjectTeacherReport
        subjectName={subjectName}
        teachersData={teachers}
        themeMode={themeMode}
      />
      <div className={`${styles["student-report"]}`}>
        <SubjectStudentReport
          subjectName={subjectName}
          studentsData={students}
          themeMode={themeMode}
        />
      </div>
      <div className={`${styles["student-assignment"]}`}>
        <SubjectAssignmentReport
          subjectName={subjectName}
          assignments={assignments}
          themeMode={themeMode}
        />
      </div>
    </section>
  );
};

export const loader = async ({ request, params }) => {
  const subjectTeacher = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/join-subject/get-subject-teachers-students-assignments/${params.joinSubjectId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (!subjectTeacher.ok) {
    console.log(await subjectTeacher.json());
    throw json(
      { message: subjectTeacher.statusText },
      { status: subjectTeacher.status }
    );
  }

  const data = {
    subjectTeacher: await subjectTeacher.json(),
  };

  return data;
};

export default TeacherSubjectReport;
