# 文件交接管理系统

一个简单的文件交接管理系统，用于记录交材料人、材料名称、交材料时间以及文件状态。

## 功能特性

- 记录交材料人姓名
- 记录材料名称
- 自动记录交材料时间
- 跟踪材料状态（已盖章/未盖章）
- 搜索和过滤材料记录
- 状态更新和删除操作

## 技术栈

- **前端**：React、Ant Design、Axios
- **后端**：Node.js、Express
- **数据库**：MongoDB

## 系统结构

```
material-management-system/
├── src/
│   ├── client/            # 前端React应用
│   │   └── src/
│   │       ├── components/ # React组件
│   │       ├── services/   # API服务
│   │       └── App.jsx     # 主应用组件
│   └── server/            # 后端Express应用
│       ├── config/        # 配置文件
│       ├── controllers/   # 控制器
│       ├── models/        # 数据模型
│       ├── routes/        # 路由
│       └── index.js       # 服务器入口
└── package.json           # 项目配置
```

## 安装和运行

### 前提条件

- Node.js (v14+)
- MongoDB

### 安装步骤

1. 克隆项目
```bash
git clone <repository-url>
cd material-management-system
```

2. 安装依赖
```bash
# 安装服务器依赖
npm install

# 安装客户端依赖
cd src/client
npm install
```

3. 配置环境变量
创建.env文件在根目录，参考.env.example

4. 运行应用
```bash
# 在根目录启动服务器
npm run dev

# 在新终端中启动客户端
npm run client
```

5. 访问应用
浏览器打开 http://localhost:3000 
