import React from 'react';
import { Card, Tag, Typography, Space, Button, Popconfirm, message } from 'antd';
import moment from 'moment';
import { updateMaterial, deleteMaterial } from '../services/api';

const { Text } = Typography;

const MaterialItem = ({ material, onUpdate }) => {
  const { _id, submitterName, materialName, submissionTime, status } = material;

  // 格式化日期
  const formattedDate = moment(submissionTime).format('YYYY-MM-DD HH:mm:ss');

  // 更新材料状态
  const handleStatusChange = async () => {
    try {
      const newStatus = status === '已盖章' ? '未盖章' : '已盖章';
      await updateMaterial(_id, { status: newStatus });
      message.success('状态更新成功');
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      message.error('状态更新失败');
      console.error('更新状态错误:', error);
    }
  };

  // 删除材料
  const handleDelete = async () => {
    try {
      await deleteMaterial(_id);
      message.success('材料已删除');
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      message.error('删除材料失败');
      console.error('删除材料错误:', error);
    }
  };

  return (
    <Card 
      style={{ marginBottom: 16 }}
      actions={[
        <Button type="link" onClick={handleStatusChange}>
          {status === '已盖章' ? '标记为未盖章' : '标记为已盖章'}
        </Button>,
        <Popconfirm
          title="确定删除此材料记录?"
          onConfirm={handleDelete}
          okText="是"
          cancelText="否"
        >
          <Button type="link" danger>删除</Button>
        </Popconfirm>
      ]}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Text strong>交材料人:</Text>
          <Text>{submitterName}</Text>
        </Space>
        
        <Space>
          <Text strong>材料名称:</Text>
          <Text>{materialName}</Text>
        </Space>
        
        <Space>
          <Text strong>提交时间:</Text>
          <Text>{formattedDate}</Text>
        </Space>
        
        <Space>
          <Text strong>状态:</Text>
          <Tag color={status === '已盖章' ? 'green' : 'volcano'}>
            {status}
          </Tag>
        </Space>
      </Space>
    </Card>
  );
};

export default MaterialItem;
