import React, { useState } from 'react';
import { Form, Input, Button, Select, Card, message, Divider } from 'antd';
import { PlusOutlined, FormOutlined } from '@ant-design/icons';
import { createMaterial } from '../services/api';

const { Option } = Select;

const MaterialForm = ({ onMaterialAdded }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await createMaterial(values);
      message.success('材料记录添加成功');
      form.resetFields();
      if (onMaterialAdded) {
        onMaterialAdded();
      }
    } catch (error) {
      message.error('添加材料记录失败');
      console.error('添加材料记录错误:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card 
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FormOutlined style={{ fontSize: 18, marginRight: 10, color: '#1890ff' }} />
          <span style={{ fontSize: 18, fontWeight: 500 }}>添加新材料</span>
        </div>
      } 
      bordered={true}
      className="material-form-card"
    >
      <Divider style={{ margin: '0 0 24px 0' }} />
      
      <Form
        form={form}
        name="material"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          status: '未盖章',
          campus: '青岛'
        }}
        size="large"
      >
        <Form.Item
          name="submitterName"
          label="交材料人姓名"
          rules={[{ required: true, message: '请输入交材料人姓名' }]}
        >
          <Input placeholder="请输入交材料人姓名" />
        </Form.Item>

        <Form.Item
          name="materialName"
          label="材料名称"
          rules={[{ required: true, message: '请输入材料名称' }]}
        >
          <Input placeholder="请输入材料名称" />
        </Form.Item>

        <Form.Item
          name="campus"
          label="校区"
          rules={[{ required: true, message: '请选择校区' }]}
        >
          <Select placeholder="请选择校区">
            <Option value="青岛">青岛</Option>
            <Option value="泰安">泰安</Option>
            <Option value="济南">济南</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="材料状态"
          rules={[{ required: true, message: '请选择材料状态' }]}
        >
          <Select placeholder="请选择材料状态">
            <Option value="未盖章">未盖章</Option>
            <Option value="已盖章">已盖章</Option>
          </Select>
        </Form.Item>

        <Divider style={{ margin: '8px 0 24px 0' }} />

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading} 
            block 
            icon={<PlusOutlined />}
            size="large"
            style={{ height: 45 }}
          >
            添加材料记录
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default MaterialForm;
