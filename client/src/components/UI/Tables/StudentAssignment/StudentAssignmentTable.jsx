import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//^ stylesheet
import styles from "./StudentAssignmentTable.module.scss";

const StudentAssignmentTable = ({ assignments }) => {
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
            <p>Assignment</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Topic</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Due Date</p>
          </div>
        </div>
        <div className={styles["table-content"]}>
          {assignments.map((assignment) => {
            const counts = count++;
            if (!assignment.assignment.end_date) {
              return (
                <Fragment key={assignment.assignment.assignment_id}>
                  <div className={`${styles["table-data"]}`}>
                    <div className={styles["data"]}>
                      <p>{counts}</p>
                    </div>
                    <div className={styles["data"]}>
                      <Link to={`${assignment.assignment.assignment_id}`}>
                        {assignment.assignment.topic}
                      </Link>
                    </div>
                    <div className={styles["data"]}>
                      <p>{"No Due"}</p>
                    </div>
                  </div>
                </Fragment>
              );
            }

            //^ formatting the received end_date from the backend.
            const dateString = assignment.assignment.end_date;
            const date = new Date(dateString);
            const options = { month: "long", day: "numeric" };
            const formattedDate = date.toLocaleString("en-US", options);

            return (
              <Fragment key={assignment.assignment_id}>
                <div className={styles["table-data"]}>
                  <div className={styles["data"]}>
                    <p>{counts}</p>
                  </div>
                  <div className={styles["data"]}>
                    <Link to={`${assignment.assignment_id}`}>
                      {assignment.assignment.topic}
                    </Link>
                  </div>
                  <div className={styles["data"]}>
                    <p>{formattedDate}</p>
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

export default StudentAssignmentTable;
