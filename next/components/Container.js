import React from 'react';

const Container = ({ children, maxWidth = 1280 }) => <div style={{ maxWidth, margin: '0px auto', padding: '0px 10px' }}>{children}</div>

export default Container
