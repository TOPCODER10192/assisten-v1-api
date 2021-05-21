import React from 'react';
import { Table, Spin } from 'antd';

const ClientPropertyTable = ({ loading = false, properties = [] }) => {

  const columns = [
    {
      key: 'id',
      label: 'ID',
      dataIndex: '_id'
    },
    {
      key: 'name',
      label: 'Property Name',
      dataIndex: 'name'
    },
    {
      key: 'address',
      label: 'Address',
      dataIndex: 'address'
    },
    {
      key: 'phone',
      label: 'Phone',
      dataIndex: 'phone'
    },
    {
      key: 'details',
      label: 'Details',
      render: () => <div></div>
    }
  ]

  return (
    <Spin spinning={loading}>
      <Table columns={columns} dataSource={properties} />
    </Spin>
  )
}

export default ClientPropertyTable
