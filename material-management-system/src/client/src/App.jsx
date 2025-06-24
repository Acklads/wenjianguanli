import React, { useState } from 'react';
import { Layout, Row, Col, ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import Header from './components/Header';
import MaterialForm from './components/MaterialForm';
import MaterialList from './components/MaterialList';
import Login from './components/Login';
import './styles.css';

const { Content, Footer } = Layout;

function App() {
  const [refreshList, setRefreshList] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleMaterialAdded = () => {
    // 当添加新材料时刷新列表
    setRefreshList(prev => prev + 1);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // 如果未登录，显示登录页面
  if (!isLoggedIn) {
    return (
      <ConfigProvider locale={zhCN}>
        <Login onLoginSuccess={handleLoginSuccess} />
      </ConfigProvider>
    );
  }

  // 已登录，显示主应用
  return (
    <ConfigProvider locale={zhCN}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header onLogout={handleLogout} />
        <Content className="app-container">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={6} xl={5}>
              <MaterialForm onMaterialAdded={handleMaterialAdded} />
            </Col>
            <Col xs={24} lg={18} xl={19}>
              <MaterialList key={refreshList} />
            </Col>
          </Row>
        </Content>
        <Footer>文件交接管理系统 ©{new Date().getFullYear()}</Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
