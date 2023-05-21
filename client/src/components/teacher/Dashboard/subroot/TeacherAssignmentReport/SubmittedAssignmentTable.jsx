import React from "react";

import styles from "./SubmittedAssignmentTable/SubmittedAssignmentTable.module.scss";

import UnderLine from "../../../../UI/underline/UnderLine";
import PrimaryBtn from "../../../../UI/Buttons/PrimaryBtn";
import SubmittedAssignmentTableReport from "./SubmittedAssignmentTableReport/SubmittedAssignmentTableReport";
import generateSubmittedAssignmentPDF from "./generateSubmittedAssignmentPDF/generateSubmittedAssignmentPDF.js";
import SmallEmptyFolder from "../../../../UI/Icons/EmptyFolder/SmallEmptyFolder";

const SubmittedAssignmentTable = ({
  themeMode,
  assignmentTopic,
  classroomName,
  submittedAssignmentsData,
  assignmentName,
  subjectName,
}) => {
  const downloadPDFHandler = () => {
    generateSubmittedAssignmentPDF(
      submittedAssignmentsData,
      assignmentName,
      classroomName,
      subjectName
    );
  };

  return (
    <div
      className={`${styles["submitted-assignment-table"]} ${
        themeMode && styles["dark"]
      }`}
    >
      <div className={`${styles["title"]}`}>
        <div className={`${styles["flex"]} ${styles["align-center"]}}`}>
          <h2>{assignmentTopic} Submitted Assignment Report</h2>
          <h5>{classroomName.toUpperCase()}</h5>
        </div>
        <PrimaryBtn
          onClick={downloadPDFHandler}
          className={styles["primary-btn"]}
          disabled={submittedAssignmentsData.length === 0}
        >
          Download PDF
        </PrimaryBtn>
      </div>
      <UnderLine className={styles["underline"]} themeMode={themeMode} />
      {submittedAssignmentsData.length !== 0 ? (
        <SubmittedAssignmentTableReport
          submittedAssignmentsData={submittedAssignmentsData}
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

export default SubmittedAssignmentTable;
