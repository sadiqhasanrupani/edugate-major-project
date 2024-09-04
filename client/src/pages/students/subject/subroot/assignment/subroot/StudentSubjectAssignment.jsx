import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLoaderData, json, useParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";

//^ stylesheet
import styles from "./StudentSubjectAssignment.module.scss";

//^ components
import SubjectAssignmentHeader from "../../../../../../components/teacher/subject/subroot/SubjectAssignmentHeader";
import SubjectAssignmentDates from "../../../../../../components/teacher/subject/subroot/AssignmentDates";
import SubjectAssignmentMarks from "../../../../../../components/subject/subroot/assignment/subroot/AssignmentMarks";
import AssignmentFiles from "../../../../../../components/subject/subroot/assignment/subroot/AssignmentFiles";
import SubjectSubmitAssignment from "../../../../../../components/student/subject/subroot/assignment/subroot/subject-submit-assignment/SubjectSubmitAssignment";
import SubjectAssignmentGrades from "../../../../../../components/student/subject/subroot/assignment/subroot/subject-assignment-grades/SubjectAssignmentGrades";
import PrimaryBtn from "../../../../../../components/UI/Buttons/PrimaryBtn";
import SecondaryCard from "../../../../../../components/UI/Card/CardSecondary";
import SuccessModel from "../../../../../../components/model/success-model/SuccessModel";
import ErrorModel from "../../../../../../components/model/error-model/ErrorModel";

//^ action
import { uiAction } from "../../../../../../store/ui-slice";

//^ auth
import { getAuthToken } from "../../../../../../utils/auth";
import LoadingWheel from "../../../../../../components/UI/loading/LoadingWheel";

