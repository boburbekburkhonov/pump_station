/** @format */

import React, { memo } from "react";
import { Pie } from "@ant-design/plots";

const DashboardPieComponent = memo(
  ({ theme, colors, data, title, value, labelText }) => {
    const config = {
      data: data,
      angleField: value,
      colorField: "stationName",
      innerRadius: 0.6,
      theme: theme,
      label: {
        text: labelText,
        style: {
          fontWeight: "bold",
          color: colors.text,
        },
      },
      legend: {
        color: {
          title: false,
          position: "right",
          rowPadding: 5,
          color: colors.text,
        },
      },
      annotations: [
        {
          type: "text",
          style: {
            text: title,
            x: "50%",
            y: "50%",
            textAlign: "center",
            fontSize: 40,
            fontStyle: "bold",
            fill: colors.text,
          },
        },
      ],
    };
    return <Pie {...config} />;
  }
);

export default DashboardPieComponent;
