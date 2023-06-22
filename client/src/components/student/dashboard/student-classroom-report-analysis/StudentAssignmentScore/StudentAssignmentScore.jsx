import React from "react";

import styles from "./StudentAssignmentScore.module.scss";

import shortenString from "../../../../../utils/string-shrinker";

import LineCharts from "../../../../Charts/LineCharts/LineChart";

const StudentAssignmentScore = ({ themeMode, assignmentsScore }) => {
 
  //^ Extract the necessary data for the chart
  const labels = assignmentsScore.map((score) => {
    const assignmentScore = score.assignmentName;

    return shortenString(assignmentScore, 12)

  });
  const data = assignmentsScore.map((score) => score.grade);
  const totalMarks = assignmentsScore.map((score) => score.totalMarks);

  //^ Create the chart dataset
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Grade",
        data: data,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
      {
        label: "Total Marks",
        data: totalMarks,
        fill: false,
        borderColor: "#7959FD",
        tension: 0.1,
      },
    ],
  };

  //^ Define the chart options
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...totalMarks) + 10,
      },
    },
  };

  return (
    <div className={`${styles["line-chart"]} ${themeMode && styles.dark}`}>
      <LineCharts data={chartData} option={chartOptions} />
    </div>
  );
};

export default StudentAssignmentScore;
