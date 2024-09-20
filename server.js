const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// 使用 CORS 中间件，允许所有域请求
app.use(cors());

// 静态资源目录，假设你的前端文件放在 public 文件夹里
app.use(express.static('public'));

// API 转发：代理请求到 Mojang API
app.get('/api/users/profiles/minecraft/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const response = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
});

// 启动服务器，监听指定端口
app.listen(3000, () => {
  console.log('服务器在 http://localhost:3000 启动');
});
