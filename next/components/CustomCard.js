import React from 'react';
import { Card } from 'antd';

const cardStyle = {
  marginTop: 20,
  marginBottom: 50,
  borderWidth: 0,
  borderRadius: 6,
  boxShadow: '0px 5px 8px #e0e0e0'
}

const CustomCard = props => <Card style={cardStyle} {...props} />

export default CustomCard
