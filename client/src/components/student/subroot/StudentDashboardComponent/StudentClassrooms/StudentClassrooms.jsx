import React, { Fragment } from "react";

import styles from "./StudentClassrooms.module.scss";

import PrimaryCard from "../../../../UI/Card/TeacherCard";
import ClassroomCard from "../../../../UI/Card/classroom-card/ClassroomCard";
import SmallEmptyFolder from "../../../../UI/Icons/EmptyFolder/SmallEmptyFolder";

const StudentClassrooms = ({ themeMode, classroomsData }) => {
  return (
    <div className={styles["student-classrooms"]}>
      <PrimaryCard className={styles["primary-card"]}>
        <h5>CLASSROOMS</h5>
        <div className={styles['classrooms']}>
          {classroomsData.length > 0 ? (
            classroomsData.map((classroom) => {
              return (
                <Fragment key={classroom.join_classroom_id}>
                  <ClassroomCard
                    classroomId={classroom.classroom.classroom_id}
                    joinClassroomId={classroom.join_classroom_id}
                    classroomImg={classroom.classroom.classroom_profile_img}
                    classroomName={classroom.classroom.classroom_name}
                    themeMode={themeMode}
                    menu={false}
                    teachers={false}
                  />
                </Fragment>
              );
            })
          ) : (
            <div
              style={{ textAlign: "center" }}
              className={styles["empty-folder"]}
            >
              <SmallEmptyFolder />
            </div>
          )}
        </div>
      </PrimaryCard>
    </div>
  );
};

export default StudentClassrooms;
