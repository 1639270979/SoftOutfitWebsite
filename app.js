//引入express模块
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.js');
const productRouter = require('./routes/product.js');
const demoRouter=require('./routes/demo.js');
const myProRouter=require('./routes/myPro.js');
var server = express();
//连接服务器
server.listen(5050);
//托管静态资源
server.use(express.static('public'));
server.use(express.static('myex'));
server.use(express.static('myPro'));
//引入bodyParser中间件将post请求数据解析为对象，一定要写在路由的前面
server.use(bodyParser.urlencoded({extended:false}));
//将/user路由器挂载到userRouter下
server.use('/user',userRouter);
//将/product路由器挂载到productRouter下
server.use('/product',productRouter);
//将/demo路由器挂载到demo下
server.use('/demo',demoRouter);
//将/myPro路由器挂载到myProRouter下
server.use('/myPro',myProRouter);