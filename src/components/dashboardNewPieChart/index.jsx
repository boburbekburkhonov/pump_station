/** @format */

import React, { useMemo } from "react";
import { Pie } from "@ant-design/plots";

const DashboardNewPieChart = ({
  theme,
  colors,
  data,
  value,
  labelText,
  title,
  tooltipName,
}) => {
  const plotMaps = useMemo(() => ({}), []);

  if (!data || !Object.keys(data).length) {
    return null;
  }

  const handleTooltip = (event, pie, action) => {
    Object.keys(plotMaps).forEach((plot) => {
      if (plot !== pie) {
        const chart = plotMaps[plot].chart;
        const evtData = { data: { area: event.data.data.area } };
        if (action === "show") {
          chart.emit("tooltip:show", evtData);
          chart.emit("element:highlight", evtData);
        } else if (action === "hide") {
          chart.emit("tooltip:hide", evtData);
          chart.emit("element:unhighlight", evtData);
        }
      }
    });
  };

  const leftConfig = useMemo(
    () => ({
      angleField: value,
      colorField: "stationName",
      data: data,
      innerRadius: 0.6,
      theme: theme,
      label: {
        style: {
          fill: colors.text,
        },
        text: (d) =>
          value === "volume" ? `${d.volume} m³` : `${d.energyActive} kw`,
      },
      legend: {
        color: {
          title: false,
          position: "left",
          rowPadding: 5,
          color: colors.text,
          fontWeigth: "bold",
          fontSize: "18px",
        },
      },
      tooltip: {
        title: "stationName",
        items: [
          (d) => {
            return value === "volume"
              ? { name: tooltipName, value: `${d.volume} m³` }
              : { name: tooltipName, value: `${d.energyActive} kw` };
          },
        ],
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
          tooltip: false,
        },
      ],
      interaction: { elementHighlight: true },
      state: { inactive: { opacity: 0.5 } },
    }),
    [data, value, labelText, theme, colors]
  );

  return (
    <Pie
      style={{
        width: "100%",
      }}
      {...leftConfig}
      onReady={(plot) => {
        plotMaps.leftPie = plot;
        plot.chart.on("interval:pointerover", (evt) =>
          handleTooltip(evt, "leftPie", "show")
        );
        plot.chart.on("interval:pointerout", (evt) =>
          handleTooltip(evt, "leftPie", "hide")
        );
      }}
    />
  );
};

export default DashboardNewPieChart;
