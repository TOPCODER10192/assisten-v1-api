import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Form, Typography, Input, Button, Drawer, Row, Col, Table, Space, Menu, Card, Spin, Tag, Tabs } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const { Title } = Typography
const { TabPane } = Tabs

import AdminLayout from '../../../layouts/AdminLayout';
import Container from '../../../components/Container';
import RowActions from '../../../components/RowActions';

import { ClientFormView } from '../../../forms/ClientForm';
import ClientPropertyTable from '../../../forms/ClientPropertyTable';
import WebsiteFormView from '../../../forms/WebsiteForm';

import useGlobal from '../../../hooks/useGlobal';

function ClientInfo() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [state, actions] = useGlobal(['client', 'properties'])
  const { client } = state

  useEffect(() => {
    if (router.query?.id) {
      getClient()
    }
  }, [router.query.id])

  const getClient = async() => {
    setLoading(true)
    const clientId = router.query.id
    await actions.clients.get(clientId)
    await actions.properties.getAllByClient(clientId)
    setLoading(false)
  }

  const renderClient = () => (
    <Container>
      <Card style={{ marginTop: 20 }}>
        <Link href="/admin/clients">Back</Link>
        <Row justify="space-between" style={{ marginTop: 10 }}>
          <Col>
            <Title level={3}>{client.name}</Title>
          </Col>
          <Col>
            <Tag color="success">{client.isActive ? 'Active Client' : 'Inactive Client'}</Tag>
          </Col>
          <Col>
            <Space>
              <Button type="danger">Delete Client</Button>
              <Button>Save Changes</Button>
            </Space>
          </Col>
        </Row>
        <Tabs tabBarExtraContent={<Button type="primary">Add Property</Button>}>
          <TabPane tab="Client Information" key="1">
            <ClientFormView client={state.client || {}} />
          </TabPane>
          <TabPane tab="Properties" key="2">
            <ClientPropertyTable />
          </TabPane>
          <TabPane tab="Website Info" key="3">
            <WebsiteFormView />
          </TabPane>
        </Tabs>
      </Card>
    </Container>
  )

  return (
    <AdminLayout>
        <Spin spinning={loading}>
          { renderClient() }
        </Spin>
    </AdminLayout>
  )
}

export default ClientInfo
