import React from "react";
import { PolarArea } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";


const PolarChart = ({data, option}) => {
  return <PolarArea data={data} options={option} />;
}

export default PolarChart