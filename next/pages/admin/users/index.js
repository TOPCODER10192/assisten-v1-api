import React, { useState, useEffect, useRef } from 'react';
import {
  Form, Typography, Input, Button, Drawer, Row, Col,
  Table, Space, Menu, Dropdown, Spin, Card, Modal,
  Popconfirm
} from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import AdminLayout from '../../../layouts/AdminLayout';
import Container from '../../../components/Container';
import RowActions from '../../../components/RowActions';
import CustomCard from '../../../components/CustomCard';

import useGlobal from '../../../hooks/useGlobal';

const { Title } = Typography

const userState = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  password: '',
}

const UserForm = ({ visible = false, user, onComplete, onClose }) => {
  const formRef = useRef()
  const [form] = Form.useForm()
  const [state, actions] = useGlobal(['users'])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    form.resetFields()
  }, [form, user])

  const handleSubmit = async(values) => {
    setLoading(true)
    const status = await actions.addUser(values)
    if (status) {
      form.resetFields()
      onComplete && onComplete()
    }
    setLoading(false)
  }

  const handleClose = () => {
    form.resetFields()
    onClose && onClose()
  }

  return (
    <Drawer
      title={user ? `Edit User` : `Add User`}
      placement="right"
      closable
      width={500}
      onClose={handleClose}
      visible={visible}>
      <Spin spinning={loading}>
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={user}
          layout="vertical">
          <Form.Item
            label="First Name"
            name="firstname"
            rules={[{ required: true, message: 'First Name is required' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastname"
            rules={[{ required: true, message: 'Last Name is required' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Email is required' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Password is required' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">Add User</Button>
          </Form.Item>
        </Form>
      </Spin>
    </Drawer>
  )

}

function Users() {
  const [state, actions] = useGlobal(['users', 'usersLoaded'])
  const [user, setUser] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [filters, setFilters] = useState({ page: 1, search: '' })

  useEffect(() => {
    if (!state.usersLoaded) {
      getUsers()
    }
  }, [])

  const getUsers = async(search = '') => {
    await actions.users.get({ ...filters, search })
  }

  const handleSearch = async(search) => {
    getUsers(search)
  }

  const handleComplete = async() => {
    getUsers()
    handleCloseModal()
  }

  const handleShowModal = () => setShowModal(true)

  const handleCloseModal = () => {
    setUser(false)
    setShowModal(false)
  }

  const handleEdit = user => {
    setUser(user)
    handleShowModal()
  }

  const handleDelete = async(row) => {
    const status = await actions.users.remove(row._id)
    if (status) {
      await getUsers()
    }
  }

  const rowActions = [
    {
      key: 'edit',
      label: 'Edit',
      onClick: handleEdit
    },
    {
      key: 'delete',
      label: 'Delete',
      isDanger: true,
      onClick: row => Modal.confirm({
        title: 'Do you want to remove this item?',
        onOk: () => handleDelete(row)
      })
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
      title: '',
      key: 'actions',
      width: 50,
      render: (row, rowIndex) => <RowActions row={row} rowIndex={rowIndex} actions={rowActions} />
    }
  ]

  return (
    <AdminLayout>
      <UserForm
        visible={showModal}
        user={user}
        onComplete={handleComplete}
        onClose={handleCloseModal}
        />
      <Container>
        <CustomCard>
          <Row justify="space-between">
            <Col>
              <Title level={2}>users</Title>
            </Col>
            <Col>
              <Space>
                <Button type="primary" onClick={handleShowModal}>Add New User</Button>
              </Space>
            </Col>
          </Row>
          <Row style={{ marginBottom: 20 }}>
            <Col span={8}>
              <Input.Search
                placeholder="Search for name, email or phone"
                onPressEnter={(e) => handleSearch(event.target.value)} onSearch={handleSearch} />
            </Col>
          </Row>
          <Table
            size="small"
            rowKey={row => row._id}
            dataSource={state.users}
            columns={columns}
            />
        </CustomCard>
      </Container>
    </AdminLayout>
  )
}

export default Users
