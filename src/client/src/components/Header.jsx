import React from 'react';
import { Layout, Typography, Row, Col, Button } from 'antd';
import { LogoutOutlined, FileTextOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header = ({ onLogout }) => {
  return (
    <AntHeader style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <Row justify="space-between" align="middle">
        <Col>
          <div className="logo-container">
            <FileTextOutlined style={{ fontSize: 28, marginRight: 16, color: '#1890ff' }} />
            <Title level={3} style={{ margin: 0, fontSize: 24, letterSpacing: '1px' }}>文件交接管理系统</Title>
          </div>
        </Col>
        
        {onLogout && (
          <Col>
            <Button 
              type="link" 
              icon={<LogoutOutlined />} 
              onClick={onLogout}
              size="large"
              style={{ fontSize: 16 }}
            >
              退出登录
            </Button>
          </Col>
        )}
      </Row>
    </AntHeader>
  );
};

export default Header;
