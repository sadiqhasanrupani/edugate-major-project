import React from "react";

import styles from "./SubjectTeacherReport.module.scss";
import UnderLine from "../../../../../components/UI/underline/UnderLine";
import PrimaryBtn from "../../../../../components/UI/Buttons/PrimaryBtn";
import TeacherReport from "./TeacherReport/TeacherReport";
import generateSubjectTeacherPDF from "./generateSubjectTeacherPDF/generateSubjectTeacherPDF";

const SubjectTeacherReport = ({ themeMode, teachersData, subjectName }) => {
  const downloadPDF = () => {
    generateSubjectTeacherPDF(teachersData, subjectName);
  };

  return (
    <div
      className={`${styles["subject-teacher-report"]} ${
        themeMode && styles["dark"]
      }`}
    >
      <div className={styles["report-title"]}>
        <h2>Subject Wise Teacher Report</h2>
        <PrimaryBtn onClick={downloadPDF} disabled={teachersData.length === 0}>
          Download PDF
        </PrimaryBtn>
      </div>
      <UnderLine themeMode={themeMode} />
      <TeacherReport teachersData={teachersData} />
    </div>
  );
};

export default SubjectTeacherReport;
