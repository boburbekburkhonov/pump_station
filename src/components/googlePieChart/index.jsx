/** @format */

import React, { useEffect, memo, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const modernColors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A6",
  "#FFBD33",
  "#75FF33",
  "#338FFF",
  "#8F33FF",
  "#FF3363",
  "#FF8333",
  "#33FF83",
  "#3B3B98",
  "#1BCA9B",
  "#F8C471",
  "#34495E",
  "#F1948A",
  "#BB8FCE",
  "#58D68D",
  "#F5B041",
  "#3498DB",
  "#5D6D7E",
  "#7FB3D5",
  "#45B39D",
  "#F0B27A",
  "#A569BD",
  "#1ABC9C",
  "#D35400",
  "#2ECC71",
  "#7DCEA0",
  "#F4D03F",
  "#E74C3C",
  "#9B59B6",
  "#28B463",
  "#2C3E50",
  "#2980B9",
  "#DC7633",
  "#7B241C",
  "#1D8348",
  "#D5DBDB",
  "#B7950B",
  "#8E44AD",
  "#7F8C8D",
  "#BDC3C7",
  "#99A3A4",
  "#D2B4DE",
  "#D98880",
  "#85C1E9",
  "#F7DC6F",
  "#F4ECF7",
  "#FAD7A0",
];

const PieChart = ({ theme, data, title, centerText }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    if (chartRef.current?.chart) {
      const chart = chartRef.current.chart;

      chart.series[0].setData(data, true, { duration: 1500 });

      if (centerText) {
        if (chart.centerTextElement) {
          chart.centerTextElement.destroy();
        }

        chart.centerTextElement = chart.renderer
          .text(
            centerText,
            chart.plotWidth / 2 + chart.plotLeft,
            chart.plotHeight / 2 + chart.plotTop
          )
          .attr({
            align: "center",
            zIndex: 5,
          })
          .css({
            color: theme.text,
            fontSize: "16px",
            fontWeight: "bold",
          })
          .add();
      }
    }
  }, [data, centerText, theme]);

  const options = {
    chart: {
      type: "pie",
      backgroundColor: theme.backgroundColor,
      width: centerText ? 800 : 600,
      height: centerText ? 500 : 300,
    },
    tooltip: {
      headerFormat: "",
      pointFormat:
        '<span style="color:{point.color}">\u25cf</span> ' +
        `{point.name}: <b>{point.y} {point.unit}</b>`,
    },
    title: {
      text: title,
      style: {
        color: theme.text,
      },
    },
    colors: modernColors,
    plotOptions: {
      pie: {
        innerSize: centerText ? "40%" : '0',
        borderRadius: 8,
        borderWidth: 2,

        allowPointSelect: true,
        dataLabels: {
          enabled: true,
          distance: 20,
          color: theme.text,
          format: `<b>{point.name}</b><br>{point.y} {point.unit}`,
        },
      },
    },
    accessibility: {
      enabled: false,
    },
    series: [
      {
        animation: {
          duration: 1500,
        },
        colorByPoint: true,
        data: data,
      },
    ],
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />
  );
};

export default memo(PieChart);
