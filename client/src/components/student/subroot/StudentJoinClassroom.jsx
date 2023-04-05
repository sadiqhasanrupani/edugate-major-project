//^ dependencies
import React from "react";
import { useSelector, useDispatch } from "react-redux";

//^ styles
import styles from "../../../scss/components/student/subroot/StudentJoinClassroom.module.scss";

//^ components
import PrimaryCard from "../../../components/UI/Card/TeacherCard";
import SecondaryCard from "../../../components/UI/Card/CardSecondary";
import JoinClassroomForm from "../../../components/student/subroot/JoinClassroomForm";

//^ actions
import { uiAction } from "../../../store/ui-slice";

//^ model
import FormPortal from "../../../components/model/FormPortal";

const StudentJoinClassroom = () => {
  //& Hooks thingy ============================================================================
  //* themeMode
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //* StudentJoinClassroomIsActive
  const JoinClassroomIsActive = useSelector(
    (state) => state.ui.isStudentJoinClassroomActive
  );

  //* dispatch func,
  const dispatch = useDispatch();
  //& =========================================================================================

  //^ Toggler func,
  const JoinClassroomToggler = () => {
    dispatch(uiAction.ToggleStudentJoinClassroom());
  };

  //& form submission login ========================================================
  const onJoinClassroomFormHandler = (e) => {
    e.preventDefault();
  }
  //& ==============================================================================

  return (
    <>
      {JoinClassroomIsActive && (
        <FormPortal
          buttonOnClick={JoinClassroomToggler}
          onBackdrop={JoinClassroomToggler}
          modelTitle={`Join Classroom`}
          formOnSubmit={onJoinClassroomFormHandler}
        >
          <JoinClassroomForm />
        </FormPortal>
      )}
      <article
        className={`${styles["article"]} ${themeMode && styles["dark"]}`}
      >
        <PrimaryCard className={styles["primary-card"]}>
          <h4>Joined Classroom</h4>

          <div className={styles["join-classrooms-div"]}>
            <button onClick={JoinClassroomToggler}>
              <SecondaryCard className={styles["secondary-card"]}>
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
