import React from "react";

//^ stylesheet
import styles from "../../../../scss/components/teacher/subject/subroot/TeacherOverlay.module.scss";

//^ components
import RoleList from "../../../teacher/subject/RoleList";
import PrimaryBtn from "../../../UI/Buttons/PrimaryBtn";
import LoadingWheel from "../../../UI/loading/LoadingWheel";

const StudentOverlay = ({
  classroomStudentsData,
  themeMode,
  isLoading,
  onStudentOverlay,
  onAddStudent,
}) => {
  //^ getting the array of ids from the onRoleList attribute
  const getRoleListData = (arrayData) => {
    onStudentOverlay(arrayData);
  };

  return (
    <>
      <article
        className={`${styles["article"]} ${themeMode && styles["dark"]}`}
      >
        <div className={styles["students"]}>
          <RoleList
            students={classroomStudentsData}
            themeMode={themeMode}
            onRoleList={getRoleListData}
          />
        </div>
        <div className={styles["primary-btn-div"]}>
          <PrimaryBtn onClick={onAddStudent}>
            {isLoading ? <LoadingWheel /> : "Add Teacher"}
          </PrimaryBtn>
        </div>
      </article>
    </>
  );
};

export default StudentOverlay;
