import React from "react";

//* styles
import styles from "./SubjectFooter.module.scss";

//* light theme
import AddBtnOne from "../UI/Icons/AddIconTwo";

//* dark theme
import DarkAddBtnOne from "../UI/Icons/Dark/DarkAddIcon";

//* placeholder
import Sadiqhasan from "../../assets/Images/Sadiqhasan Rupani.jpg";

const SubjectFooter = ({ teacherImg, studentImg, themeMode }) => {
  return (
    <div className={styles["subject-footer"]}>
      <div>
        <h5>Teacher</h5>
        <div>
          {teacherImg ? (
            <img src={teacherImg} alt={`teacher-profile`} />
          ) : (
            <>
              <img src={Sadiqhasan} alt="placeholder" />
              <img src={Sadiqhasan} alt="placeholder" />
              <img src={Sadiqhasan} alt="placeholder" />
            </>
          )}
        </div>
      </div>
      <div>
        <h5>Student</h5>
        <div>
          {studentImg ? (
            <img src={studentImg} alt={`teacher-profile`} />
          ) : themeMode ? (
            <DarkAddBtnOne />
          ) : (
            <AddBtnOne />
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectFooter;
