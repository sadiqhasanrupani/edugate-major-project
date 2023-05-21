import React from "react";
import { Bar } from "react-chartjs-2";

import styles from "./SubjectLineChart.module.scss";

const SubjectLineChart = ({
  compulsorySubjectsData,
  optionalSubjectsData,
  compulsoryCount,
  optionalCount,
}) => {
  const data = {
    labels: ["Compulsory Subjects", "Optional Subjects"],
    datasets: [
      {
        label: "Number of Subjects",
        data: [compulsoryCount, optionalCount],
        backgroundColor: ["rgba(153, 102, 255, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgb(153, 102, 255)", "rgb(255, 99, 132)"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Subjects",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Subjects",
        },
      },
    },
  };

  return (
    <div className={styles["scatter-chart"]}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SubjectLineChart;
