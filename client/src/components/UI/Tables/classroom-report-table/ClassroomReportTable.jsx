import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import styles from "./ClassroomReportTable.module.scss";

//^ hook
import formattedDateTime from "../../../../utils/formatted-date-time";

const ClassroomReportTable = ({
  teachersData,
  studentsData,
  teacher,
  student,
  HEADING_ITEMS,
  HEADING_ITEMS_TWO,
}) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  let count = 1;
  return (
    <>
      {teacher && (
        <>
          <div
            className={`${styles["assignment-table"]} ${
              themeMode && styles["dark"]
            }`}
          >
            <div className={styles["table-heading"]}>
              {HEADING_ITEMS.map((item) => {
                return (
                  <Fragment key={item.id}>
                    <div className={styles["table-row"]}>
                      <p>{item.title}</p>
                    </div>
                  </Fragment>
                );
              })}
            </div>
            <div className={styles["table-content"]}>
              {teachersData.map((teacher) => {
                const counts = count++;
                return (
                  <Fragment key={teacher.teacher_id}>
                    <div className={`${styles["table-data"]}`}>
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
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
          <div
            className={`${styles["assignment-table-2"]} ${
              themeMode && styles["dark"]
            }`}
          >
            <div className={styles["table-heading"]}>
              {HEADING_ITEMS_TWO.map((item) => {
                return (
                  <Fragment key={item.id}>
                    <div className={styles["table-row"]}>
                      <p>{item.title}</p>
                    </div>
                  </Fragment>
                );
              })}
            </div>
            <div className={styles["table-content"]}>
              {teachersData.map((teacher) => {
                const joinedDate = formattedDateTime(teacher.createdAt);

                return (
                  <Fragment key={teacher.teacher_id}>
                    <div className={`${styles["table-data"]}`}>
                      <div className={styles["data"]}>
                        <p>{teacher.coTeacher.teacher_phone_number}</p>
                      </div>
                      <div className={styles["data"]}>
                        <p>{teacher.coTeacher.teacher_dob}</p>
                      </div>
                      <div className={styles["data"]}>
                        <p>{joinedDate}</p>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        </>
      )}

      {student && (
        <>
          <div
            className={`${styles["assignment-table"]} ${
              themeMode && styles["dark"]
            }`}
          >
            <div className={styles["table-heading"]}>
              {HEADING_ITEMS.map((item) => {
                return (
                  <Fragment key={item.id}>
                    <div className={styles["table-row"]}>
                      <p>{item.title}</p>
                    </div>
                  </Fragment>
                );
              })}
            </div>
            <div className={styles["table-content"]}>
              {studentsData.map((student) => {
                const counts = count++;
                return (
                  <Fragment key={student.student_id}>
                    <div className={`${styles["table-data"]}`}>
                      <div className={styles["data"]}>
                        <p>{counts}</p>
                      </div>
                      <div className={styles["data"]}>
                        <p>{student.student.student_first_name}</p>
                      </div>
                      <div className={styles["data"]}>
                        <p>{student.student.student_last_name}</p>
                      </div>
                      <div className={styles["data"]}>
                        <p>{student.student.student_email}</p>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
          <div
            className={`${styles["assignment-table-2"]} ${
              themeMode && styles["dark"]
            }`}
          >
            <div className={styles["table-heading"]}>
              {HEADING_ITEMS_TWO.map((item) => {
                return (
                  <Fragment key={item.id}>
                    <div className={styles["table-row"]}>
                      <p>{item.title}</p>
                    </div>
                  </Fragment>
                );
              })}
            </div>
            <div className={styles["table-content"]}>
              {studentsData.map((student) => {
                const joinedDate = formattedDateTime(student.createdAt);
                
                return (
                  <Fragment key={student.student_id}>
                    <div className={`${styles["table-data"]}`}>
                      <div className={styles["data"]}>
                        <p>{student.student.student_phone_number}</p>
                      </div>
                      <div className={styles["data"]}>
                        <p>{student.student.student_dob}</p>
                      </div>
                      <div className={styles["data"]}>
                        <p>{joinedDate}</p>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ClassroomReportTable;
