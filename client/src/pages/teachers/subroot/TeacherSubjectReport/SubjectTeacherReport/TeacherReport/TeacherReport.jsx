import React, { Fragment } from "react";

import styles from "./TeacherReport.module.scss";

import SubjectTeacherReportTable from "../../../../../../components/UI/Tables/SubjectTeacherReportTable/SubjectTeacherReportTable";
import SmallEmptyFolder from "../../../../../../components/UI/Icons/EmptyFolder/SmallEmptyFolder";

const TeacherReport = ({ teachersData, themeMode }) => {
  return (
    <div className={styles["teacher-report"]}>
      {teachersData.length !== 0 ? (
        <SubjectTeacherReportTable
          teachersData={teachersData}
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

export default TeacherReport;
