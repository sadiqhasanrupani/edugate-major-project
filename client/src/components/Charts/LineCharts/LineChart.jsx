import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";

export default function LineCharts({ data, option }) {
  return <Line data={data} options={option} />;
}