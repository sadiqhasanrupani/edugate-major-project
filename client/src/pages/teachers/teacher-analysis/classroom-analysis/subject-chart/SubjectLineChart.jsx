import React from "react";
import { Bar } from "react-chartjs-2";

import styles from "./SubjectLineChart.module.scss";

const SubjectLineChart = ({ compulsoryCount, optionalCount, themeMode }) => {
  const data = {
    labels: ["Compulsory Subjects", "Optional Subjects"],
    datasets: [
      {
        label: "Number of Subjects",
        data: [compulsoryCount, optionalCount],
        backgroundColor: [
          `${
            themeMode ? `hsla(0, 0%, 100%, 0.616)` : "rgb(153, 102, 255, 0.2)"
          }`,
          `${themeMode ? "hsl(234, 19%, 21%)" : "rgba(255, 99, 132, 0.2)"}`,
        ],
        borderColor: [
          `${themeMode ? `hsla(0, 0%, 100%, 0.616)` : "rgb(153, 102, 255)"}`,
          `${themeMode ? "hsl(234, 19%, 21%)" : "rgba(255, 99, 132)"}`,
        ],
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
    <div className={`${styles["scatter-chart"]} ${themeMode && styles.dark}`}>
      <Bar data={data} options={options} className={styles["bar"]} />
    </div>
  );
};

export default SubjectLineChart;
