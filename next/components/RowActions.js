import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const RowActions = ({ row, rowIndex, actions = [] }) => {
  const menu = (
    <Menu>
      {
        actions.map(
        (action, acIndex) =>
          <Menu.Item
            danger={action.isDanger}
            key={action.key}
            onClick={() => action.onClick(row, rowIndex)}>
            {action.render ? action.render() : action.label}
          </Menu.Item>
        )
      }
    </Menu>
  )

  return (
    <Dropdown overlay={menu} placement="bottomLeft">
      <Button type="text" icon={<EllipsisOutlined />} />
    </Dropdown>
  )
}

export default RowActions;
