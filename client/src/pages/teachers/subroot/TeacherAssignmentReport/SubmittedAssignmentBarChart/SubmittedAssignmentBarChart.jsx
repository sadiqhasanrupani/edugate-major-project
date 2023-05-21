import React from "react";
import { Bar } from "react-chartjs-2";

import styles from "./SubmittedAssignmentBarChart.module.scss"

const SubmittedAssignmentBarChart = ({ submittedAssignments }) => {
  // Sort the submitted assignments based on grade/total_marks
  const sortedAssignments = submittedAssignments
    .slice()
    .sort((a, b) => {
      const gradeA = a.grade / a.assignment.total_marks;
      const gradeB = b.grade / b.assignment.total_marks;
      return gradeB - gradeA; // Sort in descending order
    })
    .slice(0, 10); // Take the top 10 assignments

  // Prepare data for the BarChart
  const data = {
    labels: sortedAssignments.map(
      (assignment) =>
        `${assignment.student.student_first_name} ${assignment.student.student_last_name}`
    ), // Assuming student_first_name and student_last_name are the fields that represent the student's first and last names
    datasets: [
      {
        label: "Grade/Total Marks",
        data: sortedAssignments.map(
          (assignment) => assignment.grade / assignment.assignment.total_marks
        ),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Grade/Total Marks",
        },
      },
      x: {
        title: {
          display: true,
          text: "Student",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: () => "", // Hide the default title tooltip
          label: (context) => {
            const assignment = sortedAssignments[context.dataIndex];
            const grade = assignment.grade;
            const totalMarks = assignment.assignment.total_marks;
            const studentName = `${assignment.student.student_first_name} ${assignment.student.student_last_name}`;
            return `Grade: ${grade}\nTotal Marks: ${totalMarks}\nStudent: ${studentName}`;
          },
        },
      },
    },
  };

  return (
    <div className={styles['bar-chart']}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SubmittedAssignmentBarChart;
