/** @format */

import { Column } from "@ant-design/plots";
import React, { memo } from "react";

const DashboardLineChart = memo(
  ({ theme, data = [] }) => {
    const config = {
      data: data,
      xField: "date",
      yField: "value",
      colorField: "name",
      group: true,
      theme: theme,
      style: {
        inset: 5,
      },
    };

    return <Column {...config} />;
  }
);

export default DashboardLineChart;
