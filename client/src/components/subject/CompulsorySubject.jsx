import { useSelector, useDispatch } from "react-redux";

//^ stylesheet
import styles from "../../scss/components/teacher/Classrooms/CompulsorySubject.module.scss";

//^ components
import PrimaryCard from "../../components/UI/Card/TeacherCard";
import SecondaryCard from "../UI/Card/CardSecondary";
import SubjectCard from "./SubjectCard";

//^ actions
import { uiAction } from "../../store/ui-slice";
import { Fragment } from "react";

const CompulsorySubject = ({ compulsorySubjects }) => {
  //^ selector method
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ dispatch method.
  const dispatch = useDispatch();

  //^ function to open a subject model
  const modelTogglerHandler = () => {
    dispatch(uiAction.compulsorySubjectFormHandler());
  };

  return (
    <>
      <PrimaryCard
        className={`${styles["primary-card"]} ${themeMode && styles["dark"]}`}
      >
        <div>
          <h3>Compulsory Subjects</h3>
        </div>
        <div className={styles["compulsory-subject-div"]}>
          {compulsorySubjects.length !== 0 &&
            compulsorySubjects.map((subject) => {
              return (
                <Fragment key={subject.subject_id}>
                  <SubjectCard
                    subjectName={subject.subject_name}
                    subjectId={subject.subject_id}
                  />
                </Fragment>
              );
            })}
          <button onClick={modelTogglerHandler}>
            <SecondaryCard className={styles["add-subject-card"]}>
              Add new subject
            </SecondaryCard>
          </button>
        </div>
      </PrimaryCard>
    </>
  );
};

export default CompulsorySubject;
