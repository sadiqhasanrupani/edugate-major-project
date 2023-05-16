import React from 'react';

import BarCharts from '../../../../../components/Charts/Barcharts/BarCharts';

const TeacherBarChart = ({ teachersData }) => {
  //^ Initialize a dictionary to hold the count of teachers per month
  const teacherCounts = {};

  //^ Loop through the teachersData array and count the number of teachers per month
  teachersData.forEach((teacher) => {
    const month = new Date(teacher.createdAt).toLocaleDateString('en-US', { month: 'long' });
    if (!teacherCounts[month]) {
      teacherCounts[month] = 0;
    }
    teacherCounts[month]++;
  });

  //^ Extract the months and teacher counts into separate arrays for use in the chart
  const labels = Object.keys(teacherCounts);
  const data = Object.values(teacherCounts);

  //^ Define the chart data and options
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Teachers Joined per Month',
        data: data,
        backgroundColor: '#2196f3',
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
