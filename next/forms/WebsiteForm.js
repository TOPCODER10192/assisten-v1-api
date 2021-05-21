import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Form, Input, Button, Row, Col, Spin, Drawer, List } from 'antd';

import useGlobal from '../hooks/useGlobal';

export const WebsiteFormView = ({ client, onComplete }) => {
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
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Username is required' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col flex="auto">
            <Form.Item
              label="Site URL"
              name="handle"
              rules={[{ required: true, message: 'Site URL is required' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col flex="auto">
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Password is required' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col flex="auto">

          </Col>
        </Row>
      </Form>
    </Spin>
  )
}

export default WebsiteFormView
