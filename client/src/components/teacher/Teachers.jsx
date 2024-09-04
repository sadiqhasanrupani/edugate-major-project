import React, { Fragment } from "react";

//* styles
import styles from "./joinedClassroom/JoinClassFooter.module.scss";

//* light icons
import AddIconTwo from "../UI/Icons/AddIconTwo";

//* dark icons
import DarkAddIcon from "../UI/Icons/Dark/DarkAddIcon";

const Teachers = ({
  teachersData,
  isTeachersData,
  sliceFilteredTeachersImg,
  filteredTeachersImg,
  themeMode,
  teachersCount,
}) => {
  return (
    <div
      className={styles["item"]}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Fragment>
        {isTeachersData ? (
          filteredTeachersImg &&
          sliceFilteredTeachersImg.map((filteredTeacherImg) => {
            return (
              filteredTeachersImg && (
                <Fragment key={Math.floor(Math.random() * 1000) + 1}>
                  <img
                    src={filteredTeacherImg}
                    alt={"filtered-teacher-profile"}
                  />
                </Fragment>
              )
            );
          })
        ) : themeMode ? (
          <DarkAddIcon />
        ) : (
          <AddIconTwo />
        )}
      </Fragment>
      {teachersCount > 3 && <span>+{teachersCount - 3}</span>}
    </div>
  );
};

export default Teachers;
