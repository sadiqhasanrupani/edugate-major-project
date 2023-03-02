import React from "react";
import { Link } from "react-router-dom";

// styles
import styles from "../../../scss/components/teacher/Classrooms/JoinedClassrooms.module.scss";

// components
import SecondaryCard from "../../../components/UI/Card/TeacherCard";
import PrimaryCard from "../../../components/UI/Card/CardSecondary";

const JoinedClassrooms = ({ classroomData }) => {
  return (
    <>
      <article className={styles["article"]}>
        <h2>Joined Classroom</h2>
        <SecondaryCard className={styles["secondary-card"]}>
          {classroomData.joinedClassrooms.length !== 0 ? (
            <Link>
              <PrimaryCard className={"primary-card"}>Hello</PrimaryCard>
            </Link>
          ) : undefined}
          <Link to="/join-classroom">
            <PrimaryCard className={styles["join-card"]}>
              Join Classroom
            </PrimaryCard>
          </Link>
        </SecondaryCard>
      </article>
    </>
  );
};

export default JoinedClassrooms;
