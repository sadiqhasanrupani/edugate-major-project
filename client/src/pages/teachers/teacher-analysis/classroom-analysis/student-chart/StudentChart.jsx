import React from "react";
import styles from "./StudentChart.module.scss";
import LineCharts from "../../../../../components/Charts/LineCharts/LineChart";

const StudentChart = ({ studentsData }) => {
  const studentCounts = Array(12).fill(0);

  studentsData.forEach((student) => {
    const month = new Date(student.createdAt).getMonth();
    studentCounts[month]++;
  });

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

  const chartData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Students Joined per Month",
        data: studentCounts,
        fill: false,
        borderColor: "rgb(153, 102, 255)",
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
    <div className={styles["line-chart"]}>
      <LineCharts data={chartData} options={chartOptions} />
    </div>
  );
};

export default StudentChart;
