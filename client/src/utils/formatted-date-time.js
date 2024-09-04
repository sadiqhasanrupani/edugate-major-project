const formattedDateTime = (date) => {
  const newDate = new Date(date);

  const formattedDate = newDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });

  const formattedTime = newDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const formattedDateTime = `${formattedDate}, ${formattedTime}`;

  return formattedDateTime;
};

export default formattedDateTime;
