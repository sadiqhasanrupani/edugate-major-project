import React, { Fragment } from "react";

import styles from "./NotAttemptedStudentsTable.module.scss";
import SmallEmptyFolder from "../../../../../UI/Icons/EmptyFolder/SmallEmptyFolder";

const NotAttemptedStudentsTable = ({ notAttemptedStudents, themeMode }) => {
  let count = 1;

  return (
    <div
      className={`${styles[`not-attempted-students-table`]} ${
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
      {notAttemptedStudents.length !== 0 ? (
        <div className={styles["table-content"]}>
          {notAttemptedStudents.map((student) => {
            const counts = count++;

            //^ formatting the received start_date and end_date from the backend.
            const dueDateString = student.quiz.end_date;
            const dueDate = new Date(dueDateString);
            const dueDateFormatted = dueDate.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
            });

            return (
              <Fragment key={student.join_quiz_id}>
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
                    <p>{student.student.student_email}</p>
                  </div>
                  <div className={styles["data"]}>
                    <p>{dueDateFormatted}</p>
                  </div>
                  <div className={styles["data"]}>
                    <p>{student.quiz.subject.subject_name}</p>
                  </div>
                  <div className={styles["data"]}>
                    <p>{student.quiz.classroom.classroom_name}</p>
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
  );
};

export default NotAttemptedStudentsTable;
