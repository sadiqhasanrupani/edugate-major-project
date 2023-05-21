import React from "react";

import styles from "./SubjectAssignmentPolarAreaChart.module.scss";

import PolarChart from "../../../../../components/Charts/PolarChart/PolarChart.jsx";

const SubjectAssignmentPolarAreaChart = ({ assignmentsData }) => {
  // Extracting the total marks and labels from assignmentsData
  const totalMarks = assignmentsData.map(
    (assignment) => assignment.assignment.total_marks
  );
  const labels = assignmentsData.map(
    (assignment) => assignment.assignment.topic
  );

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
    <div className={styles["assignment-polar-chart"]}>
      <PolarChart data={chartData} options={chartOptions} />
    </div>
  );
};

export default SubjectAssignmentPolarAreaChart;
