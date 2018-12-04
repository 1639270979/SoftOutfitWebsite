//使用express构建web服务器
const express = require('express');
const user = require('./routes/user.js');
var product = require('./routes/product.js');
var shoppingcart = require('./routes/shoppingcart');
var demo = require('./routes/demo.js');
const bodyParser = require('body-parser');
var app = express();
var server = app.listen(3000);
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));

//托管静态资源
app.use(express.static('public'));
//托管静态资源到myExercise目录下
app.use(express.static('myEcercise'));
//使用路由器管理路由
//把user路由器挂载到/user下
app.use('/user',user);
//把product路由器挂载到/product下
app.use('/product',product);
//把shoppingcart路由器挂载到/shoppingcart下
app.use('/shoppingcart',shoppingcart);
//把demo挂载到/demo 下
app.use('/demo',demo);
 