const StudentSubjectAssignment = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);
  const isSuccessSubmissionAssignment = useSelector(
    (state) => state.ui.isSuccessSubmissionAssignment
  );
  const isErrorSubmissionAssignment = useSelector(
    (state) => state.ui.isErrorSubmissionAssignment
  );

  //^ ref
  const refData = useRef({});

  //^ state
  const [submittedFiles, setSubmittedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updateAssignIsLoading, setUpdateAssignIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [responseMessage, setResponseMessage] = useState(null);

  //^ subject Id params
  const { joinSubjectId, assignmentId } = useParams();

  //^ navigate hook
  const navigate = useNavigate();

  //^ dispatch action hook
  const dispatch = useDispatch();

  //^ loader-data
  const { getAssignment, getSubmittedAssignment: submittedAssignment } =
    useLoaderData();
  const { assignment } = getAssignment;

  const { submittedAssignmentData } = submittedAssignment;

  const todaysDate = new Date();
  const isDueDate =
    assignment.end_date && todaysDate > new Date(assignment.end_date);

  useEffect(() => {
    gsap.fromTo(
      ".student-subject-assignment-article",
      { x: 1000 },
      { x: 0, ease: "power4" }
    );
  }, []);

  const getSubmitAssignment = (files) => {
    setSubmittedFiles(files);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(uiAction.closeSuccessSubmissionAssignment());
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [responseMessage]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(uiAction.closeErrorSubmissionAssignment());
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [errorMessage]);

  //^ submitting assignment handler
  const submitAssignmentHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    //^ creating a formData constant
    const formData = new FormData();

    //^ getting the current date
    const todaysDate = new Date();

    formData.append("assignmentId", assignment.assignment_id);
    submittedFiles.forEach((file) => {
      formData.append("submittedFiles", file);
    });
    formData.append("joinSubjectId", joinSubjectId);
    formData.append("submittedDate", todaysDate);

    const postSubmitAssignment = await fetch(
      `${process.env.REACT_APP_HOSTED_URL}/assignment/submit-assignment`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: formData,
      }
    );

    if (
      postSubmitAssignment.status === 401 ||
      postSubmitAssignment === 403 ||
      !postSubmitAssignment.ok
    ) {
      setIsLoading(false);
      const response = await postSubmitAssignment.json();

      errorMessage({
        message: response.message,
        status: postSubmitAssignment.status,
      });
    }

    setIsLoading(false);

    //^ storing the result data into the response state.
    const response = await postSubmitAssignment.json();
    setResponseMessage({
      message: response.message,
      status: postSubmitAssignment.status,
    });

    dispatch(uiAction.openSuccessSubmissionAssignment());
    setSubmittedFiles([]);
    // navigate(`/student/subject/${joinSubjectId}/assignment/${assignmentId}`);

  };

  //^ to update a assignment which is submitted then this function will handle the updating part.
  const updatedSubmitAssignmentHandler = async (e) => {
    e.preventDefault();

    setUpdateAssignIsLoading(true);

    //^ creating a formData constant
    const formData = new FormData();

    formData.append("assignmentId", assignment.assignment_id);
    submittedFiles.forEach((file) => {
      formData.append("submittedFiles", file);
    });
    formData.append("joinSubjectId", joinSubjectId);

    const postUpdateSubmitAssignment = await fetch(
      `${process.env.REACT_APP_HOSTED_URL}/assignment/update-submitted-assignment`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: formData,
      }
    );

    if (
      postUpdateSubmitAssignment.status === 401 ||
      postUpdateSubmitAssignment === 403
    ) {
      setUpdateAssignIsLoading(false);
      const response = await postUpdateSubmitAssignment.json();

      errorMessage({
        message: response.message,
        status: postUpdateSubmitAssignment.status,
      });
    }

    if (!postUpdateSubmitAssignment.ok) {
      setUpdateAssignIsLoading(false);
      dispatch(uiAction.openErrorSubmissionAssignment());

      setErrorMessage({
        message: `${postUpdateSubmitAssignment.status} ${postUpdateSubmitAssignment.statusText}`,
      });
    }

    setUpdateAssignIsLoading(false);

    //^ storing the result data into the response state.
    const response = await postUpdateSubmitAssignment.json();
    setResponseMessage({
      message: response.message,
      status: postUpdateSubmitAssignment.status,
    });

    dispatch(uiAction.openSuccessSubmissionAssignment());

    navigate(`/student/subject/${joinSubjectId}/assignment/${assignmentId}`);
  };

  return (
    <>
      {isErrorSubmissionAssignment && (
        <ErrorModel>{errorMessage && errorMessage.message}</ErrorModel>
      )}
      {isSuccessSubmissionAssignment && (
        <SuccessModel>
          {responseMessage && responseMessage.message}
        </SuccessModel>
      )}
      <article
        className={`student-subject-assignment-article ${styles["article"]} ${
          themeMode && styles["dark"]
        }`}
      >
        <SubjectAssignmentHeader
          topic={assignment.topic}
          description={assignment.description}
          dueDate={assignment.end_date}
        />
        <div className={styles["margin-1"]}>
          <SubjectAssignmentDates
            startDate={assignment.start_date}
            endDate={assignment.end_date}
          />
        </div>
        <div className={`${styles["margin-2"]} ${styles["flex"]}`}>
          <SubjectAssignmentMarks totalMarks={assignment.total_marks} />
          <SubjectAssignmentGrades
            grade={assignment.total_marks ? assignment.total_marks : null}
            obtainedMarks={
              submittedAssignmentData &&
              submittedAssignmentData.grade &&
              submittedAssignmentData.grade
            }
          />
        </div>
        <div className={`${styles["margin-2"]}`}>
          <AssignmentFiles files={assignment.files} />
          <SecondaryCard className={styles["secondary-card"]}>
            <h5 className={styles['feedback-h5']} >FEEDBACK</h5>
            <div className={styles["feedback"]}>
              <>
                {submittedAssignmentData && submittedAssignmentData.teacher ? (
                  <>
                    <div className={styles["teacher-feedback"]}>
                      <img
                        src={
                          submittedAssignmentData &&
                          submittedAssignmentData.teacher.teacher_img
                        }
                        alt="teacher-profile-img"
                      />
                      <h5>
                        {submittedAssignmentData.teacher.teacher_first_name}{" "}
                        {submittedAssignmentData.teacher.teacher_last_name}
                      </h5>
                    </div>
                    <div className={styles["feedback-description"]}>
                      <p>{submittedAssignmentData.feedback}</p>
                    </div>
                  </>
                ) : (
                  "No feedback yet"
                )}
              </>
            </div>
          </SecondaryCard>
        </div>
        <div className={`${styles["margin-2"]} ${styles["flex-column"]}`}>
          <SubjectSubmitAssignment
            submittedFiles={
              submittedAssignmentData !== null
                ? submittedAssignmentData.submitted_files
                : []
            }
            onSubjectSubmitAssignment={getSubmitAssignment}
          />
          <div className={`${styles["primary-btn"]}`}>
            {submittedAssignmentData !== null ? (
              <PrimaryBtn
                className={`${styles["primary-button"]} ${
                  submittedFiles.length === 0 && styles["disable-submit"]
                } ${isDueDate && styles["disabled"]} ${
                  updateAssignIsLoading && styles["disable-submit"]
                }`}
                disabled={
                  isDueDate ||
                  submittedFiles.length === 0 ||
                  updateAssignIsLoading
                }
                onClick={updatedSubmitAssignmentHandler}
              >
                {updateAssignIsLoading ? <LoadingWheel /> : "Resubmit"}
              </PrimaryBtn>
            ) : (
              <PrimaryBtn
                disabled={isDueDate | (submittedFiles.length === 0) | isLoading}
                className={`${styles["primary-button"]} ${
                  isDueDate && styles["disabled"]
                } ${
                  !isDueDate &&
                  submittedFiles.length === 0 &&
                  styles["disable-submit"]
                } ${isLoading && styles["disable-submit"]}`}
                onClick={submitAssignmentHandler}
              >
                {isLoading ? (
                  <LoadingWheel />
                ) : isDueDate ? (
                  "Can't submit"
                ) : (
                  "Turn In"
                )}
              </PrimaryBtn>
            )}
          </div>
        </div>
      </article>
    </>
  );
};

export const loader = async ({ request, params }) => {
  const { assignmentId } = params;

  const getAssignment = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/assignment/get-assignment/${assignmentId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (getAssignment.status === 401 || getAssignment.status === 403) {
    const response = await getAssignment.json();

    throw json({ message: response.message }, { status: response.status });
  }

  if (!getAssignment.ok) {
    throw json(
      { message: getAssignment.statusText },
      { status: getAssignment.status }
    );
  }

  const getSubmittedAssignment = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/assignment/get-submitted-assignment/${params.assignmentId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (
    getSubmittedAssignment.status === 401 ||
    getSubmittedAssignment.status === 403
  ) {
    const response = await getSubmittedAssignment.json();

    throw json(
      { message: response.message },
      { status: getSubmittedAssignment.status }
    );
  }

  if (
    getSubmittedAssignment.status === 401 ||
    getSubmittedAssignment.status === 403
  ) {
    const response = await getSubmittedAssignment.json();

    throw json(
      { message: response.message },
      { status: getSubmittedAssignment.status }
    );
  }

  if (!getSubmittedAssignment.ok) {
    const response = await getSubmittedAssignment.json();

    console.log(response);

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

export default StudentSubjectAssignment;
