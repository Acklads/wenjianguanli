import React from 'react';
import { Layout, Typography } from 'antd';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header = () => {
  return (
    <AntHeader style={{ background: '#fff', padding: '0 16px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
      <Title level={3} style={{ margin: '16px 0', textAlign: 'center' }}>文件交接管理系统</Title>
    </AntHeader>
  );
};

export default Header;
