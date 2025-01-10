// /** @format */

// import { Column } from "@ant-design/plots";
// import React, { memo } from "react";

// const DashboardLineChart = memo(
//   ({ theme, data = [] }) => {
//     const config = {
//       data: data,
//       xField: "date",
//       yField: "value",
//       colorField: "name",
//       group: true,
//       theme: theme,
//       style: {
//         inset: 5,
//       },
//     };

//     return <Column {...config} />;
//   }
// );

// export default DashboardLineChart;

import { Line } from '@ant-design/plots';
import React from 'react';

const DashboardLinesChart = ({ theme, data }) => {

  const transformedData = data.flatMap((item) => [
    { date: item.date, value: item?.flow, name: "Flow" },
    { date: item.date, value: item?.velocity, name: "Velocity" },
    { date: item.date, value: item?.volume, name: "Volume" },
  ]);

  const config = {
    data: transformedData,
    xField: 'date',
    yField: 'value',
    theme: theme,
    colorField: "name",
    tooltip: {
      title: "stationName",
      items: [
        (d) => {
          return { name: d.name, value: `${d.value}` }
        },
      ],
    },
    point: {
      size: 5,
      shape: 'circle',
    },
    lineStyle: {
      lineWidth: 2,
    },
  };

  return <Line {...config} />;
};

export default DashboardLinesChart;
