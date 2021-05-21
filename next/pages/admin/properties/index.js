import React, { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import {
  Form, Typography, Input, Button, Drawer, Row, Col,
  Table, Space, Menu, Dropdown, Spin, InputNumber, Select, Card
} from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import AdminLayout from '../../../layouts/AdminLayout';
import Container from '../../../components/Container';
import RowActions from '../../../components/RowActions';
import CustomCard from '../../../components/CustomCard';

import useGlobal from '../../../hooks/useGlobal';

const { Title, Text } = Typography

const propertyState = {
  heading: '',
  description: '',

  name: '',
  phone: '',
  cost: 0,

  address: '',
  latitude: 0,
  longitude: 0
}

const PropertyForm = ({ row, onComplete }) => {
  const formRef = useRef()
  const [form] = Form.useForm()
  const [state, actions] = useGlobal(['properties'])
  const [loading, setLoading] = useState(false)

  console.log("PROPERTY", row)

  useEffect(() => {
    form.resetFields()
  }, [form, row])

  const handleSubmit = async(values) => {
    setLoading(true)
    // const status = await actions.properties.add(values)
    // if (status) {
    //   formRef.current.resetFields()
    //   onComplete && onComplete()
    // }
    setLoading(false)
  }

  return (
    <Spin spinning={loading}>
      <Form
        onFinish={handleSubmit}
        form={form}
        initialValues={row}
        layout="vertical">
        <Form.Item
          label="Business Name"
          name="name"
          rules={[{ required: false, message: 'Business name is required' }]}>
          <Input placeholder="e.g Cambridge Courtyard" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: false, message: 'Phone is required' }]}>
          <Input addonBefore="+1" placeholder="e.g 555-555-5555" maxLength={12} />
        </Form.Item>
        <Form.Item
          label="Property Title"
          name="heading"
          rules={[{ required: false, message: 'Title is required' }]}>
          <Input placeholder="e.g Comfortable Loving Home" />
        </Form.Item>
        <Form.Item
          label="Property Description"
          name="description"
          rules={[{ required: false, message: 'Description is required' }]}>
          <Input.TextArea placeholder="Property description" />
        </Form.Item>
        <Row>
          <Col flex="auto">
            <Form.Item
              label="Pricing Cost"
              name="cost"
              rules={[{ required: false, message: 'Cost is required' }]}>
              <Space>
              <InputNumber
                min={0}
                max={999999}
                style={{ width: '100%' }}
                />
                <Text>/month</Text>
              </Space>
            </Form.Item>
          </Col>
          <Col flex="auto">

          </Col>
        </Row>

        <Form.Item>
          <Button htmlType="submit" type="primary">Add Property</Button>
        </Form.Item>
      </Form>
    </Spin>
  )

}

function Properties() {
  const [state, actions] = useGlobal(['properties', 'propertiesLoaded'])
  const [showModal, setShowModal] = useState(false)
  const [row, setRow] = useState(false)
  const [filters, setFilters] = useState({ page: 1, search: '' })

  useEffect(() => {
    if (!state.propertiesLoaded) {
      getProperties()
    }
  }, [])

  const getProperties = async(search = '') => {
    await actions.properties.getAll({ ...filters, search })
  }

  const handleSearch = async(search) => {
    getProperties(search)
  }

  const handleComplete = async() => {
    getProperties()
    handleCloseModal()
  }

  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  const handleEdit = (row) => {
    setRow(row)
    handleShowModal()
  }

  const rowActions = [
    {
      key: 'edit',
      label: 'Edit',
      onClick: handleEdit
    },
    {
      key: 'view',
      label: 'View',
      onClick: row => Router.push(`/admin/properties/${row._id}`)
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
      title: '',
      key: 'photo',
      render: row => <img src={row.featPhoto} style={{ width: 50, height: 50 }} />
    },
    {
      title: 'Business Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: '',
      key: 'actions',
      width: 50,
      render: (row, rowIndex) => <RowActions row={row} rowIndex={rowIndex} actions={rowActions} />
    }
  ]

  return (
    <AdminLayout>
      <Drawer
        title="Add Property"
        placement="right"
        closable
        width={500}
        onClose={handleCloseModal}
        visible={showModal}>
        <PropertyForm row={row} onComplete={handleComplete} />
      </Drawer>
      <Container>
        <CustomCard>
          <Row justify="space-between">
            <Col>
              <Title level={2}>properties</Title>
            </Col>
            <Col>
              <Space>
                <Input.Search onPressEnter={(e) => handleSearch(event.target.value)} onSearch={handleSearch} />
                <Button type="primary" onClick={handleShowModal}>Add New Property</Button>
              </Space>
            </Col>
          </Row>
          <Table
            size="small"
            rowKey={row => row._id}
            onRow={(row) => ({ onClick: () => Router.push(`/admin/properties/${row._id}`) })}
            dataSource={state.properties}
            columns={columns} />
        </CustomCard>
      </Container>
    </AdminLayout>
  )
}

export default Properties
