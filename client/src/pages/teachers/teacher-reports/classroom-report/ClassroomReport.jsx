import React, { Fragment } from "react";
import { useSelector } from "react-redux";

//^ stylesheet
import styles from "./ClassroomReport.module.scss";

//^ components
import UnderLine from "../../../../components/UI/underline/UnderLine";
import ClassroomCard from "../../../../components/UI/Card/classroom-card/ClassroomCard";
import PrimaryCard from "../../../../components/UI/Card/TeacherCard";
import SmallEmptyFolder from "../../../../components/UI/Icons/EmptyFolder/SmallEmptyFolder";

const ClassroomReport = ({ createdClassroom, joinedClassroom }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  return (
    <div
      className={`${styles["classroom-report"]} ${themeMode && styles["dark"]}`}
    >
      <h1>Classroom Reports</h1>
      <UnderLine themeMode={themeMode} className={styles["underline"]} />
      {createdClassroom.length !== 0 ? (
        <PrimaryCard className={styles["primary-card"]}>
          <h4>YOUR CLASSROOM</h4>
          <div className={styles["created-classroom"]}>
            {createdClassroom.map((classroom) => {
              return (
                <Fragment key={classroom.classroom_id}>
                  <ClassroomCard
                    themeMode={themeMode}
                    classroomId={classroom.classroom_id}
                    classroomImg={classroom.classroom_profile_img}
                    classroomName={classroom.classroom_name}
                    menu={true}
                    teachers={true}
                  />
                </Fragment>
              );
            })}
          </div>
        </PrimaryCard>
      ) : (
        <div style={{ textAlign: "center" }}>
          <SmallEmptyFolder />
        </div>
      )}
    </div>
  );
};

export default ClassroomReport;
