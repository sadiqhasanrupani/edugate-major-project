//^ dependencies
import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

//^ styles
import styles from "../../../scss/components/student/subroot/StudentJoinClassroom.module.scss";

//^ components
import PrimaryCard from "../../../components/UI/Card/TeacherCard";
import SecondaryCard from "../../../components/UI/Card/CardSecondary";
import StudentJoinClassroomHeader from "../../../components/student/subroot/StudentJoinClassroomHeader";
import StudentJoinClassroomFooter from "../../../components/student/subroot/StudentJoinClassroomFooter";

//^ actions
import { uiAction } from "../../../store/ui-slice";

const StudentJoinClassroom = ({ data }) => {
  //& Hooks thingy ============================================================================
  //* themeMode
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //* dispatch func,
  const dispatch = useDispatch();
  //& =========================================================================================

  //^ Toggler func,
  const JoinClassroomToggler = () => {
    dispatch(uiAction.ToggleStudentJoinClassroom());
  };

  return (
    <>
      <article
        className={`${styles["article"]} ${themeMode && styles["dark"]}`}
      >
        <PrimaryCard className={styles["primary-card"]}>
          <h4>Joined Classroom</h4>

          <div className={styles["join-classrooms-div"]}>
            {data.map((joinClassroom) => {
              return (
                <Fragment key={joinClassroom.join_classroom_id}>
                  <SecondaryCard className={styles["secondary-card"]}>
                    <StudentJoinClassroomHeader
                      classroomImg={
                        joinClassroom.classroom.classroom_profile_img
                      }
                      classroomName={joinClassroom.classroom.classroom_name}
                      joinClassroomId={joinClassroom.join_classroom_id}
                    />
                    <StudentJoinClassroomFooter
                      classroomId={joinClassroom.classroom.classroom_id}
                    />
                  </SecondaryCard>
                </Fragment>
              );
            })}
            <button onClick={JoinClassroomToggler}>
              <SecondaryCard
                className={`${styles["secondary-card"]} ${styles["join-class"]}`}
              >
                Join Classroom
              </SecondaryCard>
            </button>
          </div>
        </PrimaryCard>
      </article>
    </>
  );
};

export default StudentJoinClassroom;
