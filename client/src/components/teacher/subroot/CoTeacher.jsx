import React, { Fragment } from "react";
import { useSelector } from "react-redux";

//* styles
import styles from "../../../scss/components/teacher/subroot/AdminTeacher.module.scss";

//* components
import PrimaryCard from "../../UI/Card/TeacherCard";
import ApprovedTeacher from "../../teacher/Classrooms/ApprovedTeacher.jsx";
import PendingTeacher from "../../teacher/Classrooms/PendingTeacher.jsx";

const CoTeacher = ({ coTeachersData }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  return (
    <article>
      <PrimaryCard className={styles["primary-card"]}>
        <h3>Co Teachers</h3>
        {coTeachersData.map((coTeacherData) => {
          return coTeacherData.join_request ? (
            <Fragment key={coTeacherData.teacher_id}>
              <ApprovedTeacher
                themeMode={themeMode}
                coTeacher={coTeacherData.coTeacher}
                memberId={coTeacherData.join_classroom_id}
              />
            </Fragment>
          ) : (
            <Fragment key={coTeacherData.teacher_id}>
              <PendingTeacher
                themeMode={themeMode}
                coTeacher={coTeacherData.coTeacher}
              />
            </Fragment>
          );
        })}
      </PrimaryCard>
    </article>
  );
};

export default CoTeacher;
