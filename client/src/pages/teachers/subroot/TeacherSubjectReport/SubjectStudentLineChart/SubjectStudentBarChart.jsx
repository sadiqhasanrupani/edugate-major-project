import LineCharts from "../../../../../components/Charts/LineCharts/LineChart";

import styles from "./SubjectStudentLineChart.module.scss";

const SubjectStudentLineChart = ({ studentsData, themeMode }) => {
  //^ Initialize an array to hold the count of students per month
  const studentCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  //^ Loop through the studentsData array and count the number of students per month
  studentsData.forEach((student) => {
    const joinDate = new Date(student.createdAt);
    const month = joinDate.getMonth();
    studentCounts[month]++;
  });

  //^ Define the chart data and options
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Students Joined",
        data: studentCounts,
        borderColor: `${
          themeMode ? "hsla(0, 0%, 100%, 0.616)" : "rgb(75, 192, 192)"
        }`,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        precision: 0,
      },
    },
  };

  return (
    <div className={`${styles["line-chart"]} ${themeMode && styles.dark}`}>
      <LineCharts data={data} options={options} className={styles["line"]} />
    </div>
  );
};

export default SubjectStudentLineChart;
