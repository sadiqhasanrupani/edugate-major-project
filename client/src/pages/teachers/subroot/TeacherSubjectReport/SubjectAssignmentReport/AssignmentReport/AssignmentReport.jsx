import React, { Fragment } from "react";

import styles from "./AssignmentReport.module.scss";

import SubjectAssignmentReportTable from "../../../../../../components/UI/Tables/SubjectAssignmentReportTable/SubjectAssignmentReportTable";
import SmallEmptyFolder from "../../../../../../components/UI/Icons/EmptyFolder/SmallEmptyFolder";

const AssignmentReport = ({ themeMode, assignments }) => {
  return (
    <div className={styles["assignment-report"]}>
      {assignments.length !== 0 ? (
        <SubjectAssignmentReportTable
          assignments={assignments}
          themeMode={themeMode}
        />
      ) : (
        <div style={{ textAlign: "center" }}>
          <SmallEmptyFolder />
        </div>
      )}
    </div>
  );
};

export default AssignmentReport;
