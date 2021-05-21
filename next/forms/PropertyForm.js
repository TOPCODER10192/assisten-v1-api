import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Row, Col, Spin } from 'antd';

import useGlobal from '../hooks/useGlobal';

const propertyState = {
  name: '',
  email: '',
  phone: '',
}

const PropertyForm = ({ onComplete }) => {
  const formRef = useRef()

  const handleSubmit = (values) => {
    onComplete && onComplete(values)
    formRef.current.resetFields()
  }

  return (
    <Form onFinish={handleSubmit} ref={formRef} layout="vertical">
      <Form.Item
        label="Property Name"
        name="name"
        rules={[{ required: true, message: 'Property Name is required' }]}>
        <Input />
      </Form.Item>
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
        <Button htmlType="submit" type="primary">Save Property</Button>
      </Form.Item>
    </Form>
  )
}

export default PropertyForm
