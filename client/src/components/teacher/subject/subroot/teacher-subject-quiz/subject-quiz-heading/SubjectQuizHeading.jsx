import React from "react";
import { Link } from "react-router-dom";

//^ stylesheet
import styles from "./SubjectQuizHeading.module.scss";

//^ component
import UnderLine from "../../../../../UI/underline/UnderLine";
import IconBtn from "../../../../../UI/Buttons/IconBtn";

//^ light icons
import AddIconTwo from "../../../../../UI/Icons/AddBtnOne";

const SubjectQuizHeading = ({ themeMode }) => {
  return (
    <div
      className={`${styles["teacher-quiz-heading"]} ${
        themeMode && styles["dark"]
      }`}
    >
      <div className={styles["quiz-topic"]}>
        <h2>Quizzes</h2>
        <Link to="/create-quiz">
          <IconBtn className={styles["add-quiz-btn"]} Icon={AddIconTwo}>
            New Quiz
          </IconBtn>
        </Link>
      </div>
      <UnderLine />
    </div>
  );
};

export default SubjectQuizHeading;
