import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//* styles
import styles from "../../../scss/components/Input/DateInput.module.scss";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({
  className,
  onChange,
  onBlur,
  ref,
  type,
  name,
  placeholder,
  required,
  value,
  inputmessage,
  datePickerStyle,
  dateFormat,
  includeTimes,
  showTimeSelect,
  timeFormat,
  timeIntervals,
}) => {
  return (
    <div className={`${styles["date-input-div"]} ${className}`}>
      <ReactDatePicker
        className={`${styles["date-input"]} ${datePickerStyle}`}
        placeholderText={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        selected={value}
        dateFormat={dateFormat}
        name={name}
        required={required}
        showTimeSelect={showTimeSelect}
        timeFormat={timeFormat}
        timeIntervals={timeIntervals}
        includeTimes={includeTimes}
      />

      <h6>{inputmessage}</h6>
    </div>
  );
};

export default DateInput;
