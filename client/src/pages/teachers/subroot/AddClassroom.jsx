import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { gsap } from "gsap";

// styles
import styles from "../../../scss/components/teacher/AddClassroom.module.scss";

// UI
import TeacherCard from "../../../components/UI/Card/TeacherCard";
import CardSecondary from "../../../components/UI/Card/CardSecondary";

//* action
import { uiAction } from "../../../store/ui-slice";

const AddClassroom = () => {
  //* creating a dispatch function
  const dispatch = useDispatch();

  const themeMode = useSelector((state) => state.ui.isDarkMode);

  const joinModelToggler = () => {
    dispatch(uiAction.joinClassroomFormHandler());
  };

  useEffect(() => {
    gsap.fromTo(
      ".add-classroom-section",
      { x: 1000 },
      { x: 0, ease: "power4" }
    );
  }, []);

  return (
    <section
      className={`add-classroom-section ${styles.section} ${
        themeMode ? styles["dark-mode"] : undefined
      }`}
    >
      <TeacherCard className={`${styles["teacher-card"]}`}>
        <p>Classroom</p>
        <div className={`${styles.flex}`}>
          <Link to="/create-classroom">
            <CardSecondary
              className={`${styles["text-center"]} ${styles["classroom-btn"]} `}
            >
              Create Classroom
            </CardSecondary>
          </Link>

          <Link onClick={joinModelToggler}>
            <CardSecondary
              className={`${styles["text-center"]} ${styles["classroom-btn"]} `}
            >
              Join Classroom
            </CardSecondary>
          </Link>
        </div>
      </TeacherCard>
    </section>
  );
};

export default AddClassroom;
