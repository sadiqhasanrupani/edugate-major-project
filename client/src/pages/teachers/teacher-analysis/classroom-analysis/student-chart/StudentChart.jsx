import React from "react";

import styles from "./StudentChart.module.scss"

//^ component
import LineCharts from "../../../../../components/Charts/LineCharts/LineChart";

const StudentChart = ({ studentsData }) => {
  //^ Initialize an array to hold the count of students per month
  const studentCounts = Array(12).fill(0);

  //^ Loop through the studentsData array and count the number of students per month
  studentsData.forEach((student) => {
    const month = new Date(student.createdAt).getMonth();
    studentCounts[month]++;
  });

  //^ Define the month labels
  const monthLabels = [
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
  ];

  //^ Extract the student counts into a separate array for use in the chart
  const data = studentCounts;

  //^ Define the chart data and options
  const chartData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Students Joined per Month",
        data: data,
        fill: false,
        borderColor: "#2196f3",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            precision: 0,
          },
        },
      ],
    },
  };
  return (
    <div className={styles['line-chart']}>
      <LineCharts data={chartData} options={chartOptions} />
    </div>
  );
};

export default StudentChart;
