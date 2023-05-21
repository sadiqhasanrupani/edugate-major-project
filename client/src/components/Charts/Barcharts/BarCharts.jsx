import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";

const BarCharts = ({ data, options }) => {
  return <Bar data={data} options={options} />;
};

export default BarCharts;
