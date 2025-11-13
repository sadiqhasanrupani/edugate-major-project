import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gsap } from "gsap";

import {
  getSubmittedAssignmentById,
  assignSubmittedAssignment,
} from "../../../apis/teachers/subject/teacher-submitted-assignment";

import styles from "../../../scss/pages/teacher/subject/subroot/TeacherSubmittedAssignment.module.scss";
import UnderLine from "../../../components/UI/underline/UnderLine";
import Student from "../../../components/teacher/subject/root/assignment/root/submittedAssignment/Student";
import StatusGrade from "../../../components/teacher/subject/root/assignment/root/submittedAssignment/StatusGrade";
import FeedBack from "../../../components/teacher/subject/root/assignment/root/submittedAssignment/FeedBack";
import SubmittedAttachments from "../../../components/teacher/subject/root/assignment/root/submittedAssignment/SubmittedAttachments";
import PrimaryBtn from "../../../components/UI/Buttons/PrimaryBtn";
import LoadingWheel from "../../../components/UI/loading/LoadingWheel";

const TeacherSubmittedAssignment = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);
  const { subjectId, assignmentId, submittedAssignmentId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["submitted-assignment", submittedAssignmentId],
    queryFn: () => getSubmittedAssignmentById(submittedAssignmentId),
  });

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      feedback: data?.submittedAssignment?.feedback || "",
      grade: data?.submittedAssignment?.grade || "",
    },

    validationSchema: Yup.object({
      feedback: Yup.string()
        .min(2, "Enter at least 2 characters")
        .required("Feedback is required"),

      grade: Yup.number()
        .typeError("Grade must be a number")
        .integer("Grade must be an integer")
        .min(0, "Grade must be at least 0")

        // ⭐ THIS is the magic fix
        .when([], {
          is: () => !!data?.assignment?.total_marks,
          then: (schema) =>
            schema.max(
              data.assignment.total_marks,
              `Grade cannot exceed ${data.assignment.total_marks}`
            ),
          otherwise: (schema) => schema, // do nothing until data arrives
        })

        .required("Grade is required"),
    }),

    onSubmit: (values) => {
      mutation.mutate({
        ...values,
        grade: Number(values.grade),
        submittedAssignmentId,
      });
    },
  });

  const mutation = useMutation({
    mutationFn: assignSubmittedAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries(["submitted-assignment", submittedAssignmentId]);
      navigate(`/teacher/subject/${subjectId}/assignment/${assignmentId}`);
    },
  });

  useEffect(() => {
    gsap.fromTo(".submit-assignment-article", { x: 1000 }, { x: 0, ease: "power4" });
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loadingWrapper}>
        <LoadingWheel />
      </div>
    );
  }

  if (isError) return <p>Error: {error.message}</p>;

  const { studentFullName, student, assignment, submittedAssignment } = data;

  const dueDifference =
    assignment.end_date &&
      new Date(submittedAssignment.submitted_on) > new Date(assignment.end_date)
      ? "Late submitted"
      : "Submitted";

  return (
    <article
      className={`submit-assignment-article ${styles.article} ${themeMode && styles.dark
        }`}
    >
      <h2>Submission Detail</h2>
      <UnderLine className={styles.underline} />

      <form onSubmit={formik.handleSubmit} className={styles.submissionContent}>
        <Student
          themeMode={themeMode}
          studentFullName={studentFullName}
          studentImg={student.student_img}
        />

        <StatusGrade
          submissionStatus={dueDifference}
          themeMode={themeMode}
          totalMarks={assignment.total_marks}
          formik={formik}
        />

        <FeedBack
          themeMode={themeMode}
          feedBack={formik.values.feedback}
          studentName={studentFullName}
          formik={formik}
        />

        <SubmittedAttachments files={submittedAssignment?.submitted_files} />

        <div className={styles.primaryBtn} style={{ paddingTop: "1rem" }}>
          <PrimaryBtn
            type="submit"
            disabled={!formik.isValid || !formik.dirty || mutation.isPending}
          >
            {mutation.isPending ? <LoadingWheel /> : "Assign"}
          </PrimaryBtn>
        </div>
      </form>
    </article>
  );
};

export default TeacherSubmittedAssignment;
