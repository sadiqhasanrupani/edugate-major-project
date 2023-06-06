import React from "react";

import styles from "./SubjectStudentReport.module.scss";
import UnderLine from "../../../../../components/UI/underline/UnderLine";
import PrimaryBtn from "../../../../../components/UI/Buttons/PrimaryBtn";
import StudentReport from "./StudentReport/StudentReport";
import generateSubjectStudentPDF from "./generateSubjectStudentPDF/generateSubjectStudentPDF.js";

const SubjectStudentReport = ({ subjectName, studentsData, themeMode }) => {
  const downloadPDF = () => {
    generateSubjectStudentPDF(studentsData, subjectName);
  };
  return (
    <div
      className={`${styles["subject-student-report"]} ${
        themeMode && styles["dark"]
      }`}
    >
      <div className={styles["report-title"]}>
        <h2>Subject Wise Student Report</h2>
        <PrimaryBtn onClick={downloadPDF} disabled={studentsData.length === 0}>
          Download PDF
        </PrimaryBtn>
      </div>
      <UnderLine themeMode={themeMode} />
      <StudentReport themeMode={themeMode} studentsData={studentsData} />
    </div>
  );
};

export default SubjectStudentReport;
