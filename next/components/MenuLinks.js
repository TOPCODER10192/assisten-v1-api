import React, { useCallback } from 'react';
import { Menu } from 'antd';
import Router from 'next/router';
import Link from 'next/link';

const menuStyle = {
  height: '100%',
  marginTop: 50,
  border: '0px'
}

const MenuLinks = ({ routes = [] }) => {
  // const handleRoute = useCallback(path => Router.push(path))
  return (
    <Menu mode="inline" defaultSelectedKeys={['1']} style={menuStyle}>
      {
        routes.map(r => {
          if (r.divider) {
            return (
              <React.Fragment>
                { r.title && <Menu.Item>{r.title}</Menu.Item> }
                <Menu.Divider />
              </React.Fragment>
            )
          }
          return <Menu.Item key={r.path} onClick={() => Router.push(r.path)} icon={r.icon}>{r.label}</Menu.Item>
        })
      }
    </Menu>
  )
}

export default MenuLinks
