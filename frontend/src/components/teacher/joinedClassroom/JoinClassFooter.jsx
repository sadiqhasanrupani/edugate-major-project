import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import styles from "./JoinClassFooter.module.scss";

//* placeholder
import userProfile from "../../../assets/Images/profile.png";

//* light icons
import AddIconTwo from "../../UI/Icons/AddIconTwo";

//* dark icons
import DarkAddIcon from "../../UI/Icons/Dark/DarkAddIcon";

const JoinClassFooter = ({ ClassroomData }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  console.log(ClassroomData);

  return (
    <div className={styles["join-class-footer"]}>
      <div className={styles["item"]}>
        <Fragment key={ClassroomData.join_classroom_id}>
          {ClassroomData.student ? (
            ClassroomData.student && ClassroomData.student.student_img ? (
              <img src="" alt="" />
            ) : (
              <img src={userProfile} alt="user-placeholder" />
            )
          ) : themeMode ? (
            <DarkAddIcon />
          ) : (
            <AddIconTwo />
          )}
        </Fragment>
      </div>
      <div className={styles["item"]}>
        <Fragment key={ClassroomData.join_classroom_id}>
          {ClassroomData.teacher ? (
            ClassroomData.teacher && ClassroomData.teacher.teacher_img ? (
              <img src="" alt="" />
            ) : (
              <img src={userProfile} alt="user-placeholder" />
            )
          ) : themeMode ? (
            <DarkAddIcon />
          ) : (
            <AddIconTwo />
          )}
        </Fragment>
      </div>
    </div>
  );
};

export default JoinClassFooter;
