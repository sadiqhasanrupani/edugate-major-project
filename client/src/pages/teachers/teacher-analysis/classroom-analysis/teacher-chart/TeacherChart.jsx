import React from "react";
import BarCharts from "../../../../../components/Charts/Barcharts/BarCharts";

const TeacherBarChart = ({ teachersData, className, themeMode }) => {
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
        backgroundColor: `${
          themeMode ? `hsla(0, 0%, 100%, 0.616)` : "rgba(255, 159, 64, 0.2)"
        }`,
        borderColor: `${
          themeMode ? `hsla(0, 0%, 100%, 0.616)` : "rgb(255, 159, 64)"
        }`,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // scales: {
    //   yAxes: [
    //     {
    //       ticks: {
    //         beginAtZero: true,
    //         precision: 0,
    //       },
    //     },
    //   ],
    // },
  };

  return (
    <div>
      <BarCharts
        data={chartData}
        options={chartOptions}
        className={className}
      />
    </div>
  );
};

export default TeacherBarChart;
