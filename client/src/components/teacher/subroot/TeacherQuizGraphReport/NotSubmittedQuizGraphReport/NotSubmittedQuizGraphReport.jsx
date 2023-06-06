import React from "react";

import styles from "./NotSubmittedQuizGraphReport.module.scss";

import BarCharts from "../../../../Charts/Barcharts/BarCharts";

const NotSubmittedQuizGraphReport = ({
  themeMode,
  notSubmittedStudentsData,
}) => {
  const studentNames = notSubmittedStudentsData.map((quiz) => {
    return `${quiz.student.student_first_name} ${quiz.student.student_last_name}`;
  });

  const labels = studentNames.length > 0 ? studentNames : ["No Data"];

  const data = Array(studentNames.length).fill(1);

  const dueDates = notSubmittedStudentsData.map((quiz) => quiz.quiz.end_date);

  const chartData = {
  labels,
  datasets: [
    {
      label: "Not Attempted Quizzes",
      data,
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};


  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 1,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const dataIndex = context.dataIndex;
            const dueDate = dueDates[dataIndex];
            return `Due Date: ${dueDate ? dueDate : "No Due Date"}`;
          },
        },
      },
    },
  };

  return (
    <div className={`${styles["quiz-report"]} ${themeMode && styles.dark}`}>
      <BarCharts data={chartData} options={chartOptions} />
    </div>
  );
};

export default NotSubmittedQuizGraphReport;
