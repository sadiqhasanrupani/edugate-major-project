import React, { Fragment } from "react";

import styles from "./SubjectTeacherReportTable.module.scss";

import SmallEmptyFolder from "../../Icons/EmptyFolder/SmallEmptyFolder";

const SubjectTeacherReportTable = ({ themeMode, teachersData }) => {
  let count = 1;

  return (
    <>
      <div
        className={`${styles["teacher-subject-table"]} ${
          themeMode && styles["dark"]
        }`}
      >
        <div className={styles["table-heading"]}>
          <div className={styles["table-row"]}>
            <p>ID</p>
          </div>
          <div className={styles["table-row"]}>
            <p>First name</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Last name</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Email ID</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Phone no.</p>
          </div>
          <div className={styles["table-row"]}>
            <p>DOB</p>
          </div>
          <div className={styles["table-row"]}>
            <p>Joined Date</p>
          </div>
        </div>
        {teachersData.length !== 0 ? (
          <div className={styles["table-content"]}>
            {teachersData.map((teacher) => {
              const counts = count++;

              //^ formatting the received end_date from the backend.
              const dateString = teacher.createdAt;
              const date = new Date(dateString);
              const options = { month: "long", day: "numeric" };
              const formattedDate = date.toLocaleString("en-US", options);

              return (
                <Fragment key={teacher.coTeacher.teacher_id}>
                  <div className={styles["table-data"]}>
                    <div className={styles["data"]}>
                      <p>{counts}</p>
                    </div>
                    <div className={styles["data"]}>
                      <p>{teacher.coTeacher.teacher_first_name}</p>
                    </div>
                    <div className={styles["data"]}>
                      <p>{teacher.coTeacher.teacher_last_name}</p>
                    </div>
                    <div className={styles["data"]}>
                      <p>{teacher.coTeacher.teacher_email}</p>
                    </div>
                    <div className={styles["data"]}>
                      <p>{teacher.coTeacher.teacher_phone_number}</p>
                    </div>
                    <div className={styles["data"]}>
                      <p>{teacher.coTeacher.teacher_dob}</p>
                    </div>
                    <div className={styles["data"]}>
                      <p>{formattedDate}</p>
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

export default SubjectTeacherReportTable;
