import React, { useState, useEffect } from "react";
import {
  Form,
  json,
  redirect,
  useLoaderData,
  useParams,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

//^ stylesheet
import styles from "../../../scss/pages/teacher/subject/subroot/TeacherSubmittedAssignment.module.scss";

//^ components
import UnderLine from "../../../components/UI/underline/UnderLine";
import Student from "../../../components/teacher/subject/root/assignment/root/submittedAssignment/Student";
import StatusGrade from "../../../components/teacher/subject/root/assignment/root/submittedAssignment/StatusGrade";
import FeedBack from "../../../components/teacher/subject/root/assignment/root/submittedAssignment/FeedBack";
import SubmittedAttachments from "../../../components/teacher/subject/root/assignment/root/submittedAssignment/SubmittedAttachments";

//^ auth
import { getAuthToken } from "../../../utils/auth";
import PrimaryBtn from "../../../components/UI/Buttons/PrimaryBtn";
import LoadingWheel from "../../../components/UI/loading/LoadingWheel";

const TeacherSubmittedAssignment = () => {
  //^ redux selectors
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ submit hook
  const submit = useSubmit();

  //^ state
  const [feedbackIsValid, setFeedbackIsValid] = useState(false);
  const [statusGradeIsValid, setStatusGradeIsValid] = useState(false);

  //^ params
  const { subjectId, assignmentId, submittedAssignmentId } = useParams();

  //^ navigation
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  //^ loader data
  const { getAssignment } = useLoaderData();
  const { studentFullName, student, assignment, submittedAssignment } =
    getAssignment;

  useEffect(() => {
    gsap.fromTo(
      ".submit-assignment-article",
      { x: 1000 },
      { x: 0, ease: "power4" }
    );
  }, []);

  const dueDifference = assignment.end_date
    ? new Date(submittedAssignment.submitted_on) > new Date(assignment.end_date)
      ? "Late submitted"
      : "Submitted"
    : "Submitted";

  const getFeedbackData = (feedIsValid) => {
    setFeedbackIsValid(feedIsValid);
  };

  const getStatusGradeData = (statusGrade) => {
    setStatusGradeIsValid(statusGrade);
  };

  const formIsValid = statusGradeIsValid || feedbackIsValid;

  return (
    <>
      <article
        className={`submit-assignment-article ${styles["article"]} ${themeMode && styles["dark"]}`}
      >
        <h2>Submission Detail</h2>
        <UnderLine className={styles["underline"]} />

        <div className={styles["submission-content"]}>
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
              grade={submittedAssignment.grade && submittedAssignment.grade }
              submissionStatus={dueDifference}
              themeMode={themeMode}
              totalMarks={assignment.total_marks}
              onStatusGrade={getStatusGradeData}
            />

            <FeedBack
              themeMode={themeMode}
              feedBack={submittedAssignment.feedback}
              studentName={studentFullName}
              onFeedBack={getFeedbackData}
            />

            <SubmittedAttachments files={submittedAssignment.submitted_files} />

            <div className={styles["primary-btn"]}>
              <PrimaryBtn
                className={"primary-button"}
                disabled={isSubmitting || !formIsValid}
              >
                {isSubmitting ? <LoadingWheel /> : "Assign"}
              </PrimaryBtn>
            </div>
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

  const { submittedAssignmentId } = params;

  const formData = {
    feedback: data.get("feedback"),
    grade: data.get("grade"),
    submittedAssignmentId,
  };

  const assignSubmittedAssignment = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/assignment/assign-submitted-assignment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(formData),
    }
  );

  if (
    assignSubmittedAssignment.status === 401 ||
    assignSubmittedAssignment.status === 403
  ) {
    const response = await assignSubmittedAssignment.json();

    throw json(
      { message: response.message },
      { status: assignSubmittedAssignment.status }
    );
  }

  return redirect(
    `/teacher/subject/${params.subjectId}/assignment/${params.assignmentId}`
  );
};

export default TeacherSubmittedAssignment;
