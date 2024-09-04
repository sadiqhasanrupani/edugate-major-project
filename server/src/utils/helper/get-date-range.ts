const getDateRange = (startDate: Date, endDate: Date) => {
  const dateArray: Array<string> = [];
  const currentDate = new Date(startDate);
  const finalDate = new Date(endDate);

  while (currentDate <= finalDate) {
    dateArray.push(currentDate.toDateString());
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
};

export default getDateRange;
