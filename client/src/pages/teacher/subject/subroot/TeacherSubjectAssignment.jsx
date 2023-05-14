import React from "react";
import { json, useLoaderData } from "react-router-dom";

//^ styles
import styles from "../../../../scss/pages/teacher/subject/subroot/TeacherSubjectAssignment.module.scss";

//^ component
import SubjectAssignmentHeader from "../../../../components/teacher/subject/subroot/SubjectAssignmentHeader";
import AssignmentDates from "../../../../components/teacher/subject/subroot/AssignmentDates";
import AssignmentMarks from "../../../../components/subject/subroot/assignment/subroot/AssignmentMarks";
import AssignmentFiles from "../../../../components/subject/subroot/assignment/subroot/AssignmentFiles";
import AssignmentSubmissions from "../../../../components/subject/subroot/assignment/subroot/AssignmentSubmissions";

//^ auth
import { getAuthToken } from "../../../../utils/auth";

const TeacherSubjectAssignment = () => {
  const { getAssignment, getSubmittedAssignment } = useLoaderData();

  const { assignment } = getAssignment;
  const { submittedAssignments } = getSubmittedAssignment;

  return (
    <>
      <header className={styles["headers"]}>
        <SubjectAssignmentHeader
          assignmentId={assignment.assignment_id}
          description={assignment.description}
          topic={assignment.topic}
          dueDate={assignment.end_date}
          show={true}
        />
      </header>
      <main className={styles["main"]}>
        <div className={styles["assignment-dates"]}>
          <AssignmentDates
            startDate={assignment.start_date}
            endDate={assignment.end_date}
          />
        </div>
        <div className={styles["assignment-marks"]}>
          <AssignmentMarks totalMarks={assignment.total_marks} />
        </div>
        <div className={styles["assignment-files"]}>
          <AssignmentFiles files={assignment.files} />
        </div>
        <div className={styles["assignment-submissions"]}>
          <AssignmentSubmissions submittedAssignments={submittedAssignments} />
        </div>
      </main>
    </>
  );
};

export const loader = async ({ request, params }) => {
  const { assignmentId, subjectId } = await params;

  const getAssignment = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/assignment/get-assignment/${assignmentId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (getAssignment.status == 401) {
    const response = await getAssignment.json();

    throw json({ message: response.message }, { status: getAssignment.status });
  }

  if (!getAssignment.ok) {
    throw json(
      { message: getAssignment.statusText },
      { status: getAssignment.status }
    );
  }

  const getSubmittedAssignment = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/assignment/submitted-assignments?assignmentId=${assignmentId}&subjectId=${subjectId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (
    getSubmittedAssignment.status == 401 ||
    getSubmittedAssignment.status === 403
  ) {
    const response = await getSubmittedAssignment.json();

    throw json(
      { message: response.message },
      { status: getSubmittedAssignment.status }
    );
  }

  if (!getSubmittedAssignment.ok) {
    throw json(
      { message: getSubmittedAssignment.statusText },
      { status: getSubmittedAssignment.status }
    );
  }

  const data = {
    getAssignment: await getAssignment.json(),
    getSubmittedAssignment: await getSubmittedAssignment.json(),
  };

  return data;
};

export default TeacherSubjectAssignment;
