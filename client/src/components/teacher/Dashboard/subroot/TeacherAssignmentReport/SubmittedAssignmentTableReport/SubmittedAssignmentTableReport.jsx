import React, { Fragment } from "react";

import styles from "./SubmittedAssignmentTableReport.module.scss";

import SmallEmptyFolder from "../../../../../UI/Icons/EmptyFolder/SmallEmptyFolder";

const SubmittedAssignmentTableReport = ({
  submittedAssignmentsData,
  themeMode,
}) => {
  let count = 1;
  return (
    <>
      <div
        className={`${styles["submitted-assignment-table-report"]} ${
          themeMode && styles["dark"]
        }`}
      >
        <div className={styles["table-heading"]}>
          <div className={styles["table-row"]}>
            <p>SrNo</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Name</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Grade</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Checked by</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Status</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Submitted on</p>
          </div>
        </div>
        {submittedAssignmentsData.length !== 0 ? (
          <div className={styles["table-content"]}>
            {submittedAssignmentsData.map((assignment) => {
              const counts = count++;

              //^ formatting the received createdAt from the backend.
              const submittedOnString = assignment.createdAt;
              const submittedOn = new Date(submittedOnString);
              const submittedOnOptions = { month: "long", day: "numeric" };
              const submittedOnFormattedDate = submittedOn.toLocaleString(
                "en-US",
                submittedOnOptions
              );

              return (
                <Fragment key={assignment.submitted_assignment_id}>
                  <div className={styles["table-data"]}>
                    <div className={styles["data"]}>
                      <p>{counts}</p>
                    </div>
                    <div className={styles["data"]}>
                      <p>
                        {assignment.student.student_first_name}{" "}
                        {assignment.student.student_last_name}
                      </p>
                    </div>
                    <div className={styles["data"]}>
                      <p>
                        {assignment.grade ? `${assignment.grade}` : 0}/
                        {assignment.assignment.total_marks}
                      </p>
                    </div>
                    <div className={styles["data"]}>
                      <p>
                        {assignment.teacher
                          ? `${assignment.teacher.teacher_first_name} ${assignment.teacher.teacher_last_name}`
                          : "-"}
                      </p>
                    </div>
                    <div className={styles["data"]}>
                      <p>{assignment.teacher ? "Checked" : "Not Checked"}</p>
                    </div>
                    <div className={styles["data"]}>
                      <p>{submittedOnFormattedDate}</p>
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        ) : (
          <SmallEmptyFolder />
        )}
      </div>
    </>
  );
};

export default SubmittedAssignmentTableReport;
