import React from "react";

import DoughnutChart from "../../../../../components/Charts/DoughnutChart/DoughnutChart";

import styles from "./SubjectTeacherStudentDoughnutChart.module.scss";

const SubjectTeacherStudentDonutChart = ({
  studentsData,
  assignmentsData,
  themeMode,
}) => {
  const data = {
    labels: ["Students", "Assignments"],
    datasets: [
      {
        data: [studentsData.length, assignmentsData.length],
        backgroundColor: ["#FF6384", "rgba(67, 246, 94, 0.8)"],
        hoverBackgroundColor: ["#FF6384", "rgba(67, 246, 94, 0.811)"],
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
