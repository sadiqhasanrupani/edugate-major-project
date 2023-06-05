import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";

import styles from "./QuizStartAndEndData.module.scss";

import RedButton from "../../components/UI/Buttons/DeleteBtn/DeleteBtn";

const QuizStartAndEndDate = ({
  themeMode,
  onQuizStartEndDate,
  quizStartData,
  quizEndDate,
}) => {
  const handleColor = (time) => {
    return time.getHours() > 12 ? styles["text-success"] : styles["text-error"];
  };

  const [startDate, setStartDate] = useState(
    quizStartData ? new Date(quizStartData) : null
  );
  const [endDate, setEndDate] = useState(
    quizEndDate ? new Date(quizEndDate) : null
  );

  const datePickerRef = useRef(null);

  useEffect(() => {
    onQuizStartEndDate(startDate, endDate);
  }, [onQuizStartEndDate, startDate, endDate]);

  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
    datePickerRef.current.setFocus(); // Set focus back to the date picker after clearing the dates
  };

  const filterPastDates = (date) => {
    const currentDate = new Date();
    return (
      date >= currentDate || date.toDateString() === currentDate.toDateString()
    );
  };

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
              ref={datePickerRef}
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setStartDate(update[0]);
                setEndDate(update[1]);
              }}
              withPortal
              timeFormat="hh:mm aa"
              dateFormat="MMMM d, yyyy  h:mm aa"
              name="start-date"
              showDisabledMonthNavigation
              placeholderText="Enter the start-end date"
              filterDate={filterPastDates}
            />
            <RedButton
              className={styles["red-button"]}
              type={"button"}
              onClick={clearDates}
            >
              x
            </RedButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizStartAndEndDate;
