import React from "react";

import styles from "./quizHead.module.scss";

//^ icons
import Menu from "../../../../../../UI/Icons/More";
import DarkMenu from "../../../../../../UI/Icons/Dark/DarkMenu";
import { Link } from "react-router-dom";

//^ helper function
import shortenString from "../../../../../../../utils/string-shrinker";

const QuizHead = ({
  themeMode,
  quizId,
  quizTitle,
  subjectName,
  classroomName,
}) => {
  const quizTitleShrinker = shortenString(quizTitle, 16);
  const subjectNmShrinker = shortenString(subjectName, 15);
  const classroomNmShrinker = shortenString(classroomName, 15);

  return (
    <div className={`${styles["quiz-head"]} ${themeMode && styles["dark"]}`}>
      <div className={styles["quiz-head-title"]}>
        <div className={styles["quiz-title"]}>
          <Link to={`quiz-report/${quizId}`}>{quizTitleShrinker}</Link>
        </div>
        <div className={styles["menu"]}>
          {themeMode ? <DarkMenu /> : <Menu />}
        </div>
      </div>
      <h6>{subjectNmShrinker.toUpperCase()}</h6>
      <h6>{classroomNmShrinker.toUpperCase()}</h6>
    </div>
  );
};

export default QuizHead;
