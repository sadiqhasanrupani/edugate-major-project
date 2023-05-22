import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import addMonths from "date-fns/addMonths";

import styles from "./QuizStartAndEndData.module.scss";

//^ hook
import useInput from "../../hooks/user-input";

const QuizStartAndEndDate = ({ themeMode, onQuizStartEndDate }) => {
  const handleColor = (time) => {
    return time.getHours() > 12 ? styles["text-success"] : styles["text-error"];
  };

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    onQuizStartEndDate(startDate, endDate);
  }, [onQuizStartEndDate, startDate, endDate]);

  return (
    <div
      className={`${styles["quiz-start-end-date"]} ${
        themeMode && styles["dark"]
      }`}
    >
      <div className={`${styles["start-time"]}`}>
        <label>START DATE - END DATE</label>
        <div>
          <div className={styles["date-picker"]}>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              withPortal
              timeFormat="hh:mm aa"
              dateFormat="MMMM d, yyyy  h:mm aa"
              name="start-date"
              isClearable
              placeholderText="Enter the start-end date"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizStartAndEndDate;
