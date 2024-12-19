import { Line } from '@ant-design/plots';
import React from 'react';

const DashboardLinesChart = ({ theme, data, valueTemp }) => {
  const config = {
    data,
    xField: 'date',
    yField: 'value',
    theme: theme,
    colorField: "name",
    group: true,
    tooltip: {
      title: "stationName",
      items: [
        (d) => {
          return { name: d.name, value: `${d.value}` }
        },
      ],
    },
    point: false,
    interaction: {
      tooltip: {
        marker: true,
      },
    },
    style: {
      lineWidth: 2,
    },
  };
  return <Line {...config} />;
};

export default DashboardLinesChart

