import React, { useState, useEffect,  useCallback } from 'react';
import { useRouter } from 'next/router';
import { Button, Typography, Tabs, Table } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import AdminLayout from '../../../layouts/AdminLayout';
import Container from '../../../components/Container';
import RowActions from '../../../components/RowActions';
import CustomCard from '../../../components/CustomCard';

const { Title, Text } = Typography
const { TabPane } = Tabs

import useGlobal from '../../../hooks/useGlobal';

function Extras() {
  const [state, actions] = useGlobal(['amenities', 'tags', 'roomTypes', 'careTypes'])
  const { amenities = [], tags = [], roomTypes = [], careTypes = [] } = state

  useEffect(() => {
    actions.properties.getExtras()
  }, [])

  const amenityColumns = [
    {
      key: 'slug',
      dataIndex: 'slug',
      label: 'Slug'
    },
    {
      key: 'name',
      dataIndex: 'name',
      label: 'Name'
    }
  ]

  const roomColumns = [
    {
      key: 'slug',
      dataIndex: 'slug',
      label: 'Slug'
    },
    {
      key: 'name',
      dataIndex: 'name',
      label: 'Name'
    }
  ]

  const careColumns = [
    {
      key: 'slug',
      dataIndex: 'slug',
      label: 'Slug'
    },
    {
      key: 'name',
      dataIndex: 'name',
      label: 'Name'
    }
  ]

  return (
    <AdminLayout>
      <Container>
        <CustomCard>
          <Title>Extras</Title>

          <Tabs tabPosition="left">
            <TabPane tab="Amenities" key="1">
              <Table dataSource={amenities} columns={amenityColumns} />
            </TabPane>
            <TabPane tab="Room Types" key="2">
              <Table dataSource={roomTypes} columns={amenityColumns} />
            </TabPane>
            <TabPane tab="Care Types" key="3">
              <Table dataSource={careTypes} columns={amenityColumns} />
            </TabPane>
          </Tabs>

        </CustomCard>
      </Container>
    </AdminLayout>
  )
}

export default Extras
