import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// styles
import styles from "../../../scss/components/teacher/Classrooms/AdminClassrooms.module.scss";

// components
import SecondaryCard from "../../../components/UI/Card/TeacherCard";
import PrimaryCard from "../../../components/UI/Card/CardSecondary";
import ClassroomHeading from "../../../components/teacher/Classrooms/ClassroomHeading";
import ClassroomFooter from "../../../components/teacher/Classrooms/ClassroomFooter.jsx";

const AdminClassrooms = ({ classroomData }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  return (
    <article
      className={`${styles.article} ${themeMode ? styles.dark : undefined}`}
    >
      <h2>Your Classrooms</h2>
      <SecondaryCard className={styles["secondary-card"]}>
        {classroomData.getClassrooms.map((classroom) => {
          return (
            <Fragment key={classroom.classroom_id}>
              <Link to={`/teacher/classroom/${classroom.classroom_id}`}>
                <PrimaryCard className={styles["primary-card"]}>
                  <ClassroomHeading
                    classProfileImg={classroom.classroom_profile_img}
                    classroomName={classroom.classroom_name}
                    themeMode={themeMode}
                  />
                  <ClassroomFooter classId={classroom.classroom_id} themeMode={themeMode}/>
                </PrimaryCard>
              </Link>
            </Fragment>
          );
        })}
        <Link to="/create-classroom">
          <PrimaryCard className={styles["add-card"]}>
            + Add new Classroom
          </PrimaryCard>
        </Link>
      </SecondaryCard>
    </article>
  );
};

export default AdminClassrooms;
