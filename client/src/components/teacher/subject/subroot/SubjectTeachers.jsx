import React from "react";
import { useSelector, useDispatch } from "react-redux";

//^ styles
import styles from "../../../../scss/components/teacher/subject/subroot/SubjectTeacher.module.scss";

//^ components
import NoPeoples from "../../../UI/Icons/subjectIcons/people-page/NoPeoples";
import DarkNoPeople from "../../../UI/Icons/subjectIcons/people-page/Dark/DarkNoPeople";
import IconBtn from "../../../UI/Buttons/IconBtn";
import AddBtnOne from "../../../UI/Icons/AddBtnOne";

//^ Action
import { uiAction } from "../../../../store/ui-slice";

const SubjectTeachers = ({ subjectName }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ dispatch
  const dispatch = useDispatch();

  //^ handler for TeacherOverlay.
  const ToggleTeacherOverlayHandler = () => {
    dispatch(uiAction.TogglerAddTeacherOverlay());
  };

  return (
    <article className={`${styles["article"]} ${themeMode && styles["dark"]}`}>
      <div className={styles["teacher-heading-div"]}>
        <div>
          <h2>Teachers</h2>
          <IconBtn Icon={AddBtnOne} onClick={ToggleTeacherOverlayHandler}>
            Add Teacher
          </IconBtn>
        </div>
        <hr />
      </div>
      <div className={styles["no-people-placeholder"]}>
        {themeMode ? <DarkNoPeople /> : <NoPeoples />}
        {/* <h3>No Teachers are there in {subjectName} subject</h3> */}
      </div>
    </article>
  );
};

export default SubjectTeachers;
