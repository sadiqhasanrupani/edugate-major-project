import React, { Fragment } from "react";

//* styles
import styles from "./PendingTeacher.module.scss";

//* components
import SecondaryCard from "../../UI/Card/CardSecondary";

//* Icons
import DarkMenu from "../../UI/Icons/Dark/DarkMenu";
import Menu from "../../UI/Icons/More";

const PendingTeacher = ({ coTeacher, themeMode }) => {
  return (
    <Fragment key={coTeacher.teacher_id}>
      <SecondaryCard className={styles["secondary-card"]}>
        <div className={styles["teacher-div"]}>
          <img src={coTeacher.teacher_img} alt="teacher-profile-img" />
          <div className={styles["second-row"]}>
            <div className={styles["teacher-detail"]}>
              <h4>
                {coTeacher.teacher_first_name} &nbsp;
                {coTeacher.teacher_last_name}
              </h4>
              <p>{coTeacher.teacher_email}</p>
            </div>
            <div className={styles["pending"]}>
              <h4>Join Request</h4>
              <p>pending...</p>
            </div>
          </div>
        </div>
        <div>{themeMode ? <DarkMenu /> : <Menu />}</div>
      </SecondaryCard>
    </Fragment>
  );
};

export default PendingTeacher;
