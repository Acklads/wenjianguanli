const Material = require('../models/Material');

// 获取所有材料记录
exports.getMaterials = async (req, res) => {
  try {
    const materials = await Material.find().sort({ submissionTime: -1 });
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: '获取材料记录失败', error: error.message });
  }
};

// 创建新的材料记录
exports.createMaterial = async (req, res) => {
  try {
    const { submitterName, materialName, status } = req.body;
    
    if (!submitterName || !materialName) {
      return res.status(400).json({ message: '请提供交材料人和材料名称' });
    }
    
    const material = await Material.create({
      submitterName,
      materialName,
      status: status || '未盖章',
      submissionTime: new Date()
    });
    
    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ message: '创建材料记录失败', error: error.message });
  }
};

// 获取单个材料记录
exports.getMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    
    if (!material) {
      return res.status(404).json({ message: '未找到材料记录' });
    }
    
    res.status(200).json(material);
  } catch (error) {
    res.status(500).json({ message: '获取材料记录失败', error: error.message });
  }
};

// 更新材料记录
exports.updateMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!material) {
      return res.status(404).json({ message: '未找到材料记录' });
    }
    
    res.status(200).json(material);
  } catch (error) {
    res.status(500).json({ message: '更新材料记录失败', error: error.message });
  }
};

// 删除材料记录
exports.deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    
    if (!material) {
      return res.status(404).json({ message: '未找到材料记录' });
    }
    
    res.status(200).json({ message: '材料记录已删除' });
  } catch (error) {
    res.status(500).json({ message: '删除材料记录失败', error: error.message });
  }
};

// 获取材料记录统计数据
exports.getMaterialStats = async (req, res) => {
  try {
    // 按校区统计
    const campusStats = await Material.aggregate([
      {
        $group: {
          _id: '$campus',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          campus: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    // 按状态统计
    const statusStats = await Material.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          status: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    res.status(200).json({
      campusStats,
      statusStats
    });
  } catch (error) {
    res.status(500).json({ message: '获取统计数据失败', error: error.message });
  }
};
