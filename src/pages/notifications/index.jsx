import React from 'react'
import { Empty } from 'antd';

function Notifications() {
  return (
    <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Empty description="No data" />
    </div>
  )
}

export default Notifications