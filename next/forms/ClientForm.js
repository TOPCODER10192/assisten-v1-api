import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Form, Input, Button, Row, Col, Spin, Drawer, List } from 'antd';

import useGlobal from '../hooks/useGlobal';

import PropertyForm from './PropertyForm';

const clientState = {
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

const ClientForm = ({ onComplete }) => {
  const formRef = useRef()
  const [state, actions] = useGlobal(['clients'])
  const [loading, setLoading] = useState(false)
  const [properties, setProperties] = useState([])
  const [shown, setShown] = useState(false)

  const handleSubmit = async(values) => {
    setLoading(true)
    values.properties = properties
    const status = await actions.clients.add(values)
    if (status) {
      formRef.current.resetFields()
      onComplete && onComplete()
    }
    setLoading(false)
  }

  const handleClosePropertyForm = (property) => {
    setProperties([...properties, property])
    setShown(false)
  }

  const renderProperties = useCallback(
    () =>
      <List
        bordered
        style={{ marginBottom: 20 }}
        header={<div>Properties</div>}
        dataSource={properties}
        renderItem={p => <List.Item><strong>{p.name}</strong> {p.email} {p.phone}</List.Item>}
      />,
    [properties]
  )

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

        { renderProperties() }

        <Button type="dashed" block style={{ marginBottom: 20 }} onClick={() => setShown(true)}>Add Property</Button>

        <Form.Item>
          <Button htmlType="submit" type="primary">Save Client</Button>
        </Form.Item>
      </Form>

      <Drawer
        title="Add Property"
        placement="right"
        closable
        width={500}
        onClose={() => setShown(false)}
        visible={shown}>
        <PropertyForm onComplete={handleClosePropertyForm} />
      </Drawer>

    </Spin>
  )

}

export default ClientForm
