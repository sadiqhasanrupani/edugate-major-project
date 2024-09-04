import React from "react";

//^ styles
import styles from "./TopTenAttemptedStudents.module.scss";

//^ components
import { Bar } from "react-chartjs-2";

const TopTenAttemptedStudents = ({ themeMode, submittedStudentsData }) => {
  const sortedQuizzes = submittedStudentsData
    .slice()
    .sort((a, b) => {
      const gradeA = a.obtained_marks / a.quiz.total_marks;
      const gradeB = b.obtained_marks / b.quiz.total_marks;
      return gradeB - gradeA;
    })
    .slice(0, 10);

  const data = {
    labels: sortedQuizzes.map(
      (quiz) =>
        `${quiz.student.student_first_name} ${quiz.student.student_last_name}`
    ),
    datasets: [
      {
        label: "Obtained marks / Total Marks",
        data: sortedQuizzes.map(
          (quiz) => quiz.obtained_marks / quiz.quiz.total_marks
        ),
        backgroundColor: [
          "rgba(255, 99, 132, 0.20)",
          "rgba(255, 159, 64, 0.20)",
          "rgba(255, 205, 86, 0.20)",
          "rgba(75, 192, 192, 0.20)",
          "rgba(54, 162, 235, 0.20)",
          "rgba(153, 102, 255, 0.20)",
          "rgba(201, 203, 207, 0.20)",
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
          text: "Obtained Marks / Total Marks",
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
          title: () => "", //^ Hide the default title tooltip
          label: (context) => {
            const quiz = sortedQuizzes[context.dataIndex];
            const obtainedMarks = quiz.obtained_marks;
            const totalMarks = quiz.quiz.total_marks;
            const studentName = `${quiz.student.student_first_name} ${quiz.student.student_last_name}`;
            return `Grade: ${obtainedMarks}\nTotal Marks: ${totalMarks}\nStudent: ${studentName}`;
          },
        },
      },
    },
  };

  return (
    <div className={`${styles["top-students"]} ${themeMode && styles.dark}`}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TopTenAttemptedStudents;
