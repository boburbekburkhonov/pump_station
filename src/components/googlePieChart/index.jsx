/** @format */

import React, { useEffect, memo } from "react";
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

const PieChart = ({ theme, data, value, tooltipName, title, titleValue }) => {
  useEffect(() => {
    (function (H) {
      H.seriesTypes.pie.prototype.animate = function (init) {
        const series = this,
          chart = series.chart,
          points = series.points,
          { animation } = series.options,
          { startAngleRad } = series;

        function fanAnimate(point, startAngleRad) {
          const graphic = point.graphic,
            args = point.shapeArgs;

          if (graphic && args) {
            graphic
              .attr({
                start: startAngleRad,
                end: startAngleRad,
                opacity: 1,
              })
              .animate(
                {
                  start: args.start,
                  end: args.end,
                },
                {
                  duration: animation.duration / points.length,
                },
                function () {
                  if (points[point.index + 1]) {
                    fanAnimate(points[point.index + 1], args.end);
                  }
                  if (point.index === series.points.length - 1) {
                    series.dataLabelsGroup.animate(
                      {
                        opacity: 1,
                      },
                      void 0,
                      function () {
                        points.forEach((point) => {
                          point.opacity = 1;
                        });
                        series.update(
                          {
                            enableMouseTracking: true,
                          },
                          false
                        );
                        chart.update({
                          plotOptions: {
                            pie: {
                              innerSize: "40%",
                              borderRadius: 8,
                            },
                          },
                        });
                      }
                    );
                  }
                }
              );
          }
        }

        if (init) {
          points.forEach((point) => {
            point.opacity = 0;
          });
        } else {
          fanAnimate(points[0], startAngleRad);
        }
      };
    })(Highcharts);
  }, []);

  const options = {
    chart: {
      type: "pie",
      backgroundColor: theme.backgroundColor,
      width: 700,
      height: 700,
    },
    title: {
      text: "Resource Usage Distribution",
    },
    colors: modernColors,
    subtitle: false,
    tooltip: {
      headerFormat: "",
      pointFormat:
        '<span style="color:{point.color}">\u25cf</span> ' +
        `{point.name}: <b>{point.y} {point.unit}</b>`,
    },
    accessibility: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        borderWidth: 2,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b><br>{point.y} {point.unit}",
          distance: 20,
        },
      },
    },
    series: [
      {
        enableMouseTracking: false,
        animation: {
          duration: 1500,
        },
        colorByPoint: true,
        data: [
          { name: "Coal Consumption", y: 996, unit: "Joules" },
          { name: "Nuclear Energy", y: 500, unit: "liters" },
          { name: "Hydro Energy", y: 4199, unit: "tons" },
          { name: "Electricity Usage", y: 3916, unit: "kWh" },
          { name: "Water Consumption", y: 2972, unit: "liters" },
          { name: "Electricity Usage", y: 1867, unit: "Joules" },
          { name: "Oil Usage", y: 1371, unit: "m³" },
          { name: "Water Consumption", y: 4654, unit: "tons" },
          { name: "Solar Energy", y: 2598, unit: "kWh" },
          { name: "Nuclear Energy", y: 4717, unit: "Joules" },
          { name: "Gas Consumption", y: 3017, unit: "liters" },
          { name: "Wind Energy", y: 3010, unit: "liters" },
          { name: "Geothermal Energy", y: 905, unit: "kWh" },
          { name: "Coal Consumption", y: 2108, unit: "liters" },
          { name: "Oil Usage", y: 4180, unit: "m³" },
          { name: "Water Consumption", y: 866, unit: "Joules" },
          { name: "Oil Usage", y: 1676, unit: "Joules" },
          { name: "Gas Consumption", y: 2108, unit: "m³" },
          { name: "Solar Energy", y: 4069, unit: "tons" },
          { name: "Gas Consumption", y: 4393, unit: "Joules" },
          { name: "Electricity Usage", y: 3686, unit: "Joules" },
          { name: "Gas Consumption", y: 3375, unit: "Joules" },
          { name: "Oil Usage", y: 645, unit: "Joules" },
          { name: "Wind Energy", y: 1759, unit: "liters" },
          { name: "Wind Energy", y: 4811, unit: "kWh" },
          { name: "Oil Usage", y: 1208, unit: "Joules" },
          { name: "Solar Energy", y: 1379, unit: "Joules" },
          { name: "Wind Energy", y: 2730, unit: "liters" },
          { name: "Oil Usage", y: 4305, unit: "kWh" },
          { name: "Wind Energy", y: 4596, unit: "m³" },
          { name: "Coal Consumption", y: 2484, unit: "kWh" },
          { name: "Wind Energy", y: 967, unit: "m³" },
          { name: "Wind Energy", y: 1098, unit: "Joules" },
          { name: "Gas Consumption", y: 3477, unit: "m³" },
          { name: "Gas Consumption", y: 4849, unit: "Joules" },
          { name: "Coal Consumption", y: 3413, unit: "kWh" },
          { name: "Geothermal Energy", y: 2926, unit: "Joules" },
          { name: "Solar Energy", y: 4054, unit: "Joules" },
          { name: "Oil Usage", y: 2963, unit: "tons" },
          { name: "Gas Consumption", y: 1034, unit: "liters" },
          { name: "Solar Energy", y: 1887, unit: "kWh" },
          { name: "Water Consumption", y: 4000, unit: "liters" },
          { name: "Wind Energy", y: 541, unit: "tons" },
          { name: "Water Consumption", y: 1272, unit: "tons" },
          { name: "Hydro Energy", y: 897, unit: "Joules" },
          { name: "Oil Usage", y: 2257, unit: "tons" },
          { name: "Oil Usage", y: 1101, unit: "m³" },
          { name: "Nuclear Energy", y: 2616, unit: "m³" },
          { name: "Hydro Energy", y: 2075, unit: "kWh" },
          { name: "Electricity Usage", y: 1116, unit: "kWh" },
        ],
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default memo(PieChart);
