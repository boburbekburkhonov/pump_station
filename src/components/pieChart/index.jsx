/** @format */

import React, { memo, useEffect } from "react";
import { Column } from "@ant-design/plots";
import { useSelector } from "react-redux";

const UzbekistanRegions = [
  "Toshkent",
  "Samarkand",
  "Buxoro",
  "Farg'ona",
  "Namangan",
  "Andijon",
  "Sirdaryo",
  "Jizzax",
  "Qashqadaryo",
  "Surxondaryo",
  "Khorezm",
  "Navoiy",
  "Karakalpakstan",
];

const DemoChangeData = memo(({ color }) => {
  const [data, setData] = React.useState([]);
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const getData = () => {
      const totalValue = 300;
      const randomValues = UzbekistanRegions.map(() => Math.random());
      const totalRandomValue = randomValues.reduce(
        (sum, value) => sum + value,
        0
      );
      const normalizedValues = randomValues.map((value) =>
        Math.round((value / totalRandomValue) * totalValue)
      );

      setData(
        UzbekistanRegions.map((region, index) => ({
          type: region,
          value: normalizedValues[index],
        }))
      );
    };

    getData();
  }, []);

  const config = {
    data,
    xField: "type",
    yField: "value",
    shapeField: "column25D",
    theme: theme,
    style: {
      fill: color,
    },
  };

  return <Column {...config} />;
});

export default DemoChangeData;
