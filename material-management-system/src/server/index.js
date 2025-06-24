const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// 加载环境变量
dotenv.config();

// 连接数据库
connectDB();

// 初始化Express应用
const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/materials', require('./routes/materials'));

// 默认路由
app.get('/', (req, res) => {
  res.send('文件交接管理系统API正在运行');
});

// 启动服务器
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`服务器在端口 ${PORT} 上运行`);
});
