import React, { Fragment } from "react";

import styles from "./AssignmentReport.module.scss";

//^ component
import PrimaryCard from "../../../UI/Card/TeacherCard";
import UnderLine from "../../../UI/underline/UnderLine";
import AssignmentCard from "./AssignmentCard/AssignmentCard";
import SmallEmptyFolder from "../../../UI/Icons/EmptyFolder/SmallEmptyFolder";

const AssignmentReport = ({ assignments, themeMode }) => {
  return (
    <div className={styles["assignment-report"]}>
      <div className={styles["assignment-report-title"]}>
        <h2>Assignments Report</h2>
        <UnderLine themeMode={themeMode} />
      </div>
      {assignments.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <SmallEmptyFolder />
        </div>
      ) : (
        <PrimaryCard className={styles["primary-card"]}>
          <h5>ASSIGNMENTS</h5>
          <div className={styles["assignment-cards"]}>
            {assignments.map((assignment) => {
              return (
                <Fragment key={assignment.assignmentID}>
                  <AssignmentCard
                    themeMode={themeMode}
                    assignmentName={assignment.assignmentName}
                    subjectName={assignment.subjectName}
                    assignmentID={assignment.assignmentID}
                  />
                </Fragment>
              );
            })}
          </div>
        </PrimaryCard>
      )}
    </div>
  );
};

export default AssignmentReport;
