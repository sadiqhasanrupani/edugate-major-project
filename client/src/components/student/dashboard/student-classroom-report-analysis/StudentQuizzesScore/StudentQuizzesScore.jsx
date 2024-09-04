import React from "react";

import styles from "./StudentQuizzesScore.module.scss";

import LineCharts from "../../../../Charts/LineCharts/LineChart";

const StudentQuizzesScore = ({ themeMode, quizzesScore }) => {
  //^ Extract the necessary data for the chart
  const labels = quizzesScore.map((item) => item.quizName);
  const obtainedMarks = quizzesScore.map((item) => item.obtainedMarks);
  const totalMarks = quizzesScore.map((item) => item.totalMarks);

  //^ Create the chart dataset
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Total Marks",
        data: totalMarks,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
      {
        label: "Obtained Marks",
        data: obtainedMarks,
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
        max: Math.max(...totalMarks) + 10, //^ Adjust the maximum y-axis value
      },
    },
  };

  return (
    <div
      className={`${styles["student-quiz-score"]} ${themeMode && styles.dark}`}
    >
      <LineCharts
        data={chartData}
        option={chartOptions}
        className={styles["line-chart"]}
      />
    </div>
  );
};

export default StudentQuizzesScore;
