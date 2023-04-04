import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// styles
import styles from "../../../scss/components/teacher/Classrooms/JoinedClassrooms.module.scss";

// components
import SecondaryCard from "../../../components/UI/Card/TeacherCard";
import PrimaryCard from "../../../components/UI/Card/CardSecondary";
import { uiAction } from "../../../store/ui-slice";
import JoinClassHeader from "../../../components/teacher/joinedClassroom/JoinClassHeader";
import JoinClassFooter from "../../../components/teacher/joinedClassroom/JoinClassFooter";

const JoinedClassrooms = ({ classroomsData }) => {
  //* themeMode
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  const dispatch = useDispatch();

  const joinFormToggler = () => {
    dispatch(uiAction.joinClassroomFormHandler());
  };

  return (
    <>
      <article
        className={`${styles["article"]} ${
          themeMode ? styles["dark"] : undefined
        }`}
      >
        <h2>Joined Classroom</h2>
        <SecondaryCard className={styles["secondary-card"]}>
          {classroomsData.length !== 0 ? (
            <>
              {classroomsData.map((classroomData) => {
                return (
                  <div key={classroomData.join_classroom_id}>
                    <Link
                      to={`/teacher/join-classroom/${classroomData.join_classroom_id}`}
                    >
                      <PrimaryCard className={styles["primary-card"]}>
                        <JoinClassHeader
                          classroomName={classroomData.classroom.classroom_name}
                          classroomProfileImg={
                            classroomData.classroom.classroom_profile_img
                          }
                        />
                        <JoinClassFooter ClassroomData={classroomData} />
                      </PrimaryCard>
                    </Link>
                  </div>
                );
              })}
            </>
          ) : undefined}
          <div>
            <button className={styles["toggler-btn"]} onClick={joinFormToggler}>
              <PrimaryCard className={styles["join-card"]}>
                Join Classroom
              </PrimaryCard>
            </button>
          </div>
        </SecondaryCard>
      </article>
    </>
  );
};

export default JoinedClassrooms;
