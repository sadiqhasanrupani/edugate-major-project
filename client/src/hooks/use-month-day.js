import React from "react";

const useMonthDay = (date) => {
  const dateString = date;
  const newDate = new Date(dateString);
  const options = { month: "long", day: "numeric" };
  const formattedDate = newDate.toLocaleString("en-US", options);

  return {
    formattedDate,
  };
};

export default useMonthDay;
