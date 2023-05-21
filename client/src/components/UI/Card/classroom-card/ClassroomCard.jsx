import React from "react";
import { useSelector } from "react-redux";

//^ stylesheets
import styles from "./ClassroomCard.module.scss";

//^ components
import ClassroomHeader from "./ClassroomHeader";
import ClassroomFooter from "./ClassroomFooter";
import SecondaryCard from "../CardSecondary";

const ClassroomCard = ({ classroomImg, classroomName, classroomId }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  return (
    <article className={styles["article"]}>
      <SecondaryCard className={styles["secondary-card"]}>
        <ClassroomHeader
          classroomId={classroomId}
          classImg={classroomImg}
          classroomName={classroomName}
          themeMode={themeMode}
        />
        <ClassroomFooter themeMode={themeMode} classroomId={classroomId} />
      </SecondaryCard>
    </article>
  );
};

export default ClassroomCard;
