import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";

export default function BarCharts({ data, option }) {
  return <Bar data={data} options={option} />;
}
