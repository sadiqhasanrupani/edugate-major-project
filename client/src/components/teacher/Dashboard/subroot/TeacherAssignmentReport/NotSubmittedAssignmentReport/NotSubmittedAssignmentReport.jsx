import React from "react";

import styles from "./NotSubmittedAssignmentReport.module.scss";

//^ component
import NotSubmittedAssignmentReportTable from "./NotSubmittedAssignmentReportTable/NotSubmittedAssignmentReportTable";
import PrimaryBtn from "../../../../../UI/Buttons/PrimaryBtn";
import UnderLine from "../../../../../UI/underline/UnderLine";
import SmallEmptyFolder from "../../../../../UI/Icons/EmptyFolder/SmallEmptyFolder";
import generateNotSubmittedAssignmentPDF from "./generateNotSubmittedAssignmentPDF/generateNotSubmittedAssignmentPDF.js";

const NotSubmittedAssignmentReport = ({
  themeMode,
  assignmentName,
  classroomName,
  joinedAssignmentsData,
  subjectName,
}) => {
  const downloadPDFHandler = () => {
    generateNotSubmittedAssignmentPDF(
      joinedAssignmentsData,
      assignmentName,
      classroomName,
      subjectName
    );
  };

  const isSubmittedAssignment = joinedAssignmentsData.some(
    (assignment) => !assignment.submitted_assignment_id
  );

  return (
    <div
      className={`${styles["not-submitted-assignment"]} ${
        themeMode && styles["dark"]
      }`}
    >
      <div className={styles["not-submitted-assignment-title"]}>
        <div className={styles["title"]}>
          <h2>{assignmentName} Pending Assignments</h2>
          <h5>{classroomName.toUpperCase()}</h5>
        </div>
        <PrimaryBtn
          onClick={downloadPDFHandler}
          disabled={!isSubmittedAssignment}
        >
          Download PDF
        </PrimaryBtn>
      </div>
      <UnderLine themeMode={themeMode} className={styles["underline"]} />
      {isSubmittedAssignment ? (
        <NotSubmittedAssignmentReportTable
          themeMode={themeMode}
          joinedAssignmentsData={joinedAssignmentsData}
        />
      ) : (
        <div style={{ textAlign: "center" }}>
          <SmallEmptyFolder />
        </div>
      )}
    </div>
  );
};

export default NotSubmittedAssignmentReport;
