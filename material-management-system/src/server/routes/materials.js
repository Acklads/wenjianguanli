const express = require('express');
const router = express.Router();
const {
  getMaterials,
  createMaterial,
  getMaterial,
  updateMaterial,
  deleteMaterial,
  getMaterialStats
} = require('../controllers/materialController');

// 获取所有材料和创建新材料
router.route('/')
  .get(getMaterials)
  .post(createMaterial);

// 获取、更新和删除单个材料
router.route('/:id')
  .get(getMaterial)
  .put(updateMaterial)
  .delete(deleteMaterial);

// 获取统计数据
router.route('/stats/all')
  .get(getMaterialStats);

module.exports = router;
