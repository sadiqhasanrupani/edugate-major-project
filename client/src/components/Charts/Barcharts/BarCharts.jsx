import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";

const BarCharts = ({ data, options, className }) => {
  return <Bar data={data} options={options} className={className} />;
};

export default BarCharts;
