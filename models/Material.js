const mongoose = require('mongoose');

// 定义材料记录模型
const materialSchema = new mongoose.Schema({
  submitterName: {
    type: String,
    required: [true, '请输入交材料人姓名'],
    trim: true
  },
  materialName: {
    type: String,
    required: [true, '请输入材料名称'],
    trim: true
  },
  campus: {
    type: String,
    enum: ['青岛', '泰安', '济南'],
    required: [true, '请选择校区'],
    default: '青岛'
  },
  submissionTime: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['已盖章', '未盖章'],
    default: '未盖章'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Material', materialSchema);
