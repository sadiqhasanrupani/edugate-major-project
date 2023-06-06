import React from "react";
import { Bar } from "react-chartjs-2";

import styles from "./PendingAssignmentLineChart.module.scss";

const NotSubmittedAssignmentLineChart = ({ joinedAssignmentsData }) => {
  //^ Filter the joined assignments to get only those without a submitted_assignment_id
  const notSubmittedAssignments = joinedAssignmentsData.filter(
    (assignment) => !assignment.submitted_assignment_id
  );

  //^ Extract the student names from the not submitted assignments
  const studentNames = notSubmittedAssignments.map(
    (assignment) =>
      `${assignment.student.student_first_name} ${assignment.student.student_last_name}`
  );

  //^ Generate an array of labels for the chart
  const labels = studentNames.length > 0 ? studentNames : ["No Data"];

  //^ Generate an array of data points for the chart (all values set to 1)
  const data = Array(studentNames.length).fill(1);

  //^ Extract the due dates for assignment submission
  const dueDates = notSubmittedAssignments.map(
    (assignment) => assignment.assignment.end_date
  );

  //^ Chart configuration
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Not Submitted Assignments",
        data: data,
        backgroundColor: "hsl(176, 63%, 77%, 0.50)",
        borderColor: "hsl(176, 63%, 47%)",
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
    <div className={styles["line-chart"]}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default NotSubmittedAssignmentLineChart;
