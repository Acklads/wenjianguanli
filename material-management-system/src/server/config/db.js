const mongoose = require('mongoose');

// 连接到MongoDB数据库
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/materials', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB数据库连接成功: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB连接错误: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
