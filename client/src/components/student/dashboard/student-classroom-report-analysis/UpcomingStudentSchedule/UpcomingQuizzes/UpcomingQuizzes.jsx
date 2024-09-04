import React, { Fragment } from "react";

import styles from "./UpcomingQuizzes.module.scss";

//^ component
import UpcomingScheduleCard from "../UpcomingScheduleCard/UpcomingScheduleCard";
import SchedulePlaceholder from "../../../../../UI/Icons/assignment/student/dashboard/SchedulePlaceholder";

const UpcomingQuizzes = ({ themeMode, upcomingQuizzes }) => {
  let count = 0;

  return (
    <div className={styles["upcoming-quizzes"]}>
      <h5>Upcoming Quizzes</h5>

      <div className={styles["upcoming-quizzes"]}>
        {upcomingQuizzes.length > 0 ? (
          upcomingQuizzes.map((quiz) => {
            count = count + 1;
            return (
              <Fragment key={quiz.join_quiz_id}>
                <UpcomingScheduleCard
                  count={count}
                  dueDate={quiz.quiz.end_date}
                  themeMode={themeMode}
                  title={quiz.quiz.title}
                  startDate={quiz.quiz.start_date}
                  quizId={quiz.join_quiz_id}
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

export default UpcomingQuizzes;
