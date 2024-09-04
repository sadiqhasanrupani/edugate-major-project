import { useState } from "react";

const useDateFormat = (date) => {
  // const [dateIsValid, setDateIsValid] = useState(true);

  if (!date) {
    // setDateIsValid(false);
    return "";
  }

  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = ("0" + (formattedDate.getMonth() + 1)).slice(-2);
  const day = ("0" + formattedDate.getDate()).slice(-2);
  const hours = ("0" + formattedDate.getHours()).slice(-2);
  const minutes = ("0" + formattedDate.getMinutes()).slice(-2);
  const seconds = ("0" + formattedDate.getSeconds()).slice(-2);

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return {
    formattedDateTime,
  };
};

export default useDateFormat;
