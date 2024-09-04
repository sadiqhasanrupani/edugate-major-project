import React, { Fragment } from "react";

import styles from "./ShowParticipants.module.scss";

import UnderLine from "../../../../../UI/underline/UnderLine";
import NoPeoples from "../../../../../UI/Icons/subjectIcons/people-page/NoPeoples";
import ParticipantsCard from "../../../../../UI/Card/ParticipantsCard/ParticipantsCard";

const ShowParticipants = ({
  themeMode,
  student,
  teacher,
  participantsData,
}) => {
  return (
    <div className={`${styles["participants"]} ${themeMode && styles.dark}}`}>
      {teacher && (
        <>
          <div
            className={`${styles["title"]} ${
              themeMode && styles["dark-title"]
            }`}
          >
            <h2>Teachers</h2>
            <UnderLine themeMode={themeMode} />
          </div>

          <div className={styles["participants-list"]}>
            {participantsData.length > 0 ? (
              participantsData.map((teacher) => {
                if (teacher.admin_teacher_id) {
                  return (
                    <Fragment key={teacher.adminTeacher.teacher_id}>
                      <ParticipantsCard
                        themeMode={themeMode}
                        name={`${teacher.adminTeacher.teacher_first_name} ${teacher.adminTeacher.teacher_last_name}`}
                        emailId={teacher.adminTeacher.teacher_email}
                        profileImg={teacher.adminTeacher.teacher_img}
                      />
                    </Fragment>
                  );
                }

                if (teacher.co_teacher_id) {
                  return (
                    <Fragment key={teacher.coTeacher.teacher_id}>
                      <ParticipantsCard
                        themeMode={themeMode}
                        name={`${teacher.coTeacher.teacher_first_name} ${teacher.coTeacher.teacher_last_name}`}
                        emailId={teacher.coTeacher.teacher_email}
                        profileImg={teacher.coTeacher.teacher_img}
                      />
                    </Fragment>
                  );
                }
              })
            ) : (
              <div align="center">
                <NoPeoples />
              </div>
            )}
          </div>
        </>
      )}

      {student && (
        <>
          <div
            className={`${styles["title"]} ${
              themeMode && styles["dark-title"]
            }`}
          >
            <h2>Student</h2>
            <UnderLine themeMode={themeMode} />
          </div>

          <div className={styles["participants-list"]}>
            {participantsData.length > 0 ? (
              participantsData.map((participant) => {
                return (
                  <Fragment key={participant.student.student_id}>
                    <ParticipantsCard
                      themeMode={themeMode}
                      name={`${participant.student.student_first_name} ${participant.student.student_last_name}`}
                      emailId={participant.student.student_email}
                      profileImg={participant.student.student_img}
                    />
                  </Fragment>
                );
              })
            ) : (
              <div align="center">
                <NoPeoples />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ShowParticipants;
