import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";

export default function DoughnutChart({ data, option, className }) {
  return <Doughnut data={data} options={option} className={className} />;
}
