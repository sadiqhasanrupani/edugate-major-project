import React from "react";
import { Radar } from "react-chartjs-2";

import styles from "./StudentScoreRadarChart.module.scss";

const StudentScoreRadarChart = ({ themeMode, assignmentsScore }) => {
  // Extract the necessary data for the chart
  const labels = assignmentsScore.map((score) => score.assignmentName);
  const data = assignmentsScore.map((score) => score.grade);
  const totalMarks = assignmentsScore.map((score) => score.totalMarks);

  // Create the chart dataset
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Grade",
        data: data,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      },
      {
        label: "Total Marks",
        data: totalMarks,
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
    ],
  };

  // Define the chart options
  const chartOptions = {
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: Math.max(...totalMarks) + 10,
      },
    },
  };

  return (
    <div className={`${styles["radar-chart"]} ${themeMode && styles.dark}`}>
      <Radar data={chartData} options={chartOptions} />
    </div>
  );
};

export default StudentScoreRadarChart;
