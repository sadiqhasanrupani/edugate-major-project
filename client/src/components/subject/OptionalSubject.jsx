import { useDispatch, useSelector } from "react-redux";

//^ stylesheet
import styles from "../../scss/components/teacher/Classrooms/OptionalSubject.module.scss";

//^ components
import PrimaryCard from "../UI/Card/TeacherCard";
import SecondaryCard from "../UI/Card/CardSecondary";

//^ actions
import { uiAction } from "../../store/ui-slice";

const OptionalSubject = () => {
  //^ selector method
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ dispatch method.
  const dispatch = useDispatch();

  //^ function to open a subject model
  const modelTogglerHandler = () => {
    dispatch(uiAction.optionalSubjectFormHandler());
  };

  return (
    <>
      <PrimaryCard
        className={`${styles["primary-card"]} ${themeMode && styles["dark"]}`}
      >
        <div>
          <h3>Optional Subjects</h3>
        </div>
        <div className={styles["optional-subject-div"]}>
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

export default OptionalSubject;
