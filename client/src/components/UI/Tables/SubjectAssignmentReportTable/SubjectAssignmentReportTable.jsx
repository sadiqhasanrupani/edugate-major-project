import React, { Fragment } from "react";

import styles from "./SubjectAssignmentReportTable.module.scss";

import shortenString from "../../../../utils/string-shrinker";

import SmallEmptyFolder from "../../Icons/EmptyFolder/SmallEmptyFolder";

const SubjectAssignmentReportTable = ({ assignments, themeMode }) => {
  let count = 1;
  return (
    <>
      <div
        className={`${styles["assignment-subject-table"]} ${
          themeMode && styles["dark"]
        }`}
      >
        <div className={styles["table-heading"]}>
          <div className={styles["table-row"]}>
            <p>ID</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Topic</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Description</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Total Marks</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Created By</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Start</p>
          </div>
          <div className={styles["table-row"]}>
            <p>End</p>
          </div>
        </div>
        {assignments.length !== 0 ? (
          <div className={styles["table-content"]}>
            {assignments.map((assignment) => {
              const counts = count++;

              //^ formatting the received start_date and end_date from the backend.
              const startDateString = assignment.assignment.start_date;
              const startDate = new Date(startDateString);
              const startOptions = { month: "long", day: "numeric" };
              const startFormattedDate = startDate.toLocaleString(
                "en-US",
                startOptions
              );

              const endDateString = assignment.assignment.end_date;
              const endDate = new Date(endDateString);
              const endOptions = { month: "long", day: "numeric" };
              const endFormattedDate = endDate.toLocaleString(
                "en-US",
                endOptions
              );

              return (
                <Fragment key={assignment.assignment.assignment_id}>
                  <div className={styles["table-data"]}>
                    <div className={styles["data"]}>
                      <p>{counts}</p>
                    </div>
                    <div className={styles["data"]}>
                      <p>{shortenString(assignment.assignment.topic, 15)}</p>
                    </div>
                    <div className={styles["data"]}>
                      <p>{shortenString(assignment.assignment.description, 20)}</p>
                    </div>
                    <div className={styles["data"]}>
                      <p>{assignment.assignment.total_marks}</p>
                    </div>
                    <div className={styles["data"]}>
                      <p>{`${assignment.assignment.teacher.teacher_first_name} ${assignment.assignment.teacher.teacher_last_name}`}</p>
                    </div>
                    <div className={styles["data"]}>
                      <p>{startFormattedDate}</p>
                    </div>
                    <div className={styles["data"]}>
                      <p>{endFormattedDate}</p>
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

export default SubjectAssignmentReportTable;
