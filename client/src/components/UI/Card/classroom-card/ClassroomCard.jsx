import React from "react";

//^ stylesheets
import styles from "./ClassroomCard.module.scss";

//^ components
import ClassroomHeader from "./ClassroomHeader";
import ClassroomFooter from "./ClassroomFooter";
import SecondaryCard from "../CardSecondary";

const ClassroomCard = ({
  classroomImg,
  classroomName,
  classroomId,
  themeMode,
  menu,
  teachers,
  joinClassroomId
}) => {
  return (
    <article className={styles["article"]}>
      <SecondaryCard className={styles["secondary-card"]}>
        <ClassroomHeader
          classroomId={classroomId}
          joinClassroomId={joinClassroomId}
          classImg={classroomImg}
          classroomName={classroomName}
          themeMode={themeMode}
          menu={menu}
        />
        <ClassroomFooter
          teachers={teachers}
          themeMode={themeMode}
          classroomId={classroomId}
        />
      </SecondaryCard>
    </article>
  );
};

export default ClassroomCard;
