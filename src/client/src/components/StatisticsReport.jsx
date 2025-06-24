import React, { useState, useEffect } from 'react';
import { Card, Spin, Empty, Row, Col, Tabs } from 'antd';
import { getMaterialStats } from '../services/api';
import { Pie } from '@ant-design/plots';

const { TabPane } = Tabs;

const StatisticsReport = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    campusStats: [],
    statusStats: []
  });

  useEffect(() => {
    fetchStatisticsData();
  }, []);

  // 获取统计数据
  const fetchStatisticsData = async () => {
    try {
      setLoading(true);
      const statsData = await getMaterialStats();
      
      // 转换为饼图数据格式
      const campusPieData = statsData.campusStats.map(item => ({
        type: item.campus || '未指定',
        value: item.count,
      }));

      const statusPieData = statsData.statusStats.map(item => ({
        type: item.status,
        value: item.count,
      }));

      setStats({
        campusStats: campusPieData,
        statusStats: statusPieData
      });
    } catch (error) {
      console.error('获取统计数据错误:', error);
    } finally {
      setLoading(false);
    }
  };

  // 饼图通用配置
  const getPieConfig = (data, title) => ({
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name}: {value}份',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
    legend: {
      position: 'bottom',
    },
    tooltip: {
      formatter: (datum) => {
        return { name: datum.type, value: `${datum.value}份材料` };
      },
    },
  });

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Card title="材料统计报表" className="statistics-card">
          <Spin spinning={loading}>
            {(stats.campusStats.length > 0 || stats.statusStats.length > 0) ? (
              <Tabs defaultActiveKey="1">
                <TabPane tab="校区分布" key="1">
                  <div style={{ height: 400 }}>
                    <Pie {...getPieConfig(stats.campusStats, '校区分布')} />
                  </div>
                </TabPane>
                <TabPane tab="状态分布" key="2">
                  <div style={{ height: 400 }}>
                    <Pie {...getPieConfig(stats.statusStats, '状态分布')} />
                  </div>
                </TabPane>
              </Tabs>
            ) : (
              <Empty description="暂无统计数据" />
            )}
          </Spin>
        </Card>
      </Col>
    </Row>
  );
};

export default StatisticsReport; 