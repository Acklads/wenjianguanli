import React, { useState } from 'react';
import { Layout, Row, Col, ConfigProvider, Tabs } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import Header from './components/Header';
import MaterialForm from './components/MaterialForm';
import MaterialList from './components/MaterialList';
import StatisticsReport from './components/StatisticsReport';
import './styles.css';

const { Content, Footer } = Layout;
const { TabPane } = Tabs;

function App() {
  const [refreshList, setRefreshList] = useState(0);
  const [activeTab, setActiveTab] = useState('1');

  const handleMaterialAdded = () => {
    // 当添加新材料时刷新列表
    setRefreshList(prev => prev + 1);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    
    // 当切换到统计报表标签页时，刷新数据
    if (key === '2') {
      setRefreshList(prev => prev + 1);
    }
  };

  return (
    <ConfigProvider locale={zhCN}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Content className="app-container">
          <Tabs 
            defaultActiveKey="1" 
            activeKey={activeTab}
            onChange={handleTabChange}
            type="card" 
            className="main-tabs"
          >
            <TabPane tab="材料管理" key="1">
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={6}>
                  <MaterialForm onMaterialAdded={handleMaterialAdded} />
                </Col>
                <Col xs={24} lg={18}>
                  <MaterialList key={refreshList} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="统计报表" key="2">
              <StatisticsReport key={refreshList} />
            </TabPane>
          </Tabs>
        </Content>
        <Footer style={{ textAlign: 'center' }}>文件交接管理系统 ©{new Date().getFullYear()}</Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
