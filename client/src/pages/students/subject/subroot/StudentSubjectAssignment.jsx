import React, { useEffect } from "react";
import { json, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

//^ stylesheet
import styles from "../../../../scss/pages/student/subject/subroot/StudentSubjectAssignment.module.scss";

//^ components
import UnderLine from "../../../../components/UI/underline/UnderLine";
import StudentAssignmentTable from "../../../../components/UI/Tables/StudentAssignment/StudentAssignmentTable";
import NoAssignmentPlaceholder from "../../../../components/UI/Icons/Subject/NoAssignmentPlacholder";

//^ auth
import { getAuthToken } from "../../../../utils/auth";

const StudentSubjectAssignments = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ loader data
  const { userJoinedAssignmentData: assignments } = useLoaderData();

  useEffect(() => {
    gsap.fromTo(
      ".student-assignment-article",
      { x: 1000 },
      { x: 0, ease: "power4" }
    );
  }, []);

  return (
    <article
      className={`student-assignment-article ${styles["article"]} ${
        themeMode && styles["dark"]
      }`}
    >
      <h2>Assignments</h2>
      <UnderLine className={styles["underline"]} />
      <div className={styles["subject-assignment-table"]}>
        {assignments.length === 0 ? (
          <div style={{ textAlign: "center" }}>
            <NoAssignmentPlaceholder />
          </div>
        ) : (
          <StudentAssignmentTable assignments={assignments} />
        )}
      </div>
    </article>
  );
};

export const loader = async ({ request, params }) => {
  const { joinSubjectId } = params;

  const getJoinedAssignment = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/assignment/get-joined-assignment/${joinSubjectId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (getJoinedAssignment.status === 401) {
    const response = await getJoinedAssignment.json();

    throw json(
      { message: response.message },
      { status: getJoinedAssignment.status }
    );
  }

  if (!getJoinedAssignment.ok) {
    throw json(
      { message: getJoinedAssignment.statusText },
      { status: getJoinedAssignment.status }
    );
  }

  return getJoinedAssignment;
};

export default StudentSubjectAssignments;
