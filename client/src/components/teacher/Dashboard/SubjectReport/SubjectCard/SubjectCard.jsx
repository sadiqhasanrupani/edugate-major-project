import React from "react";
import { Link } from "react-router-dom";

import styles from "./SubjectCard.module.scss";

//^ component
import SecondaryCard from "../../../../UI/Card/CardSecondary";
import SubjectFooter from "./SubjectFooter/SubjectFooter";

//^ icons
import Menu from "../../../../UI/Icons/More";
import DarkMenu from "../../../../UI/Icons/Dark/DarkMenu";

//^ utils
import shortenString from "../../../../../utils/string-shrinker";

const SubjectCard = ({
  subjectName,
  classroomImg,
  classroomName,
  joinSubjectId,
  subjectId,
  classroomId,
  themMode,
}) => {
  const subjectShortName = shortenString(subjectName, 15);
  return (
    <div className={`${styles["subject-card"]} ${themMode && styles["dark"]}`}>
      <SecondaryCard
        className={styles["secondary-card"]}
        style={{ height: "100%" }}
      >
        <div className={styles["subject-header"]}>
          <div className={styles["subject-title"]}>
            <img src={classroomImg} alt="classroom-profile-img" />
            <div className={styles["subject-name"]}>
              <Link to={`subject-report/${joinSubjectId}`}>
                {subjectShortName}
              </Link>
              <h6>{classroomName}</h6>
            </div>
          </div>
          <div className={styles["menu"]}>
            {themMode ? <DarkMenu /> : <Menu />}
          </div>
        </div>
        <SubjectFooter
          subjectId={subjectId}
          classroomId={classroomId}
          themeMode={themMode}
        />
      </SecondaryCard>
    </div>
  );
};

export default SubjectCard;
