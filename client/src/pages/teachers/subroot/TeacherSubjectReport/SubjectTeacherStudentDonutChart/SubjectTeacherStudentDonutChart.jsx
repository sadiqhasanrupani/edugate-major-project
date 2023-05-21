import React from "react";

import DoughnutChart from "../../../../../components/Charts/DoughnutChart/DoughnutChart.jsx";

import styles from "./SubjectTeacherStudentDoughnutChart.module.scss";

const SubjectTeacherStudentDonutChart = ({ studentsData, assignmentsData }) => {
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
    <div className={styles["doughnut"]}>
      <DoughnutChart data={data} />
    </div>
  );
};

export default SubjectTeacherStudentDonutChart;
