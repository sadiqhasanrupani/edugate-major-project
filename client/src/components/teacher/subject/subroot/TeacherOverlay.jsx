//^ dependencies
import { useCallback, useState } from "react";

//^ stylesheet
import styles from "../../../../scss/components/teacher/subject/subroot/TeacherOverlay.module.scss";

//^ components
import RoleList from "../../../teacher/subject/RoleList";
import PrimaryBtn from "../../../UI/Buttons/PrimaryBtn";
import LoadingWheel from "../../../UI/loading/LoadingWheel";

const TeacherOverlay = ({
  classroomTeachersData,
  themeMode,
  isLoading,
  onTeacherOverlay,
  onAddTeacher,
}) => {
  const [teacherIds, setTeacherIds] = useState([]);

  //^ getting the array of ids from the onRoleList attribute
  const getRoleListData = useCallback(
    (arrayData) => {
      setTeacherIds(arrayData);
      onTeacherOverlay(arrayData);
    },
    [setTeacherIds, onTeacherOverlay]
  );

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
          <PrimaryBtn
            onClick={onAddTeacher}
            disabled={isLoading | (teacherIds.length === 0)}
          >
            {isLoading ? <LoadingWheel /> : "Add Teacher"}
          </PrimaryBtn>
        </div>
      </article>
    </>
  );
};

export default TeacherOverlay;
