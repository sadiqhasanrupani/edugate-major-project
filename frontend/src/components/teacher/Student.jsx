import React, { Fragment } from "react";

//* styles
import styles from "./joinedClassroom/JoinClassFooter.module.scss";

//* light icons
import AddIconTwo from "../UI/Icons/AddIconTwo";

//* dark icons
import DarkAddIcon from "../UI/Icons/Dark/DarkAddIcon";

const Student = ({
  studentsData,
  isStudentData,
  filteredStudentsImg,
  sliceFilteredStudentsImg,
  themeMode,
  studentsCount,
}) => {
  return (
    <div className={styles["item"]}>
      {isStudentData ? (
        filteredStudentsImg &&
        sliceFilteredStudentsImg.map((filteredStudentImg) => {
          return (
            filteredStudentsImg && (
              <Fragment key={Math.floor(Math.random() * 1000) + 1}>
                <img
                  src={filteredStudentImg}
                  alt={"filtered-student-profile"}
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
      {studentsCount > 3 && <span>+{studentsCount - 3}</span>}
    </div>
  );
};

export default Student;
