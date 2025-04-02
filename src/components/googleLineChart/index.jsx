import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const StatisticsLineChart = ({data}) => {
  const options = {
    chart: {
      type: "column",
      backgroundColor: "#ffffff",
    },
    title: {
      text: "",
      align: "left",
      style: { fontSize: "16px", fontWeight: "bold" },
    },
    xAxis: {
      categories: data.date,
      crosshair: true,
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function () {
        return `<div style="text-align:center;"><b>${this.series.name}: ${this.y}</b></div>`;
      },
    },
    plotOptions: {
      column: {
        borderRadius: "10%",
        dataLabels: {
          enabled: true,
          format: "{y}",
        },
      },
    },
    series: [
      {
        name: "Suv hajmi (m³)",
        data: data.volume,
        color: "#4169E1",
      },
      {
        name: "Sariflangan energiya (kWh)",
        data: data.energyActive,
        color: "#32CD32",
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default StatisticsLineChart;
