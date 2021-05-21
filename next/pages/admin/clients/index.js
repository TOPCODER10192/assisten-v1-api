import React, { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import { Form, Typography, Input, Button, Drawer, Row, Col, Table, Space, Menu, Card, Spin } from 'antd';
import { EllipsisOutlined, EditOutlined } from '@ant-design/icons';


const { Title } = Typography

import AdminLayout from '../../../layouts/AdminLayout';
import Container from '../../../components/Container';
import RowActions from '../../../components/RowActions';
import CustomCard from '../../../components/CustomCard';

import useGlobal from '../../../hooks/useGlobal';
import ClientForm from '../../../forms/ClientForm';

function Clients() {
  const [state, actions] = useGlobal(['clients', 'clientsLoaded'])
  const [showModal, setShowModal] = useState(false)
  const [filters, setFilters] = useState({ page: 1, search: '' })

  useEffect(() => {
    if (!state.clientsLoaded) {
      getClients()
    }
  }, [])

  const getClients = async(search = '') => {
    await actions.clients.getAll({ ...filters, search })
  }

  const handleSearch = async(search) => {
    getClients(search)
  }

  const handleComplete = async() => {
    getClients()
    handleCloseModal()
  }

  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  const handleShowDetails = (client) => {
    actions.clients.set(client)
  }

  const rowActions = [
    {
      key: 'edit',
      label: 'Edit',
      onClick: row => console.log("ROW", row)
    },
    {
      key: 'view',
      label: 'View',
      onClick: row => console.log("ROW", row)
    },
    {
      key: 'delete',
      label: 'Delete',
      isDanger: true,
      onClick: row => console.log("ROW", row)
    }
  ]

  const columns = [

    {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname'
    },
    {
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: '# of Properties',
      key: 'totalProperties',
      render: (row) => <div>10</div>
    },
    {
      title: 'Details',
      key: 'details',
      width: 50,
      render: (row, rowIndex) =>
        (
          <Button
            icon={<EditOutlined />}
            onClick={() => Router.push(`/admin/clients/${row._id}`)}
            type="text"
            />
        )
    },
    {
      title: '',
      key: 'active',
      render: (row) => <div>{row.isActive && 'Yes'}</div>
    },
  ]


  return (
    <AdminLayout>
      <Drawer
        title="Add Client"
        placement="right"
        closable
        width={500}
        onClose={handleCloseModal}
        visible={showModal}>
        <ClientForm onComplete={handleComplete} />
      </Drawer>
      <Container>
        <CustomCard>
          <Row justify="space-between">
            <Col>
              <Title level={2}>clients</Title>
            </Col>
            <Col>
              <Button type="primary" onClick={handleShowModal}>Add Client</Button>
            </Col>
          </Row>
          <Row style={{ marginBottom: 20 }}>
            <Col span={8}>
              <Input.Search placeholder="Search for name, phone, email" onPressEnter={(e) => handleSearch(event.target.value)} onSearch={handleSearch} />
            </Col>
          </Row>
          <Table
            size="small"
            rowKey={row => row._id}
            dataSource={state.clients}
            columns={columns} />
        </CustomCard>
      </Container>
    </AdminLayout>
  )
}

export default Clients
