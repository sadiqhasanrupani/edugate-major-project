import React from "react";

import styles from "./SubjectAssignmentReport.module.scss";
import UnderLine from "../../../../../components/UI/underline/UnderLine";
import PrimaryBtn from "../../../../../components/UI/Buttons/PrimaryBtn";
import AssignmentReport from "./AssignmentReport/AssignmentReport.jsx";
import generateSubjectAssignmentReportPDF from "./generateSubjectAssignmentReportPDF/generateSubjectAssignmentReportPDF";

const SubjectAssignmentReport = ({ assignments, subjectName, themeMode }) => {
  const downloadPDF = () => {
    generateSubjectAssignmentReportPDF(assignments, subjectName);
  };
  return (
    <div
      className={`${styles["subject-assignment-report"]} ${
        themeMode && styles["dark"]
      }`}
    >
      <div className={styles["report-title"]}>
        <h2>Subject Wise Assignment Report</h2>
        <PrimaryBtn onClick={downloadPDF} disabled={assignments.length === 0}>
          Download PDF
        </PrimaryBtn>
      </div>
      <UnderLine themeMode={themeMode} />
      <AssignmentReport themeMode={themeMode} assignments={assignments} />
    </div>
  );
};

export default SubjectAssignmentReport;
