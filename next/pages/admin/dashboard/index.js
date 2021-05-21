import React from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { Typography, Row, Col, Card} from 'antd';
import Container from '../../../components/Container';
import { currentDay } from '../../../hooks/calendar';

const { Title, Text } = Typography

const cardStyle = {
  borderWidth: 0,
  borderRadius: 6,
  boxShadow: '0px 5px 8px #e0e0e0',
  marginBottom: 20
}

const StatCard = ({ title = "" }) => (
  <div>
    <Title>Tickets</Title>
  </div>
)

function Home() {
  return (
    <AdminLayout>
      <Container>
        <Title style={{ marginTop: 20 }}>dashboard</Title>
        <Row gutter={20}>
          <Col span={24}>
            <Card style={cardStyle}>
              <Row justify="space-between">
                <Col>
                  <Title>Net Revenue</Title>
                  <Title level={5}>Average: $1,278</Title>
                </Col>
                <Col>
                  <Title level={5}>{currentDay()}</Title>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={12}>
            <Card style={cardStyle}>
              <Title>Tickets</Title>
            </Card>
          </Col>
          <Col span={12}>
            <Card style={cardStyle}>
              <Title>Client & Facilities</Title>
              <Row>
                <Col>
                  <Title>4</Title>
                  <Text>New Clients</Text>
                </Col>
                <Col>
                  <Title>9</Title>
                  <Text>New Facilities</Text>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  )
}

export default Home
