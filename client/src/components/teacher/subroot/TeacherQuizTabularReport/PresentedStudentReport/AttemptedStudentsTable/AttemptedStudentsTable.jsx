import React, { Fragment } from "react";

import styles from "./AttemptedStudentsTable.module.scss";
import SmallEmptyFolder from "../../../../../UI/Icons/EmptyFolder/SmallEmptyFolder";

const AttemptedStudentsTable = ({ themeMode, studentsData }) => {
  let count = 1;

  return (
    <div
      className={`${styles["attempted-student-table"]} ${
        themeMode && styles["dark"]
      }`}
    >
      <div className={styles["table-heading"]}>
        <div className={styles["table-row"]}>
          <p>ID</p>
        </div>
        <div className={styles["table-row"]}>
          <p>Student Name</p>
        </div>
        <div className={styles["table-row"]}>
          <p>Grade</p>
        </div>
        <div className={styles["table-row"]}>
          <p>Student status</p>
        </div>
        <div className={styles["table-row"]}>
          <p>Submitted On</p>
        </div>
        <div className={styles["table-row"]}>
          <p>Start time</p>
        </div>
        <div className={styles["table-row"]}>
          <p>End time</p>
        </div>
      </div>
      {studentsData.length !== 0 ? (
        <div className={styles["table-content"]}>
          {studentsData.map((student) => {
            const counts = count++;

            //^ formatting the received start_date and end_date from the backend.
            const startDateString = student.start_time;
            const startDate = new Date(startDateString);
            const startTimeString = startDate.toLocaleTimeString("en-US");

            const submittedOnDateString = student.submitted_on;
            const submittedOnDate = new Date(submittedOnDateString);
            const submittedOnFormatted = submittedOnDate.toLocaleDateString(
              "en-US",
              {
                day: "numeric",
                month: "long",
              }
            );

            const endDateString = student.end_time;
            const endDate = new Date(endDateString);
            const endTimeString = endDate.toLocaleTimeString("en-US");

            return (
              <Fragment key={student.submitted_quiz_id}>
                <div className={styles["table-data"]}>
                  <div className={styles["data"]}>
                    <p>{counts}</p>
                  </div>
                  <div className={styles["data"]}>
                    <p>
                      {student.student.student_first_name}{" "}
                      {student.student.student_last_name}
                    </p>
                  </div>
                  <div className={styles["data"]}>
                    <p>
                      {student.obtained_marks}/{student.quiz.total_marks}
                    </p>
                  </div>
                  <div className={styles["data"]}>
                    <p>{student.status}</p>
                  </div>
                  <div className={styles["data"]}>
                    <p>{submittedOnFormatted}</p>
                  </div>
                  <div className={styles["data"]}>
                    <p>{startTimeString}</p>
                  </div>
                  <div className={styles["data"]}>
                    <p>{endTimeString}</p>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <SmallEmptyFolder />
        </div>
      )}
    </div>
  );
};

export default AttemptedStudentsTable;
