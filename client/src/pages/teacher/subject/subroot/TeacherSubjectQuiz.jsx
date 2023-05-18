import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

//^ stylesheet
import styles from "../../../../scss/pages/teacher/subject/subroot/TeacherSubjectQuiz.module.scss";

//^ components
import SubjectQuizHeading from "../../../../components/teacher/subject/subroot/teacher-subject-quiz/subject-quiz-heading/SubjectQuizHeading"

//^ auth
import { getAuthToken } from "../../../../utils/auth";

const TeacherSubjectQuiz = () => {
  //^ redux useSelector
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  useEffect(() => {
    gsap.fromTo(".section", { x: 1000 }, { x: 0, ease: "power4" });
  });

  return <section className={`section ${styles["section"]}`}>
    <SubjectQuizHeading themeMode={themeMode} />
  </section>;
};

export const loader = async ({ request, params }) => {
  return null;
};

export default TeacherSubjectQuiz;
