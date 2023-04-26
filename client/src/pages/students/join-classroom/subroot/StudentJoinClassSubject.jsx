import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

//^ styles
import styles from "../../../../scss/pages/student/join-classroom/StudentJoinClassSubject.module.scss";

//^ components
import IconBtn from "../../../../components/UI/Buttons/IconBtn";
import CompulsorySubjects from "../../../../components/student/join-classroom/subroot/CompulsorySubjects.jsx";

//^ icons
import AddBtnOne from "../../../../components/UI/Icons/AddBtnOne";

const StudentJoinClassSubject = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ Animation useEffect.
  useEffect(() => {
    gsap.fromTo(
      ".student-subject-join-classroom",
      { opacity: 0 },
      { opacity: 1, ease: "power5" }
    );
  }, []);

  return (
    <article
      className={`student-subject-join-classroom ${styles["article"]} ${
        themeMode && styles["dark"]
      }`}
    >
      <div className={styles["title-div"]}>
        <h2>Student Subjects</h2>
        <IconBtn Icon={AddBtnOne} className={styles["optional-subject-btn"]}>
          Optional Subject
        </IconBtn>
      </div>
      <div className={styles["subjects"]}>
        <CompulsorySubjects />
      </div>
    </article>
  );
};

export const loader = async({ request, params }) => {
  const joinClassId = await params.joinClassId;

  console.log(joinClassId);

  return null;

}

export default StudentJoinClassSubject;
