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

function Home() {
  return (
    <AdminLayout>
      <Container>
        <CustomCard>
          <Row>
            <Title level={2}>reporting</Title>
          </Row>
        </CustomCard>
      </Container>
    </AdminLayout>
  )
}

export default Home
