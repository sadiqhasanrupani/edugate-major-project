import React, { useEffect, useState } from "react";
import { json } from "react-router-dom";

import styles from "./AssignmentCard.module.scss";

import SecondaryCard from "../../../../UI/Card/CardSecondary";
import AssignmentHeader from "./AssignmentHeader/AssignmentHeader";
import AssignmentFooter from "./AssignmentFooter/AssignmentFooter";
import LoadingBar from "../../../../UI/loading/LoadingBar/LoadingBar";

//^ auth
import { getAuthToken } from "../../../../../utils/auth";

const AssignmentCard = ({
  assignmentName,
  subjectName,
  assignmentID,
  themeMode,
}) => {
  const [getSubmittedAndJoinAssignment, setGetSubmittedAndJoinAssignment] =
    useState(null);

  useEffect(() => {
    const getSubmittedJoinedAssignment = async () => {
      const getSubmittedAndJoinAssignment = await fetch(
        `${process.env.REACT_APP_HOSTED_URL}/submitted-assignment/get-joined-and-submitted-assignments/${assignmentID}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        },
      );

      if (
        getSubmittedAndJoinAssignment.status === 401 ||
        getSubmittedAndJoinAssignment.status === 403
      ) {
        const response = await getSubmittedAndJoinAssignment.json();

        throw json(
          { message: response.message },
          { status: getSubmittedAndJoinAssignment.status },
        );
      }

      if (!getSubmittedAndJoinAssignment.ok) {
        // console.log(await getSubmittedAndJoinAssignment.json());
        throw json(
          { message: getSubmittedAndJoinAssignment.statusText },
          { status: getSubmittedAndJoinAssignment.status },
        );
      }

      setGetSubmittedAndJoinAssignment(
        await getSubmittedAndJoinAssignment.json(),
      );
    };
    getSubmittedJoinedAssignment();

    // eslint-disable-next-line
  }, []);

  const totalCount = getSubmittedAndJoinAssignment
    ? getSubmittedAndJoinAssignment.joinedAssignments.length
    : 0;

  const count = getSubmittedAndJoinAssignment
    ? getSubmittedAndJoinAssignment.submittedAssignments.length
    : 0;

  const progress = totalCount !== 0 ? (count / totalCount) * 100 : 0;

  return (
    <div className={`${styles["assignment-card"]} ${themeMode && styles.dark}`}>
      <SecondaryCard className={styles["secondary-card"]}>
        <AssignmentHeader
          assignmentName={assignmentName}
          subjectName={subjectName}
          themeMode={themeMode}
          assignmentID={assignmentID}
        />
        <LoadingBar progress={progress.toFixed(1)} />
        <AssignmentFooter assignmentID={assignmentID} />
      </SecondaryCard>
    </div>
  );
};

export default AssignmentCard;
