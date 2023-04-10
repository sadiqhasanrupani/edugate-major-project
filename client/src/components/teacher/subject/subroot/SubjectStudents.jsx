import React from "react";
import { useSelector, useDispatch } from "react-redux";

//^ styles
import styles from "../../../../scss/components/teacher/subject/subroot/SubjectStudent.module.scss";

//^ Light Icons
import AddBtnOne from "../../../UI/Icons/AddBtnOne";
import NoPeoples from "../../../UI/Icons/subjectIcons/people-page/NoPeoples";

//^ Dark Icons
import DarkNoPeople from "../../../UI/Icons/subjectIcons/people-page/Dark/DarkNoPeople";

//^ components
import IconBtn from "../../../UI/Buttons/IconBtn";

//^ action
import { uiAction } from "../../../../store/ui-slice";

const SubjectStudents = ({ subjectName }) => {
  //^ themeMode
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ dispatch
  const dispatch = useDispatch();

  //^ handler for StudentOverlay.
  const ToggleStudentOverlayHandler = () => {
    dispatch(uiAction.TogglerAddStudentOverlay());
  };
  return (
    <>
      <article
        className={`${styles["article"]} ${themeMode && styles["dark"]}`}
      >
        <div className={styles["teacher-heading-div"]}>
          <div>
            <h2>Students</h2>
            <IconBtn Icon={AddBtnOne} onClick={ToggleStudentOverlayHandler}>
              Add Students
            </IconBtn>
          </div>
          <hr />
        </div>
        <div className={styles["no-people-placeholder"]}>
          {themeMode ? <DarkNoPeople /> : <NoPeoples />}
          {/* <h3>No Students are there in {subjectName} subject</h3> */}
        </div>
      </article>
    </>
  );
};

export default SubjectStudents;
