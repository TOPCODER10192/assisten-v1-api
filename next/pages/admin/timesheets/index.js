import React, { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import { Form, Typography, Input, Button, Drawer, Row, Col, Table, Space, Menu, Card, Spin } from 'antd';
import { EllipsisOutlined, EditOutlined } from '@ant-design/icons';


const { Title } = Typography

import AdminLayout from '../../../layouts/AdminLayout';
import Container from '../../../components/Container';
import RowActions from '../../../components/RowActions';

import useGlobal from '../../../hooks/useGlobal';
// import TimesheetForm from '../../../forms/TimesheetForm';

function Timesheets() {
  const [state, actions] = useGlobal(['timesheets', 'timesheetsLoaded'])
  const [showModal, setShowModal] = useState(false)
  const [filters, setFilters] = useState({ page: 1, search: '' })

  useEffect(() => {
    if (!state.timesheetsLoaded) {
      getTimesheets()
    }
  }, [])

  const getTimesheets = async(search = '') => {
    await actions.timesheets.getAll({ ...filters, search })
  }

  const handleSearch = async(search) => {
    getTimesheets(search)
  }

  const handleComplete = async() => {
    getTimesheets()
    handleCloseModal()
  }

  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  const handleShowDetails = (timesheet) => {
    actions.timesheets.set(timesheet)
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
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at'
    },
    {
      title: 'Wage',
      dataIndex: 'wage',
      key: 'wage'
    },
    {
      title: 'Timecard',
      dataIndex: 'timecard',
      key: 'timecard'
    },
    {
      title: 'Hours Scheduled',
      dataIndex: 'hoursSched',
      key: 'hoursSched'
    },
    {
      title: 'Hours Worked',
      dataIndex: 'hoursWorked',
      key: 'hoursWorked'
    },
    {
      title: 'Estimated Wage',
      dataIndex: 'estWage',
      key: 'estWage'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Details',
      key: 'details',
      width: 50,
      render: (row, rowIndex) => <Button icon={<EditOutlined />} onClick={() => Router.push(`/admin/timesheets/${row._id}`)} shape="circle" />
    }
  ]


  // <Drawer
  //   title="Add Timesheet"
  //   placement="right"
  //   closable
  //   width={500}
  //   onClose={handleCloseModal}
  //   visible={showModal}>
  //   <TimesheetForm onComplete={handleComplete} />
  // </Drawer>

  return (
    <AdminLayout>

      <Container>
        <Card style={{ marginTop: 20 }}>
          <Row justify="space-between">
            <Col>
              <Title level={2}>timesheets</Title>
            </Col>
            <Col>
              <Button type="primary" onClick={handleShowModal}>Add Timesheet</Button>
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
            dataSource={state.timesheets}
            columns={columns} />
        </Card>
      </Container>
    </AdminLayout>
  )
}

export default Timesheets
