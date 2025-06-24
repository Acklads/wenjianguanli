import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Login = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    
    // 这里简化处理，实际项目中应该与后端API交互
    setTimeout(() => {
      // 模拟登录成功
      if (values.username === 'admin' && values.password === 'admin123') {
        message.success('登录成功');
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        message.error('用户名或密码错误');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <Card bordered={false} className="login-card">
        <div className="login-header">
          <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>文件交接管理系统</Title>
        </div>
        
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="用户名 (admin)" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="密码 (admin123)" 
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login; 