/** @format */

import React, { memo } from "react";
import { Table } from "antd";

function TableComponentData({
  columns,
  dataSource,
  currentPage,
  pageSize,
  totalPage,
  handlePaginationChange,
}) {
  return (
    <div className="stations_container">
      <Table
        style={{ width: "100%" }}
        scroll={{ x: "max-content", y: 90 * 9 }}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalPage,
          onChange: handlePaginationChange,
          style: {
            padding: "0 0.75rem",
          },
        }}
      />
    </div>
  );
}

export default memo(TableComponentData);
