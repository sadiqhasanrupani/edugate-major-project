//^ stylesheet
import styles from "../../../../scss/components/teacher/subject/subroot/TeacherOverlay.module.scss";

//^ components
import RoleList from "../../../teacher/subject/RoleList";
import PrimaryBtn from "../../../UI/Buttons/PrimaryBtn";

const TeacherOverlay = ({
  classroomTeachersData,
  themeMode,
  isLoading,
  onTeacherOverlay,
  onAddTeacher,
}) => {
  //^ getting the array of ids from the onRoleList attribute
  const getRoleListData = (arrayData) => {
    onTeacherOverlay(arrayData);
  };

  return (
    <>
      <article
        className={`${styles["article"]} ${themeMode && styles["dark"]}`}
      >
        <div className={styles["teachers"]}>
          <RoleList
            teachers={classroomTeachersData}
            themeMode={themeMode}
            onRoleList={getRoleListData}
          />
        </div>
        <div className={styles["primary-btn-div"]}>
          <PrimaryBtn onClick={onAddTeacher}>Add Teacher</PrimaryBtn>
        </div>
      </article>
    </>
  );
};

export default TeacherOverlay;
