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

export default UserForm
