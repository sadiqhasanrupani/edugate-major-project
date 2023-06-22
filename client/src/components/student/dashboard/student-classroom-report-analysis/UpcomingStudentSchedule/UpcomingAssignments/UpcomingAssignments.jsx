import React, { Fragment } from "react";

import styles from "./UpcomingAssignments.module.scss";

import UpcomingScheduleCard from "../UpcomingScheduleCard/UpcomingScheduleCard";
import SchedulePlaceholder from "../../../../../UI/Icons/assignment/student/dashboard/SchedulePlaceholder";

const UpcomingAssignments = ({ themeMode, upcomingAssignments }) => {
  let count = 0;

  return (
    <div
      className={`${styles["upcoming-assignment"]} ${themeMode && styles.dark}`}
    >
      <h5>Upcoming Assignments</h5>
      <div className={styles["upcoming-assignments"]}>
        {upcomingAssignments.length > 0 ? (
          upcomingAssignments.map((assignment) => {
            count = count + 1;
            return (
              <Fragment key={assignment.join_assignment_id}>
                <UpcomingScheduleCard
                  themeMode={themeMode}
                  count={count}
                  title={assignment.assignment.topic}
                  dueDate={assignment.assignment.end_date}
                  assignmentId={assignment.assignment.assignment_id}
                  startDate={assignment.assignment.start_date}
                />
              </Fragment>
            );
          })
        ) : (
          <div className={styles["schedule-placeholder"]}>
            <SchedulePlaceholder />
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingAssignments;
