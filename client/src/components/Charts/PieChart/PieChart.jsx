import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";

export default function PieChart({ data, option }) {
  return <Pie data={data} options={option} />;
}