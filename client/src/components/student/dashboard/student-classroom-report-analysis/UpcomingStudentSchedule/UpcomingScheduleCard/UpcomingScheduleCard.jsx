import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./UpcomingScheduleCard.module.scss";
import shortenString from "../../../../../../utils/string-shrinker";
import SecondaryCard from "../../../../../UI/Card/CardSecondary";
import CounterBox from "./CountBox/CountBox";

const UpcomingScheduleCard = ({
  themeMode,
  count,
  title,
  startDate,
  endDate,
  assignmentId,
  quizId,
}) => {
  const { joinSubjectId } = useParams();
  const currentDate = new Date();

  const startDateString = startDate;
  const startDateDate = new Date(startDateString);

  const endDateString = endDate;
  const endDateDate = new Date(endDateString);

  const startDay = startDateDate.getDate();
  const startMonth = startDateDate.getMonth() + 1; // Months are zero-based, so we add 1
  const startYear = startDateDate.getFullYear() % 100;

  const endDay = endDateDate.getDate();
  const endMonth = endDateDate.getMonth() + 1;
  const endYear = endDateDate.getFullYear() % 100;

  const startFormattedDate = `${startDay
    .toString()
    .padStart(2, "0")}/${startMonth.toString().padStart(2, "0")}/${startYear
    .toString()
    .padStart(2, "0")}`;

  const endFormattedDate = `${endDay.toString().padStart(2, "0")}/${endMonth
    .toString()
    .padStart(2, "0")}/${endYear.toString().padStart(2, "0")}`;

  const shrinkTitle = shortenString(title, 15);

  const isWithinRange =
    currentDate >= startDateDate && currentDate <= endDateDate;

  const isCurrentDay =
    currentDate.getDay === startDateDate.getDay &&
    currentDate.getDate === startDateDate.getDate;

  return (
    <div
      className={`${styles["upcoming-schedule"]} ${themeMode && styles.dark}`}
    >
      <SecondaryCard className={styles["secondary-card"]}>
        <div className={styles["title"]}>
          <CounterBox themeMode={themeMode} count={count} />
          <p>
            {isCurrentDay ? (
              <Link
                to={`${
                  assignmentId
                    ? `/student/subject/${joinSubjectId}/assignment/${assignmentId}`
                    : quizId && `/student/${joinSubjectId}/give-quiz/${quizId}`
                }`}
              >
                {shrinkTitle}
              </Link>
            ) : (
              <span>{shrinkTitle}</span>
            )}
          </p>
        </div>
        <div className={styles["date"]}>
          <div className={styles["start-date"]}>
            <h6>START DATE</h6>
            <p>{startFormattedDate}</p>
          </div>
          {/* <div className={styles["end-date"]}>
            <h6>END DATE</h6>
            <p>{endFormattedDate}</p>
          </div> */}
        </div>
      </SecondaryCard>
    </div>
  );
};

export default UpcomingScheduleCard;
