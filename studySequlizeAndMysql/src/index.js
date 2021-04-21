const express = require('express');
const app = express();
const models = require('../models'); // 模型对象

// models.User
// models.Sequlize

app.get('/create', async (req, res) => {
  let { name } = req.query;
  // return promise -- sequelize 对象
  let user = await models.User.create({
    name
  })
  console.log(user)
  res.json({
    message: '创建成功',
    user
  })
})


app.get('/test', (req, res) => {
  res.json({
    message: 'test'
  })
})

app.listen('3001', () => {
  console.log('服务启动成功')
})