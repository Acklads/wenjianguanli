import axios from 'axios';

const API_URL = '/api/materials';

// 获取所有材料记录
export const getMaterials = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// 创建新的材料记录
export const createMaterial = async (materialData) => {
  const response = await axios.post(API_URL, materialData);
  return response.data;
};

// 获取单个材料记录
export const getMaterial = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// 更新材料记录
export const updateMaterial = async (id, materialData) => {
  const response = await axios.put(`${API_URL}/${id}`, materialData);
  return response.data;
};

// 删除材料记录
export const deleteMaterial = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// 获取统计数据
export const getMaterialStats = async () => {
  const response = await axios.get(`${API_URL}/stats/all`);
  return response.data;
};
