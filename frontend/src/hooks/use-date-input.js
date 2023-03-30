import { useState } from "react";

const useDateInput = () => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [enteredValidValue, setEnteredValidValue] = useState(true);

  const hasError = !enteredValidValue && isTouched;

  const onChangeHandler = (e) => {
    setSelectedDate(e);

    if (date && isNaN(date.getTime())) {
      setEnteredValidValue(false);
    } else {
      setEnteredValidValue(true);
    }
  };

  const onBlurHandler = (e) => {
    if (e) {
      setSelectedDate(e);
    }

    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setSelectedDate("");
    setIsTouched(false);
  };

  return {
    enteredValue,
    isValid: enteredValidValue,
    hasError,
    onChangeHandler,
    onBlurHandler,
    reset,
    selectedDate,
  };
};

export default useDateInput;
