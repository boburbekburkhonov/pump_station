/** @format */

import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const SolarEmploymentChart = ({ theme, data, lineStatus }) => {
  const chartOptions = {
    chart: {
      type: "spline",
      backgroundColor: theme.backgroundColor,
      color: theme.text,
      height: 600,
    },
    title: {
      text: "",
      align: "center",
    },

    yAxis: {
      title: data.unit
        ? {
            text: `${data.name} (${data.unit})`,
            style: {
              color: theme.text,
            },
          }
        : null,
      labels: {
        style: {
          color: theme.text,
        },
        formatter: function () {
          return data.unit ? `${this.value} ${data.unit}` : this.value;
        },
      },
    },

    xAxis: {
      categories: data.date,
      labels: {
        style: {
          color: theme.text,
        },
      },
    },

    legend: lineStatus
      ? {
          layout: "horizontal",
          align: "center",
          verticalAlign: "top",
          itemStyle: {
            color: theme.text,
          },
        }
      : false,

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    tooltip: {
      shared: true,
      formatter: function () {
        return this.points
          .map(
            (point) =>
              `<span style="color:${point.color}">\u25CF</span> ${point.series.name}: <b>${point.y} ${point.series.userOptions.unit}</b><br/>`
          )
          .join("");
      },
    },

    series: data?.lineData || [
      {
        name: data.name,
        data: data.data,
        unit: data.unit,
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },

    accessibility: {
      enabled: false,
    },
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
      key={JSON.stringify(data)}
      allowChartUpdate={true}
    />
  );
};

export default SolarEmploymentChart;
