import React, { Fragment } from "react";

import styles from "./SearchResultList.module.scss";

import SecondaryCard from "../Card/CardSecondary";
import ClassroomCard from "./ClassroomCard/ClassroomCard";
import SubjectCard from "./SubjectCard/SubjectCard";
import AssignmentCard from "./AssignmentCard/AssignmentCard";
import QuizCard from "./QuizCard/QuizCard";

const SearchResultList = ({ themeMode, searchResultData }) => {
  return (
    <div
      className={`${styles["search-result-list"]} ${themeMode && styles.dark}`}
    >
      {(searchResultData.classrooms &&
        searchResultData.classrooms.length > 0) ||
      (searchResultData.subjects && searchResultData.subjects.length > 0) ||
      (searchResultData.assignments &&
        searchResultData.assignments.length > 0) ||
      (searchResultData.quizzes && searchResultData.quizzes.length > 0) ? (
        <SecondaryCard className={styles["secondary-card"]}>
          <div className={styles["card"]}>
            <ClassroomCard />
            <SubjectCard />
            <AssignmentCard />
            <QuizCard />
          </div>
        </SecondaryCard>
      ) : (
        "burh"
      )}
    </div>
  );
};

export default SearchResultList;
