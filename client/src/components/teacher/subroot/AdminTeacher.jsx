import React from "react";
import { useSelector } from "react-redux";

//* styles
import styles from "../../../scss/components/teacher/subroot/AdminTeacher.module.scss";

//* components
import PrimaryCard from "../../UI/Card/TeacherCard";
import SecondaryCard from "../../UI/Card/CardSecondary";

//* icons
import Menu from "../../UI/Icons/More";
import DarkMenu from "../../UI/Icons/Dark/DarkMenu";

const AdminTeacher = ({ adminData }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);
  const { adminJoinClassData: data } = adminData;
  return (
    <article>
      <PrimaryCard className={styles["primary-card"]}>
        <h3>Admin</h3>
        <SecondaryCard className={styles["secondary-card"]}>
          <div className={styles["teacher-div"]}>
            <img src={data.adminTeacher.teacher_img} alt="" />
            <div className={styles["teacher-detail"]}>
              <h4>
                {data.adminTeacher.teacher_first_name} &nbsp;
                {data.adminTeacher.teacher_last_name}
              </h4>
              <p>{data.adminTeacher.teacher_email}</p>
            </div>
          </div>
          <div>{themeMode ? <DarkMenu /> : <Menu />}</div>
        </SecondaryCard>
      </PrimaryCard>
    </article>
  );
};

export default AdminTeacher;
