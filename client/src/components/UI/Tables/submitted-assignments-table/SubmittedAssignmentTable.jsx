import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//^ stylesheet
import styles from "./SubmittedAssignmentTable.module.scss";

const SubmittedAssignmentTable = ({ submittedAssignments }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);
  let count = 1;

  return (
    <>
      <div
        className={`${styles["student-assignment-table"]} ${
          themeMode && styles["dark"]
        }`}
      >
        <div className={styles["table-heading"]}>
          <div className={styles["table-row"]}>
            <p>SrNo</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Students</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Submitted On</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Grade</p>
          </div>
        </div>
        <div className={styles["table-content"]}>
          {submittedAssignments.map((assignment) => {
            const counts = count++;

            //^ formatting the received end_date from the backend.
            const dateString = assignment.submitted_on;
            const date = new Date(dateString);
            const options = { month: "long", day: "numeric" };
            const formattedDate = date.toLocaleString("en-US", options);

            return (
              <Fragment key={assignment.submitted_assignment_id}>
                <div className={styles["table-data"]}>
                  <div className={styles["data"]}>
                    <p>{counts}</p>
                  </div>
                  <div className={styles["data"]}>
                    <Link to={`${assignment.submitted_assignment_id}`}>
                      {`${assignment.student.student_first_name} ${
                        assignment.student.student_last_name &&
                        assignment.student.student_last_name
                      }`}
                    </Link>
                  </div>
                  <div className={styles["data"]}>
                    <p>{formattedDate}</p>
                  </div>
                  <div className={styles["data"]}>
                    <p>{assignment.grade ? assignment.grade : "0"}/{assignment.assignment.total_marks}</p>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SubmittedAssignmentTable;
