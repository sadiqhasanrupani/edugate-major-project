import React from "react";

// styles
import styles from "../../../scss/components/teacher/AddClassroom.module.scss";

// UI
import TeacherCard from "../../../components/UI/Card/TeacherCard";
import CardSecondary from "../../../components/UI/Card/CardSecondary";

const AddClassroom = () => {
  const themeMode = JSON.parse(localStorage.getItem("theme"));
  console.log(themeMode);

  return (
    <section
      className={`${styles.section} ${
        themeMode ? styles["dark-mode"] : undefined
      }`}
    >
      <TeacherCard className={`${styles["teacher-card"]}`}>
        Classroom
        <div className={`${styles.flex}`}>
          <CardSecondary
            className={`${styles["text-center"]} ${styles["classroom-btn"]} `}
          >
            Create Institute
          </CardSecondary>

          <CardSecondary
            className={`${styles["text-center"]} ${styles["classroom-btn"]} `}
          >
            Create Classroom
          </CardSecondary>
        </div>
      </TeacherCard>
    </section>
  );
};

export default AddClassroom;
