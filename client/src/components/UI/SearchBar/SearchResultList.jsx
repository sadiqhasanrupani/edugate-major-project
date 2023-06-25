import React from "react";
import styles from "./SearchResultList.module.scss";

import SecondaryCard from "../Card/CardSecondary";
import ClassroomCard from "./ClassroomCard/ClassroomCard";
import SubjectCard from "./SubjectCard/SubjectCard";
import AssignmentCard from "./AssignmentCard/AssignmentCard";
import QuizCard from "./QuizCard/QuizCard";

const SearchResultList = ({ themeMode, searchResultData }) => {
  const hasResults =
    (searchResultData.classrooms && searchResultData.classrooms.length > 0) ||
    (searchResultData.subjects && searchResultData.subjects.length > 0) ||
    (searchResultData.assignments && searchResultData.assignments.length > 0) ||
    (searchResultData.quizzes && searchResultData.quizzes.length > 0);

  return (
    <div
      className={`${styles["search-result-list"]} ${
        themeMode ? styles.dark : ""
      }`}
    >
      {hasResults && (
        <SecondaryCard className={styles["secondary-card"]}>
          <div className={styles["card"]}>
            {searchResultData.classrooms.length > 0 && (
              <ClassroomCard
                themeMode={themeMode}
                classroomData={searchResultData.classrooms}
              />
            )}
            {searchResultData.subjects.length > 0 && (
              <SubjectCard
                themeMode={themeMode}
                subjectData={searchResultData.subjects}
              />
            )}
            {searchResultData.assignments.length > 0 && (
              <AssignmentCard
                themeMode={themeMode}
                assignmentData={searchResultData.assignments}
              />
            )}
            {searchResultData.quizzes.length > 0 && (
              <QuizCard
                themeMode={themeMode}
                quizData={searchResultData.quizzes}
              />
            )}
          </div>
        </SecondaryCard>
      )}
    </div>
  );
};

export default SearchResultList;
