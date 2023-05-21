import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import styles from "./ClassroomReportTable.module.scss";
import { logDOM } from "@testing-library/react";

const ClassroomReportTable = ({
  teachersData,
  studentsData,
  teacher,
  student,
  compulsorySubjectsData,
  compulsorySubject,
  optionalSubjectsData,
  optionalSubjects,
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
                <p>Phone no</p>
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

                  const joinedDateString = teacher.createdAt;
                  const joinedDate = new Date(joinedDateString);
                  const joinedOptions = { month: "long", day: "numeric" };
                  const joinedFormattedDate = joinedDate.toLocaleString(
                    "en-US",
                    joinedOptions
                  );

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
                          <p>{`${teacher.coTeacher.teacher_phone_number}`}</p>
                        </div>
                        <div className={styles["data"]}>
                          <p>{teacher.coTeacher.teacher_dob}</p>
                        </div>
                        <div className={styles["data"]}>
                          <p>{joinedFormattedDate}</p>
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
      )}

      {student && (
        <>
          <div
            className={`${styles["assignment-table"]} ${
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
                <p>Phone no</p>
              </div>
              <div className={styles["table-row"]}>
                <p>DOB</p>
              </div>
              <div className={styles["table-row"]}>
                <p>Joined Date</p>
              </div>
            </div>
            {studentsData.length !== 0 ? (
              <div className={styles["table-content"]}>
                {studentsData.map((student) => {
                  const counts = count++;
                  //^ formatting the received createdAt from the backend.
                  const joinedDateString = student.createdAt;
                  const joinedDate = new Date(joinedDateString);
                  const joinedDateOptions = { month: "long", day: "numeric" };
                  const joinedDateFormattedDate = joinedDate.toLocaleString(
                    "en-US",
                    joinedDateOptions
                  );

                  return (
                    <Fragment key={student.student.student_id}>
                      <div className={styles["table-data"]}>
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
                        <div className={styles["data"]}>
                          <p>{`${student.student.student_phone_number}`}</p>
                        </div>
                        <div className={styles["data"]}>
                          <p>{student.student.student_dob}</p>
                        </div>
                        <div className={styles["data"]}>
                          <p>{joinedDateFormattedDate}</p>
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
      )}

      {compulsorySubject && (
        <>
          <div
            className={`${styles["assignment-table-2"]} ${
              themeMode && styles["dark"]
            }`}
          >
            <div className={styles["table-heading"]}>
              <div className={styles["table-row"]}>
                <p>ID</p>
              </div>
              <div className={styles["table-row"]}>
                <p>Subject name</p>
              </div>
              <div className={styles["table-row"]}>
                <p>Subject status</p>
              </div>
              <div className={styles["table-row"]}>
                <p>Created By</p>
              </div>
              <div className={styles["table-row"]}>
                <p>Created At</p>
              </div>
            </div>
            {compulsorySubjectsData.length !== 0 ? (
              <div className={styles["table-content"]}>
                {compulsorySubjectsData.map((subject) => {
                  const counts = count++;
                  //^ formatting the received createdAt from the backend.
                  const createdAtString = subject.createdAt;
                  const createdAt = new Date(createdAtString);
                  const createdAtOptions = { month: "long", day: "numeric" };
                  const createdAtFormattedDate = createdAt.toLocaleString(
                    "en-US",
                    createdAtOptions
                  );

                  return (
                    <Fragment key={subject.subject_id}>
                      <div className={styles["table-data"]}>
                        <div className={styles["data"]}>
                          <p>{counts}</p>
                        </div>
                        <div className={styles["data"]}>
                          <p>{subject.subject_name}</p>
                        </div>
                        <div className={styles["data"]}>
                          <p>{subject.subject_status}</p>
                        </div>
                        <div className={styles["data"]}>
                          <p>
                            {subject.teacher.teacher_first_name}{" "}
                            {subject.teacher.teacher_last_name}
                          </p>
                        </div>
                        <div className={styles["data"]}>
                          <p>{createdAtFormattedDate}</p>
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
      )}

      {optionalSubjects && (
        <>
          <div
            className={`${styles["assignment-table-2"]} ${
              themeMode && styles["dark"]
            }`}
          >
            <div className={styles["table-heading"]}>
              <div className={styles["table-row"]}>
                <p>ID</p>
              </div>
              <div className={styles["table-row"]}>
                <p>Subject name</p>
              </div>
              <div className={styles["table-row"]}>
                <p>Subject status</p>
              </div>
              <div className={styles["table-row"]}>
                <p>Created By</p>
              </div>
              <div className={styles["table-row"]}>
                <p>Created At</p>
              </div>
            </div>
            {optionalSubjectsData.length !== 0 ? (
              <div className={styles["table-content"]}>
                {optionalSubjectsData.map((subject) => {
                  const counts = count++;
                  //^ formatting the received createdAt from the backend.
                  const createdAtString = subject.createdAt;
                  const createdAt = new Date(createdAtString);
                  const createdAtOptions = { month: "long", day: "numeric" };
                  const createdAtFormattedDate = createdAt.toLocaleString(
                    "en-US",
                    createdAtOptions
                  );

                  return (
                    <Fragment key={subject.subject_id}>
                      <div className={styles["table-data"]}>
                        <div className={styles["data"]}>
                          <p>{counts}</p>
                        </div>
                        <div className={styles["data"]}>
                          <p>{subject.subject_name}</p>
                        </div>
                        <div className={styles["data"]}>
                          <p>{subject.subject_status}</p>
                        </div>
                        <div className={styles["data"]}>
                          <p>
                            {subject.teacher.teacher_first_name}{" "}
                            {subject.teacher.teacher_last_name}
                          </p>
                        </div>
                        <div className={styles["data"]}>
                          <p>{createdAtFormattedDate}</p>
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
      )}
    </>
  );
};

export default ClassroomReportTable;
