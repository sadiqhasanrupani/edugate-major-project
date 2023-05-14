import React from "react";
import {
  Form,
  json,
  redirect,
  useLoaderData,
  useParams,
} from "react-router-dom";
import { useSelector } from "react-redux";

//^ stylesheet
import styles from "../../../scss/pages/teacher/subject/subroot/TeacherSubmittedAssignment.module.scss";

//^ components
import UnderLine from "../../../components/UI/underline/UnderLine";
import Student from "../../../components/teacher/subject/root/assignment/root/submittedAssignment/Student";
import StatusGrade from "../../../components/teacher/subject/root/assignment/root/submittedAssignment/StatusGrade";
import FeedBack from "../../../components/teacher/subject/root/assignment/root/submittedAssignment/FeedBack"

//^ auth
import { getAuthToken } from "../../../utils/auth";

const TeacherSubmittedAssignment = () => {
  //^ redux selectors
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ params
  const { subjectId, assignmentId, submittedAssignmentId } = useParams();

  //^ loader data
  const { getAssignment } = useLoaderData();
  const { studentFullName, student, assignment, submittedAssignment } =
    getAssignment;

  console.log(getAssignment);

  const dueDifference = assignment.end_date
    ? new Date(submittedAssignment.submitted_on) > new Date(assignment.end_date)
      ? "Late submitted"
      : "Submitted"
    : "Submitted";

  return (
    <>
      <article
        className={`${styles["article"]} ${themeMode && styles["dark"]}`}
      >
        <h2>Submission Detail</h2>
        <UnderLine className={styles["underline"]} />

        <div className={styles['submission-content']}>
          <Student
            themeMode={themeMode}
            studentFullName={studentFullName}
            studentImg={student.student_img}
          />

          <Form
            method="POST"
            action={`/teacher/subject/${subjectId}/assignment/${assignmentId}/${submittedAssignmentId}`}
            className={styles["form"]}
          >
            <StatusGrade
              grade={submittedAssignment.grade ? submittedAssignment.grade : 0}
              submissionStatus={dueDifference}
              themeMode={themeMode}
              totalMarks={assignment.total_marks}
            />

            <FeedBack  />
          </Form>
        </div>
      </article>
    </>
  );
};

export const loader = async ({ request, params }) => {
  const { submittedAssignmentId } = params;

  const getAssignment = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/assignment/get-submitted-assignment-by-submit-id/${submittedAssignmentId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (
    getAssignment.status === 401 ||
    getAssignment.status === 403 ||
    getAssignment.status === 400
  ) {
    const response = await getAssignment.json();

    throw json({ message: response.message }, { status: getAssignment.status });
  }

  if (!getAssignment.ok) {
    throw json(
      { message: getAssignment.statusText },
      { status: getAssignment.status }
    );
  }

  const data = {
    getAssignment: await getAssignment.json(),
  };

  return data;
};

export const action = async ({ request, params }) => {
  const data = await request.formData();

  return redirect(`/teacher/subject/${subjectId}/assignment/${assignmentId}`);
};

export default TeacherSubmittedAssignment;
