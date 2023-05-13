import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

//^ styles
import styles from "../../../../scss/components/teacher/subject/subroot/SubjectTeacher.module.scss";

//^ components
import NoPeoples from "../../../UI/Icons/subjectIcons/people-page/NoPeoples";
import DarkNoPeople from "../../../UI/Icons/subjectIcons/people-page/Dark/DarkNoPeople";
import IconBtn from "../../../UI/Buttons/IconBtn";
import AddBtnOne from "../../../UI/Icons/AddBtnOne";
import SubjectMember from "../subroot/SubjectMember";

//^ Action
import { uiAction } from "../../../../store/ui-slice";

const SubjectTeachers = ({ subjectName, subjectTeachersData }) => {
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
            Assign Teacher
          </IconBtn>
        </div>
        <hr />
      </div>
      <div className={styles["teacher-div"]}>
        {subjectTeachersData.length !== 0 ? (
          subjectTeachersData.map((subjectTeacherData) => {
            const teacherFullName = `${subjectTeacherData.coTeacher.teacher_first_name} ${subjectTeacherData.coTeacher.teacher_last_name}`;

            return (
              <Fragment key={subjectTeacherData.coTeacher.teacher_id}>
                <SubjectMember
                  memberFullName={teacherFullName}
                  memberId={subjectTeacherData.join_subject_id}
                  memberImg={subjectTeacherData.coTeacher.teacher_img}
                  memberEmailId={subjectTeacherData.coTeacher.teacher_email}
                />
              </Fragment>
            );
          })
        ) : (
          <div className={styles["no-people-placeholder"]}>
            {themeMode ? <DarkNoPeople /> : <NoPeoples />}
          </div>
        )}
      </div>
    </article>
  );
};

export default SubjectTeachers;
