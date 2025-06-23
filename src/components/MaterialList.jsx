import React, { useState, useEffect } from 'react';
import { Table, Input, Card, Select, Space, Tag, Button, Popconfirm, message } from 'antd';
import { updateMaterial, deleteMaterial, getMaterials } from '../services/api';
import moment from 'moment';

const { Search } = Input;
const { Option } = Select;

const MaterialList = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [campusFilter, setCampusFilter] = useState('all');

  // 获取材料列表
  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const data = await getMaterials();
      setMaterials(data);
    } catch (error) {
      console.error('获取材料错误:', error);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载
  useEffect(() => {
    fetchMaterials();
  }, []);

  // 更新材料状态
  const handleStatusChange = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === '已盖章' ? '未盖章' : '已盖章';
      await updateMaterial(id, { status: newStatus });
      message.success('状态更新成功');
      fetchMaterials();
    } catch (error) {
      message.error('状态更新失败');
      console.error('更新状态错误:', error);
    }
  };

  // 删除材料
  const handleDelete = async (id) => {
    try {
      await deleteMaterial(id);
      message.success('材料已删除');
      fetchMaterials();
    } catch (error) {
      message.error('删除材料失败');
      console.error('删除材料错误:', error);
    }
  };

  // 表格列定义
  const columns = [
    {
      title: '交材料人',
      dataIndex: 'submitterName',
      key: 'submitterName',
      sorter: (a, b) => a.submitterName.localeCompare(b.submitterName),
    },
    {
      title: '材料名称',
      dataIndex: 'materialName',
      key: 'materialName',
      sorter: (a, b) => a.materialName.localeCompare(b.materialName),
    },
    {
      title: '校区',
      dataIndex: 'campus',
      key: 'campus',
      filters: [
        { text: '青岛', value: '青岛' },
        { text: '泰安', value: '泰安' },
        { text: '济南', value: '济南' },
      ],
      onFilter: (value, record) => record.campus === value,
      render: (campus) => (
        <span>{campus || '未指定'}</span>
      )
    },
    {
      title: '提交时间',
      dataIndex: 'submissionTime',
      key: 'submissionTime',
      sorter: (a, b) => new Date(a.submissionTime) - new Date(b.submissionTime),
      render: (time) => moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === '已盖章' ? 'green' : 'volcano'}>
          {status}
        </Tag>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="link" 
            onClick={() => handleStatusChange(record._id, record.status)}
          >
            {record.status === '已盖章' ? '标记为未盖章' : '标记为已盖章'}
          </Button>
          <Popconfirm
            title="确定删除此材料记录?"
            onConfirm={() => handleDelete(record._id)}
            okText="是"
            cancelText="否"
          >
            <Button type="link" danger>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 筛选材料
  const filteredMaterials = materials.filter(material => {
    // 搜索条件
    const matchesSearch = 
      material.submitterName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      material.materialName.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 状态过滤
    const matchesStatus = statusFilter === 'all' || material.status === statusFilter;
    
    // 校区过滤
    const matchesCampus = campusFilter === 'all' || material.campus === campusFilter;
    
    return matchesSearch && matchesStatus && matchesCampus;
  });

  return (
    <Card title="材料记录列表">
      <Space style={{ marginBottom: 16 }} size="middle">
        <Search
          placeholder="搜索交材料人或材料名称"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 240 }}
        />
        
        <Select 
          defaultValue="all" 
          style={{ width: 120 }} 
          onChange={(value) => setStatusFilter(value)}
        >
          <Option value="all">全部状态</Option>
          <Option value="已盖章">已盖章</Option>
          <Option value="未盖章">未盖章</Option>
        </Select>

        <Select 
          defaultValue="all" 
          style={{ width: 120 }} 
          onChange={(value) => setCampusFilter(value)}
        >
          <Option value="all">全部校区</Option>
          <Option value="青岛">青岛</Option>
          <Option value="泰安">泰安</Option>
          <Option value="济南">济南</Option>
        </Select>
      </Space>
      
      <Table 
        columns={columns} 
        dataSource={filteredMaterials.map(item => ({...item, key: item._id}))} 
        loading={loading}
        pagination={{ 
          pageSize: 6,
          showSizeChanger: false,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条记录`
        }}
        bordered
      />
    </Card>
  );
};

export default MaterialList;
