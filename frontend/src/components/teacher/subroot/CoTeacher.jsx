import React, { Fragment } from "react";
import { useSelector } from "react-redux";

//* styles
import styles from "../../../scss/components/teacher/subroot/AdminTeacher.module.scss";

//* components
import PrimaryCard from "../../UI/Card/TeacherCard";
import SecondaryCard from "../../UI/Card/CardSecondary";

//* icons
import Menu from "../../UI/Icons/More";
import DarkMenu from "../../UI/Icons/Dark/DarkMenu";

const CoTeacher = ({ coTeachersData }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  console.log(coTeachersData);

  const coTeachersDataArray = coTeachersData.map((coTeacherData) => {
    return coTeacherData.coTeacher;
  });

  return (
    <article>
      <PrimaryCard className={styles["primary-card"]}>
        <h3>Co Teachers</h3>
        {coTeachersDataArray.map((coTeacherData) => {
          return (
            <Fragment key={coTeacherData.teacher_id}>
              <SecondaryCard className={styles["secondary-card"]}>
                <div className={styles["teacher-div"]}>
                  <img src={coTeacherData.teacher_img} alt="" />
                  <div className={styles["teacher-detail"]}>
                    <h4>
                      {coTeacherData.teacher_first_name} &nbsp;
                      {coTeacherData.teacher_last_name}
                    </h4>
                    <p>{coTeacherData.teacher_email}</p>
                  </div>
                </div>
                <div>{themeMode ? <DarkMenu /> : <Menu />}</div>
              </SecondaryCard>
            </Fragment>
          );
        })}
      </PrimaryCard>
    </article>
  );
};

export default CoTeacher;
