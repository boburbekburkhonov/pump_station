/** @format */

import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const SolarEmploymentChart = ({ theme, data, lineStatus }) => {
  const chartOptions = {
    chart: {
      type: "line",
      backgroundColor: theme.backgroundColor,
      color: theme.text,
      height: 600
    },
    title: {
      text: "",
      align: "center",
    },

    yAxis: {
      title: {
        text: data.name ? data.name : "",
        style: {
          color: theme.text,
        },
      },
      labels: {
        style: {
          color: theme.text,
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

    legend: lineStatus ? {
      layout: "horizontal",
      align: "center",
      verticalAlign: "top",
      itemStyle: {
        color: theme.text,
      },

    } : false,

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        }
      },
    },

    series: data?.lineData || [
      {
        name: data.name,
        data: data.data,
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
