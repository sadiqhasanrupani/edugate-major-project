import React, { Fragment } from "react";

import styles from "./StudentReport.module.scss";

import SubjectStudentReportTable from "../../../../../../components/UI/Tables/SubjectStudentReportTable/SubjectStudentReportTable.jsx";
import SmallEmptyFolder from "../../../../../../components/UI/Icons/EmptyFolder/SmallEmptyFolder";

const StudentReport = ({themeMode, studentsData}) => {
  return (
    <div className={styles["student-report"]}>
      {studentsData.length !== 0 ? (
        <SubjectStudentReportTable
          studentsData={studentsData}
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

export default StudentReport;
