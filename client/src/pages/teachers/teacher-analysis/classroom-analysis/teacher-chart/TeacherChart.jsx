import React from "react";
import BarCharts from "../../../../../components/Charts/Barcharts/BarCharts";

const TeacherBarChart = ({ teachersData }) => {
  const teacherCounts = {};

  teachersData.forEach((teacher) => {
    const month = new Date(teacher.createdAt).toLocaleDateString("en-US", {
      month: "long",
    });
    teacherCounts[month] = (teacherCounts[month] || 0) + 1;
  });

  const labels = Object.keys(teacherCounts);
  const data = Object.values(teacherCounts);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Teachers Joined per Month",
        data,
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgb(255, 159, 64)",
        borderWidth: 2
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            precision: 0,
          },
        },
      ],
    },
  };

  return (
    <div>
      <BarCharts data={chartData} options={chartOptions} />
    </div>
  );
};

export default TeacherBarChart;
