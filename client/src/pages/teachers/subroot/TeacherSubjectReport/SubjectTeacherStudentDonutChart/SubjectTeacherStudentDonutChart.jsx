import React from "react";

import DoughnutChart from "../../../../../components/Charts/DoughnutChart/DoughnutChart";

import styles from "./SubjectTeacherStudentDoughnutChart.module.scss";

const SubjectTeacherStudentDonutChart = ({
  studentsData,
  assignmentsData,
  themeMode,
  quizzesData,
}) => {
  const data = {
    labels: ["Students", "Assignments", "Quizzes"],
    datasets: [
      {
        data: [studentsData.length, assignmentsData.length, quizzesData.length],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      },
    ],
  };

  return (
    <div className={`${styles["doughnut"]} ${themeMode && styles.dark}`}>
      <DoughnutChart data={data} className={styles["doughnut-chart"]} />
    </div>
  );
};

export default SubjectTeacherStudentDonutChart;
