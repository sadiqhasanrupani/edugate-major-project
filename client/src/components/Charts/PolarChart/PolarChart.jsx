import React from "react";
import { PolarArea } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";

const PolarChart = ({ data, option, className }) => {
  return <PolarArea data={data} options={option} className={className} />;
};

export default PolarChart;
