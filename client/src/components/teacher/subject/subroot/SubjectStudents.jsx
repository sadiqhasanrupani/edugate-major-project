import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

//^ styles
import styles from "../../../../scss/components/teacher/subject/subroot/SubjectStudent.module.scss";

//^ Light Icons
import AddBtnOne from "../../../UI/Icons/AddBtnOne";
import NoPeoples from "../../../UI/Icons/subjectIcons/people-page/NoPeoples";
import Menu from "../../../UI/Icons/More";

//^ Dark Icons
import DarkNoPeople from "../../../UI/Icons/subjectIcons/people-page/Dark/DarkNoPeople";
import DarkMenu from "../../../UI/Icons/Dark/DarkMenu";

//^ components
import IconBtn from "../../../UI/Buttons/IconBtn";
import SubjectMember from "./SubjectMember";

//^ action
import { uiAction } from "../../../../store/ui-slice";

const SubjectStudents = ({ subjectName, subjectStudentsData }) => {
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
        <div className={styles["teacher-div"]}>
          {subjectStudentsData.length !== 0 ? (
            subjectStudentsData.map((subjectStudentData) => {
              const studentFullName = `${subjectStudentData.student.student_first_name} ${subjectStudentData.student.student_last_name}`;

              return (
                <Fragment key={subjectStudentData.student.student_id}>
                  <SubjectMember
                    memberFullName={studentFullName}
                    memberId={subjectStudentData.join_subject_id}
                    memberImg={subjectStudentData.student.student_img}
                    memberEmailId={subjectStudentData.student.student_email}
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
    </>
  );
};

export default SubjectStudents;
