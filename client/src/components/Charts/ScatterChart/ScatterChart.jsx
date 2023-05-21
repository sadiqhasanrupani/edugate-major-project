import React from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";

export default function ScatterCharts({ data, option }) {
  return <Scatter data={data} options={option} />;
}