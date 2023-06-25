import React, { Fragment } from "react";

import styles from "./AssignmentCard.module.scss";

import SearchCard from "../SearchCard/SearchCard";

const AssignmentCard = ({ themeMode, assignmentData }) => {
  return (
    <div className={`${styles["assignment-card"]} ${themeMode && styles.dark}`}>
      {assignmentData.length > 0 &&
        assignmentData.map((assignment) => {
          return (
            <Fragment key={assignment.assignment_id}>
              <SearchCard
                classroomName={assignment.classroom.classroom_name}
                itemName={"Assignment"}
                link={`/teacher/dashboard/assignment-report/${assignment.assignment_id}`}
                name={assignment.topic}
                profileImg={assignment.classroom.classroom_profile_img}
                themeMode={themeMode}
                subjectName={assignment.subject.subject_name}
              />
            </Fragment>
          );
        })
        }
    </div>
  );
};

export default AssignmentCard;
