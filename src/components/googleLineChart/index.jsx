import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useTranslation } from "react-i18next";

const StatisticsLineChart = ({ theme, data }) => {
  const { i18n, t } = useTranslation();

  const options = {
    chart: {
      type: "column",
      backgroundColor: theme.backgroundColor,
    },
    title: {
      text: "",
      align: "left",
      style: { fontSize: "16px", fontWeight: "bold" },
    },
    xAxis: {
      categories: data.date,
      crosshair: true,
      labels: {
        style: { color: theme.text }, // X o'qi matn rangi
      },
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
        name: `${t("dashboardPageData.buttonAggregate")} (m³)`,
        data: data.volume,
        color: "#4169E1",
      },
      {
        name: `${t("dataPagesInformation.allStationsElektrActiveEnergy")} ${t(
          "dashboardPageData.lastStationsData.energyValueView"
        )}`,
        data: data.energyActive,
        color: "#32CD32",
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default StatisticsLineChart;
