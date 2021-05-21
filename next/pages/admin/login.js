import React, { useState, useCallback } from 'react';
import { Form, Input, Button, Typography, notification } from 'antd';
import Router from 'next/router';

const { Title } = Typography

import useGlobal from '../../hooks/useGlobal';

const authStyle = { width: 500, margin: '20px auto 0px auto', padding: 20, border: '1px solid #eee', borderRadius: 6 }

const AuthContainer = ({ children }) => <div style={authStyle}>{children}</div>

function Login() {
  const [appState, actions] = useGlobal(['isLoggedIn'])

  const handleSubmit = useCallback(async(credentials) => {
    const reply = await actions.iam.login(credentials)
    console.log("REPLY", reply)
    if (reply.status) {
      Router.push('/admin/dashboard')
    } else {
      notification.error({
         message: 'Login Failed',
         description: reply.message
       })
    }
  }, [])

  return (
    <AuthContainer>
      <h1>Assisten Admin</h1>
      <Form onFinish={handleSubmit} layout="vertical" size="large">
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]} >
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">Log In</Button>
        </Form.Item>
      </Form>
    </AuthContainer>
  )
}

export default Login
