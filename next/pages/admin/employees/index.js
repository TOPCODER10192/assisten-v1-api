import React, { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import { Form, Typography, Input, Button, Drawer, Row, Col, Table, Space, Menu, Card, Spin } from 'antd';
import { EllipsisOutlined, EditOutlined } from '@ant-design/icons';


const { Title } = Typography

import AdminLayout from '../../../layouts/AdminLayout';
import Container from '../../../components/Container';
import RowActions from '../../../components/RowActions';

import useGlobal from '../../../hooks/useGlobal';
import EmployeeForm from '../../../forms/EmployeeForm';

function Employees() {
  const [state, actions] = useGlobal(['employees', 'employeesLoaded'])
  const [showModal, setShowModal] = useState(false)
  const [filters, setFilters] = useState({ page: 1, search: '' })

  useEffect(() => {
    if (!state.employeesLoaded) {
      getEmployees()
    }
  }, [])

  const getEmployees = async(search = '') => {
    await actions.employees.getAll({ ...filters, search })
  }

  const handleSearch = async(search) => {
    getEmployees(search)
  }

  const handleComplete = async() => {
    getEmployees()
    handleCloseModal()
  }

  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  const handleShowDetails = (employee) => {
    actions.employees.set(employee)
  }

  const rowActions = [
    {
      key: 'edit',
      label: 'Edit',
      onClick: row => console.log("ROW", row)
    },
    {
      key: 'view',
      label: 'View',
      onClick: row => console.log("ROW", row)
    },
    {
      key: 'delete',
      label: 'Delete',
      isDanger: true,
      onClick: row => console.log("ROW", row)
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
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Details',
      key: 'details',
      width: 50,
      render: (row, rowIndex) => <Button icon={<EditOutlined />} onClick={() => Router.push(`/admin/employees/${row._id}`)} shape="circle" />
    },
    {
      title: '',
      key: 'active',
      render: (row) => <div>{row.isActive && 'Yes'}</div>
    },
  ]


  return (
    <AdminLayout>
      <Drawer
        title="Add Employee"
        placement="right"
        closable
        width={500}
        onClose={handleCloseModal}
        visible={showModal}>
        <EmployeeForm onComplete={handleComplete} />
      </Drawer>
      <Container>
        <Card style={{ marginTop: 20 }}>
          <Row justify="space-between">
            <Col>
              <Title level={2}>employees</Title>
            </Col>
            <Col>
              <Button type="primary" onClick={handleShowModal}>Add Employee</Button>
            </Col>
          </Row>
          <Row style={{ marginBottom: 20 }}>
            <Col span={8}>
              <Input.Search placeholder="Search for name, phone, email" onPressEnter={(e) => handleSearch(event.target.value)} onSearch={handleSearch} />
            </Col>
          </Row>
          <Table
            size="small"
            rowKey={row => row._id}
            dataSource={state.employees}
            columns={columns} />
        </Card>
      </Container>
    </AdminLayout>
  )
}

export default Employees
