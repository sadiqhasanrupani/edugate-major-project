import React from "react";
import { Link, useParams } from "react-router-dom";

//^ stylesheet
import styles from "./SubjectQuizHeading.module.scss";

//^ component
import UnderLine from "../../../../../UI/underline/UnderLine";
import IconBtn from "../../../../../UI/Buttons/IconBtn";

//^ light icons
import AddIconTwo from "../../../../../UI/Icons/AddBtnOne";

const SubjectQuizHeading = ({ themeMode }) => {
  const { subjectId } = useParams();

  return (
    <div
      className={`${styles["teacher-quiz-heading"]} ${
        themeMode && styles["dark"]
      }`}
    >
      <div className={styles["quiz-topic"]}>
        <h2>Quizzes</h2>
        <Link to={`/teacher/${subjectId}/create-quiz`}>
          <IconBtn className={styles["add-quiz-btn"]} Icon={AddIconTwo}>
            New Quiz
          </IconBtn>
        </Link>
      </div>
      <UnderLine themeMode={themeMode} className={styles['underline']} />
    </div>
  );
};

export default SubjectQuizHeading;
