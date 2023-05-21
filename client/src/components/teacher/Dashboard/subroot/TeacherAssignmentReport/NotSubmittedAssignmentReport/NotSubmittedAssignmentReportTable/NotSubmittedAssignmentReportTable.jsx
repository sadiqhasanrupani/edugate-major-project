import React, { Fragment } from "react";

import styles from "./NotSubmittedAssignmentTableReport.module.scss";

import SmallEmptyFolder from "../../../../../../UI/Icons/EmptyFolder/SmallEmptyFolder";

const NotSubmittedAssignmentReportTable = ({
  themeMode,
  joinedAssignmentsData,
}) => {
  let count = 1;
  return (
    <>
      <div
        className={`${styles["not-submitted-assignment-table-report"]} ${
          themeMode && styles["dark"]
        }`}
      >
        <div className={styles["table-heading"]}>
          <div className={styles["table-row"]}>
            <p>Student ID</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Name</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Email ID</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Due Date</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Subject</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Classroom</p>
          </div>
        </div>
        {joinedAssignmentsData.length !== 0 ? (
          <div className={styles["table-content"]}>
            {joinedAssignmentsData.map((assignment) => {
              const counts = count++;

              //^ formatting the received createdAt from the backend.
              const assignmentDueDateString = assignment.assignment.end_date;
              const assignmentDueDate = new Date(assignmentDueDateString);
              const assignmentDueDateOptions = {
                month: "long",
                day: "numeric",
              };
              const assignmentDueDateFormattedDate =
                assignmentDueDate.toLocaleString(
                  "en-US",
                  assignmentDueDateOptions
                );

              return (
                <Fragment key={assignment.submitted_assignment_id}>
                  {!assignment.submitted_assignment_id && (
                    <Fragment key={assignment.join_assignment_id}>
                      <div className={styles["table-data"]}>
                        <div className={styles["data"]}>
                          <p>{assignment.id}</p>
                        </div>
                        <div className={styles["data"]}>
                          <p>
                            {assignment.student.student_first_name}{" "}
                            {assignment.student.student_last_name}
                          </p>
                        </div>
                        <div className={styles["data"]}>
                          <p>{assignment.student.student_email}</p>
                        </div>
                        <div className={styles["data"]}>
                          <p>
                            {assignment.assignment.end_date
                              ? assignmentDueDateFormattedDate
                              : "No Due"}
                          </p>
                        </div>
                        <div className={styles["data"]}>
                          <p>{assignment.subject.subject_name}</p>
                        </div>
                        <div className={styles["data"]}>
                          <p>{assignment.subject.classroom.classroom_name}</p>
                        </div>
                      </div>
                    </Fragment>
                  )}
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

export default NotSubmittedAssignmentReportTable;
