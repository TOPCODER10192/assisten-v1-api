import React, { useState, useEffect,  useCallback } from 'react';
import { useRouter } from 'next/router';
import { Button, Typography, Tabs, Form, Input, Row, Col, Space, InputNumber } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import AdminLayout from '../../../layouts/AdminLayout';
import Container from '../../../components/Container';
import RowActions from '../../../components/RowActions';
import CustomCard from '../../../components/CustomCard';

const { Title, Text } = Typography
const { TabPane } = Tabs

import useGlobal from '../../../hooks/useGlobal';

const PropertyDetailForm = ({ row }) => {
  const [form] = Form.useForm()

  const handleSubmit = () => {

  }

  return (
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
      <Row gutter={20}>
        <Col flex="auto">
          <Form.Item
            label="Pricing Cost"
            name="cost"
            rules={[{ required: false, message: 'Cost is required' }]}>
            <InputNumber
              min={0}
              max={999999}
              style={{ width: '100%' }}
              />
          </Form.Item>
        </Col>
        <Col flex="auto">
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: false, message: 'Phone is required' }]}>
            <Input addonBefore="+1" placeholder="e.g 555-555-5555" maxLength={12} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}



const PropertyView = ({ property }) => {
  return (
    <div>
      <Title>{property.name}</Title>

      <Tabs>
        <TabPane tab="Details" key="details">
          <PropertyDetailForm row={property} />
        </TabPane>
        <TabPane tab="Location" key="location">
          Address
        </TabPane>
        <TabPane tab="Photos" key="photos">
          Photos
        </TabPane>
        <TabPane tab="Testimonials" key="testimonials">
          Testimonials
        </TabPane>
        <TabPane tab="Users" key="users">
          Users
        </TabPane>
      </Tabs>


    </div>
  )
}

const Property = (props) => {
  const [state, actions] = useGlobal(['properties'])
  const [property, setProperty] = useState(false)
  const router = useRouter()

  useEffect(() => {
    getProperty()
  }, [router])

  const getProperty = async() => {
    if (router && router.query.id != undefined) {
      const property = await actions.properties.get(router.query.id)
      if (property) {
        setProperty(property)
      }
    }
  }

  return (
    <AdminLayout>
      <Container>
        <CustomCard>
          <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => router.push('/admin/properties')}>Back to Properties</Button>
          { property && <PropertyView property={property} /> }
        </CustomCard>
      </Container>
    </AdminLayout>
  )
}

export default Property
