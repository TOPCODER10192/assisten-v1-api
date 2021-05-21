import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Form, Input, Button, Row, Col, Spin, Drawer, List } from 'antd';

import useGlobal from '../hooks/useGlobal';

// import PropertyForm from './PropertyForm';

const employeeState = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  properties: []
}

export const ClientFormView = ({ client, onComplete }) => {
  const formRef = useRef()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (client) => {
    console.log("SUBMIT", client)
    onComplete && onComplete(client)
  }

  return (
    <Spin spinning={loading}>
      <Form onFinish={handleSubmit} initialValues={client} ref={formRef} layout="vertical">
        <Row gutter={10}>
          <Col flex="auto">
            <Form.Item
              label="First Name"
              name="firstname"
              rules={[{ required: true, message: 'First Name is required' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col flex="auto">
            <Form.Item
              label="Last Name"
              name="lastname"
              rules={[{ required: true, message: 'Last Name is required' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col flex="auto">
            <Form.Item
              label="Email Address"
              name="email"
              rules={[{ required: true, message: 'Email is required' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col flex="auto">
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true, message: 'Phone is required' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Spin>
  )
}

const EmployeeForm = ({ onComplete }) => {
  const formRef = useRef()
  const [state, actions] = useGlobal(['employees'])
  const [loading, setLoading] = useState(false)
  const [shown, setShown] = useState(false)

  const handleSubmit = async(values) => {
    setLoading(true)
    const status = await actions.employees.add(values)
    if (status) {
      formRef.current.resetFields()
      onComplete && onComplete()
    }
    setLoading(false)
  }

  return (
    <Spin spinning={loading}>
      <Form onFinish={handleSubmit} ref={formRef} layout="vertical">
        <Row gutter={10}>
          <Col flex="auto">
            <Form.Item
              label="First Name"
              name="firstname"
              rules={[{ required: true, message: 'First Name is required' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col flex="auto">
            <Form.Item
              label="Last Name"
              name="lastname"
              rules={[{ required: true, message: 'Last Name is required' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col flex="auto">
            <Form.Item
              label="Email Address"
              name="email"
              rules={[{ required: true, message: 'Email is required' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col flex="auto">
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true, message: 'Phone is required' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button htmlType="submit" type="primary">Save Employee</Button>
        </Form.Item>
      </Form>
    </Spin>
  )

}

export default EmployeeForm
