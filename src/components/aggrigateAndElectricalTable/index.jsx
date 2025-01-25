/** @format */

import React, { memo, useMemo } from "react";
import { Button, Table } from "antd";
import { MinusCircleTwoTone, PlusCircleTwoTone } from "@ant-design/icons";
import "../../pages/allDataPage/index.css";

const ExpandedRowRender = memo(({ expandColumns, expandData }) => {
  const validExpandData = Array.isArray(expandData.values)
    ? expandData.values
    : [];

  return (
    <Table
      columns={expandColumns}
      dataSource={validExpandData}
      pagination={false}
      rowKey={(record) => record.id || record.key || Math.random()}
    />
  );
});

const TableAggrigateAndElectryData = memo(
  ({ expandDataSource = [], dataSource = [], t }) => {
    const columnsName = useMemo(
      () => [
        {
          title: "",
          dataIndex: "name",
          key: "name",
        },
      ],
      [t]
    );

    const extendColumpsPump = useMemo(
      () => [
        {
          title: t("dataPagesInformation.dataTableInformation.dataDate"),
          dataIndex: "date",
          key: "date",
          align: "center",
          width: 250,
        },
        {
          title: t("dataPagesInformation.dataTableInformation.dataVolume"),
          dataIndex: "volume",
          key: "volume",
          align: "center",
        },
        {
          title: t("dataPagesInformation.dataTableInformation.dataVelocity"),
          dataIndex: "velocity",
          key: "velocity",
          align: "center",
        },
        {
          title: t("dataPagesInformation.dataTableInformation.dataFlow"),
          dataIndex: "flow",
          key: "flow",
          align: "center",
        },
      ],
      [t]
    );

    const columnsElectrical = useMemo(
      () => [
        {
          title: t("dataPagesInformation.dataTableInformation.dataDate"),
          dataIndex: "date",
          key: "date",
          align: "center",
          width: 200,
        },
        // * Active reactive now
        {
          title: `${t(
            "dashboardPageData.lastStationsData.energyActive"
          )}${" "} (${t(
            "dashboardPageData.lastStationsData.energyValueView"
          )})`,
          dataIndex: "energyActive",
          key: "energyActive",
          align: "center",
        },
        {
          title: `${t(
            "dashboardPageData.lastStationsData.energyReactive"
          )}${" "} (${t(
            "dashboardPageData.lastStationsData.energyValueView"
          )})`,
          dataIndex: "energyReactive",
          key: "energyReactive",
          align: "center",
        },
        // *Active reactive power
        {
          title: `${t(
            "dashboardPageData.lastStationsData.powerActive"
          )}${" "} (Kw)`,
          dataIndex: "powerActive",
          key: "powerActive",
          align: "center",
        },
        {
          title: `${t(
            "dashboardPageData.lastStationsData.powerReactive"
          )}${" "} (Kw)`,
          dataIndex: "powerReactive",
          key: "powerReactive",
          align: "center",
        },
        // * Amper 3
        {
          title: `${t(
            "dashboardPageData.lastStationsData.electryAmper"
          )}${" "} 1 (A)`,
          dataIndex: "current1",
          key: "current1",
          align: "center",
        },
        {
          title: `${t(
            "dashboardPageData.lastStationsData.electryAmper"
          )}${" "} 3 (A)`,
          dataIndex: "current2",
          key: "current2",
          align: "center",
        },
        {
          title: `${t(
            "dashboardPageData.lastStationsData.electryAmper"
          )}${" "} 3 (A)`,
          dataIndex: "current3",
          key: "current3",
          align: "center",
        },
        // * Volt 3
        {
          title: `${t(
            "dashboardPageData.lastStationsData.electryVolt"
          )}${" "} 1 (V)`,
          dataIndex: "current1",
          key: "voltage1",
          align: "center",
        },
        {
          title: `${t(
            "dashboardPageData.lastStationsData.electryVolt"
          )}${" "} 3 (V)`,
          dataIndex: "voltage2",
          key: "voltage2",
          align: "center",
        },
        {
          title: `${t(
            "dashboardPageData.lastStationsData.electryVolt"
          )}${" "} 3 (V)`,
          dataIndex: "voltage3",
          key: "voltage3",
          align: "center",
        },
      ],
      [t]
    );

    return (
      <Table
        columns={columnsName}
        dataSource={Array.isArray(dataSource) ? dataSource : []}
        expandable={{
          expandedRowRender: (record, index) => (
              <ExpandedRowRender
                expandColumns={record?.dataType === "aggregate" ? extendColumpsPump : columnsElectrical}
                expandData={expandDataSource[index] || {}}
              />
            ),
          defaultExpandedRowKeys: [0],
          expandIcon: ({ expanded, onExpand, record }) => (
            <Button
              type='text'
              onClick={(e) => onExpand(record, e)}
              icon={
                expanded ? (
                  <MinusCircleTwoTone style={{ fontSize: "18px" }} />
                ) : (
                  <PlusCircleTwoTone style={{ fontSize: "18px" }} />
                )
              }
            />
          ),
        }}
        rowKey={(record) => record.id || record.key || Math.random()}
        pagination={false}
      />
    );
  }
);

export default TableAggrigateAndElectryData;
