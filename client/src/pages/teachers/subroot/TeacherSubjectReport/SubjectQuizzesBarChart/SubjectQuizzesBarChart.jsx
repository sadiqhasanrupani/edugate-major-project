import React from "react";

//^ Charts
import PolarChart from "../../../../../components/Charts/PolarChart/PolarChart";

//^ styles
import styles from "./SubjectQuizzesBarChart.module.scss";

const SubjectQuizzesBarChart = ({ themeMode, quizzesData }) => {
  //^ Extracting the total marks and labels form the quizzesData
  const totalMarks = quizzesData.map((quiz) => quiz.total_marks);

  const labels = quizzesData.map((quiz) => quiz.title);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Total Marks",
        data: totalMarks,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "hsl(156, 100%, 55%)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scale: {
      ticks: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      className={`${styles["subject-quizzes-chart"]} ${
        themeMode && styles.dark
      }`}
    >
      <PolarChart data={chartData} option={chartOptions} />
    </div>
  );
};

export default SubjectQuizzesBarChart;
