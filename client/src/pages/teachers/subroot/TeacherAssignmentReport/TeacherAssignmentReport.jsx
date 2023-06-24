import React, { useEffect } from "react";
import { useLoaderData, json } from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

//^ styles
import styles from "./TeacherAssignmentReport.module.scss";

//^ auth
import { getAuthToken } from "../../../../utils/auth";

//^ components
import SubmittedAssignmentTable from "../../../../components/teacher/Dashboard/subroot/TeacherAssignmentReport/SubmittedAssignmentTable";
import NotSubmittedAssignmentReport from "../../../../components/teacher/Dashboard/subroot/TeacherAssignmentReport/NotSubmittedAssignmentReport/NotSubmittedAssignmentReport";
import SubmittedAssignmentBarChart from "./SubmittedAssignmentBarChart/SubmittedAssignmentBarChart";
import PendingAssignmentLineChart from "./PendingAssignmentLineChart/PendingAssignmentLineChart";

const TeacherAssignmentReport = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);
  const { getAssignment, getSubmittedAndJoinedAssignments } = useLoaderData();

  const { assignment } = getAssignment;

  const { submittedAssignments, joinedAssignments } =
    getSubmittedAndJoinedAssignments;

  useEffect(() => {
    gsap.fromTo(
      ".teacher-assignment-report-section",
      { x: 1000 },
      { x: 0, ease: "power4" }
    );
  }, []);

  return (
    <section
      className={`teacher-assignment-report-section ${
        styles["teacher-assignment-report"]
      } ${themeMode && styles["dark"]}`}
    >
      {/*
        //^ Graph report
      */}
      <div className={styles["assignment-graph-report"]}>
        <div className={styles["submitted-assignment-graph-report"]}>
          <h5>Top 10 Students' Grades in {assignment.topic} Assignment</h5>
          <SubmittedAssignmentBarChart
            themeMode={themeMode}
            submittedAssignments={submittedAssignments}
          />
        </div>
        <div className={styles["not-submitted-assignment-graph-report"]}>
          <h5> Not Submitted Assignments Line Chart</h5>
          <PendingAssignmentLineChart
            joinedAssignmentsData={joinedAssignments}
          />
        </div>
      </div>

      {/* //^ Tabular reports */}
      <div className={`${styles["assignment-tabular-report"]} `}>
        <SubmittedAssignmentTable
          themeMode={themeMode}
          assignmentTopic={assignment.topic}
          classroomName={assignment.classroom.classroom_name}
          submittedAssignmentsData={submittedAssignments}
          assignmentName={assignment.topic}
          subjectName={assignment.subject.subject_name}
        />
        <NotSubmittedAssignmentReport
          themeMode={themeMode}
          assignmentName={assignment.topic}
          classroomName={assignment.classroom.classroom_name}
          subjectName={assignment.subject.subject_name}
          submittedAssignmentsData={submittedAssignments}
          joinedAssignmentsData={joinedAssignments}
        />
      </div>
    </section>
  );
};

export const loader = async ({ request, params }) => {
  const getAssignment = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/assignment/get-assignment/${params.assignmentId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (getAssignment.status === 401 || getAssignment.status === 403) {
    const response = await getAssignment.json();

    throw json({ message: response.message }, { status: getAssignment.status });
  }

  if (!getAssignment.ok) {
    console.log(await getAssignment.json());
    throw json(
      { message: getAssignment.statusText },
      { status: getAssignment.status }
    );
  }

  const getSubmittedAndJoinedAssignments = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/submitted-assignment/get-joined-and-submitted-assignments/${params.assignmentId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (
    getSubmittedAndJoinedAssignments.status === 401 ||
    getSubmittedAndJoinedAssignments.status === 403
  ) {
    const response = await getSubmittedAndJoinedAssignments.json();

    throw json(
      { message: response.message },
      { status: getSubmittedAndJoinedAssignments.status }
    );
  }

  if (!getSubmittedAndJoinedAssignments.ok) {
    console.log(await getSubmittedAndJoinedAssignments.json());
    throw json(
      { message: getSubmittedAndJoinedAssignments.statusText },
      { status: getSubmittedAndJoinedAssignments.status }
    );
  }

  const data = {
    getAssignment: await getAssignment.json(),
    getSubmittedAndJoinedAssignments:
      await getSubmittedAndJoinedAssignments.json(),
  };

  return data;
};

export default TeacherAssignmentReport;
