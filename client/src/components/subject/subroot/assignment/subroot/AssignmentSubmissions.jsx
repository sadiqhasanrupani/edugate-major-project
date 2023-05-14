import React from "react";
import { useSelector } from "react-redux";

//^ stylesheet
import styles from "./AssignmentSubmission.module.scss"

//^ component
import SubmittedAssignmentsTable from "../../../../UI/Tables/submitted-assignments-table/SubmittedAssignmentTable";

const AssignmentSubmissions = ({ submittedAssignments }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  return (
    <div
      className={`${styles["assignment-submissions"]} ${
        themeMode && styles["dark"]
      }`}
    >
      <h5>SUBMISSIONS</h5>
      <SubmittedAssignmentsTable submittedAssignments={submittedAssignments} />;
    </div>
  );
};

export default AssignmentSubmissions;
