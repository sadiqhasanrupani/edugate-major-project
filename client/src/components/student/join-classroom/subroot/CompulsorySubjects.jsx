//^ dependencies
import React from "react";
import { useSelector } from "react-redux";

//^ stylesheet
import styles from "../../../../scss/components/student/join-classroom/subroot/CompulsorySubjects.module.scss";

//^ components
import SecondaryCard from "../../../UI/Card/CardSecondary";
import PrimaryCard from "../../../UI/Card/TeacherCard";
import SubjectHeader from "../../../subject/SubjectHeader";
import SubjectFooter from "../../../subject/SubjectFooter";

const CompulsorySubjects = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  return (
    <div
      className={`${styles["compulsory-subject-div"]} ${
        themeMode && styles["dark"]
      }`}
    >
      <PrimaryCard className={styles["primary-card"]}>
        <h3>Compulsory subjects</h3>

        <SecondaryCard className={styles["secondary-card"]}>
          {/* <SubjectHeader />
          <SubjectFooter /> */}
        </SecondaryCard>
      </PrimaryCard>
    </div>
  );
};

export default CompulsorySubjects;
