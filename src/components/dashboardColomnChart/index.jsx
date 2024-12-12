import { Line } from '@ant-design/plots';
import React from 'react';

const DashboardLinesChart = ({theme, data}) => {
  const config = {
    data,
    xField: 'date',
    yField: 'value',
    theme: theme,
    colorField: "name",
    point: {
      shapeField: 'circle',
      sizeField: 4,
    },
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

