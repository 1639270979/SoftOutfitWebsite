//引入express模块
const express = require('express');
const bodyParser = require('body-parser');
const index=require('./routes/index_route.js');
var app = express();
//连接服务器
app.listen(3000);
//托管静态资源
app.use(express.static('public'));
//引入bodyParser中间件将post请求数据解析为对象，一定要写在路由的前面
app.use(bodyParser.urlencoded({extended:false}));
//将/index路由器挂载到index下
app.use('/index',index);
