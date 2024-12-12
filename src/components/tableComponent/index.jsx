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
    <div className='stations_container'>
      <Table
        style={{ width: "100%" }}
        scroll={{ x: "max-content", y: 90 * 5 }}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalPage,
          onChange: handlePaginationChange,
        }}
      />
    </div>
  );
}

export default memo(TableComponentData);
