import React, { useEffect } from 'react';
import { Layout, Menu, Row, Col, Typography } from 'antd';
import MenuLinks from '../components/MenuLinks';
import useGlobal from '../hooks/useGlobal';
import {
  AppstoreOutlined, UsergroupAddOutlined, ScheduleOutlined,
  BarChartOutlined, TagsOutlined, PictureOutlined,
  LogoutOutlined
} from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;
const { Title, Text } = Typography


const headerStyle = {
  backgroundColor: 'white',
  borderBottom: '1px solid #eee',
  // position: 'fixed',
  // width: '100%',
  // zIndex: 1000
}

const contentStyle = {
  backgroundColor: 'white',
  overflow: 'auto'
}

const siderStyle = {
  backgroundColor: 'white',
  borderRight: '1px solid #eee'
}

const routes = [
  {
    path: '/admin/dashboard',
    label: 'Dashboard',
    icon: <AppstoreOutlined />
  },
  {
    path: '/admin/reporting',
    label: 'Reporting',
    icon: <BarChartOutlined />
  },
  {
    path: '/admin/users',
    label: 'Users',
    icon: <UsergroupAddOutlined />
  },
  {
    path: '/admin/properties',
    label: 'Properties',
    icon: <AppstoreOutlined />
  },
  {
    path: 'extra1',    
    divider: true
  },
  {
    path: '/admin/clients',
    label: 'Clients',
    icon: <ScheduleOutlined />
  },
  {
    path: '/admin/employees',
    label: 'Employees',
    icon: <UsergroupAddOutlined />
  },
  {
    path: '/admin/timesheets',
    label: 'Timesheets',
    icon: <ScheduleOutlined />
  },
  {
    path: '/admin/tickets',
    label: 'Tickets',
    icon: <AppstoreOutlined />
  },
  {
    path: '/admin/photos',
    label: 'Photos',
    icon: <PictureOutlined />
  },
  {
    path: '/admin/extras',
    label: 'Extras',
    icon: <TagsOutlined />
  },
  {
    path: 'extra2',
    divider: true
  },
  {
    path: '/admin/logout',
    label: 'Logout',
    icon: <LogoutOutlined />
  },
]

const AppHeader = () => {
  const [appState, actions] = useGlobal(['user', 'isLoggedIn'])

  useEffect(() => {
    if (!appState.user) {
      actions.iam.getAccount()
    }
  }, [appState.user])

  return (
    <Header style={headerStyle}>
      <Row justify="space-between">
        <Col>
          <Text><b>Assisten</b></Text>
        </Col>
        <Col>
          Welcome, { appState.user.name }
        </Col>
      </Row>
    </Header>
  )

}


const AdminLayout = ({ children }) => (
  <Layout style={{ flex: 1, position: 'fixed', width: '100%', height: '100vh' }}>
    <AppHeader />
    <Layout>
      <Sider style={siderStyle}>
        <MenuLinks routes={routes} />
      </Sider>
      <Layout>
        <Content style={contentStyle}>{children}</Content>
        <Footer>All Rights Reserved 2020 @ Assisten</Footer>
      </Layout>
    </Layout>
  </Layout>
)

export default AdminLayout
