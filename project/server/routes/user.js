//user模块
const express = require('express');
//const bodyParser = require('body-parser');
var router = express.Router();

//引用连接池
var pool = require('../pool.js');
//一.用户注册
router.post('/register',(req,res)=>{
	//res.send('注册成功');
	//获取表单中的数据
	//console.log(req.body);
	//在这块执行把数据插入到数据库中
	//1.检测用户名不能为空
	var $uname = req.body.uname;
	if(!$uname){
		res.send({code:401,msg:'uname required'});
		return;//阻止程序继续执行
	}
	//2.检测密码不能为空
	var $upwd = req.body.upwd;
	if(!$upwd){
		res.send({code:402,msg:'upwd reequired'});
		return;
	}
	//3.检测邮箱不能为空
	var $email = req.body.email;
	if(!$email){
		res.send({code:403,msg:'email required'});
		return;
	}
	//4.检测电话不能为空
	var $phone = req.body.phone;
	if(!$phone){
		res.send({code:404,msg:'phone require'});
		return;
	}
	//注册
	var sql = `INSERT INTO xz_user VALUES(NULL,?,?,?,?,NULL,NULL,NULL)`;
	pool.query(sql,[$uname,$upwd,$email,$phone],(err,result)=>{
		if(err){
			throw err;//抛出异常
		}
		res.send({code:200,msg:'register success'});
	});
});
//二.用户登录
router.post('/login',(req,res)=>{
	//console.log(req.body);
	//练习：检测用户名和密码不能为空
	var $uname = req.body.uname;
	if(!$uname){
		res.send({
			code:401,msg:'uname required'
		});
	}
	var $upwd = req.body.upwd;
	if(!$upwd){
		res.send({
			code:402,msg:'upwd required'
		});
	}
	//console.log(req.body);
	//2.在数据库中查找用户名和密码匹配的数据
	var sql = `SELECT * FROM xz_user WHERE uname=? AND upwd=?`;
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		console.log(result);
		//如果result数组长度大于0，说明登录成功，否则说明用户名或者密码错误
		if(result.length>0){
			res.send({code:200,msg:'login success'});
		}else{
			res.send({code:301,msg:'uname or upwd is error'});
		}
	});
});
//3.用户列表
router.get('/list',(req,res)=>{
	//获取提交的数据
	//console.log(req.query);
	//如果页码为空，默认设置为1
	var $pno = req.query.pno;
	if(!$pno){
		$pno=1;
	}
	//如果每页大小为空，默认设置为5
	//否则就把用户的值转为整型
	var $pageSize  =  req.query.pageSize;
	if(!$pageSize){
		$pageSize=5;
	}else{
		$pageSize = parseInt($pageSize);
	}
	//根据每页页码和大小查询用户列表
	//开始 = (当前页码-1)*每页大小
	var sql = `SELECT * FROM xz_user ORDER BY uid ASC LIMIT ?,?`;
	pool.query(sql,[($pno-1)*$pageSize,$pageSize],(err,result)=>{
		if(err){
			throw error;
		}else{
			//console.log(result);
			res.send(result);
		}
	});
});
//4.用户检索
router.get('/query',(req,res)=>{
	var $uid = req.query.uid;
	if(!$uid){
		res.send({code:401,msg:'uid required'});
		return;
	}
	var sql = `SELECT * FROM xz_user WHERE uid=?`;
	pool.query(sql,[$uid],(err,result)=>{
		res.send(result[0]);
	});
});
//5.删除用户
router.post('/delete',(req,res)=>{
	var $uid = req.body.uid;
	if(!$uid){
		res.send({code:401,msg:'uid required'});
		return;
	}
	var sql = `DELETE FROM xz_user WHERE uid=?`;
	pool.query(sql,[$uid],(err,result)=>{
		if(err){
			throw error;
		}else{
			res.send({code:200,msg:'delete success'});
		}
	});
});
//6.修改用户
router.post('/update',(req,res)=>{
	//拿到客户端数据，分别检测
	var $uid = req.body.uid;
	if(!$uid){
		res.send({code:401,msg:'uid required'});
		return;
	}
	var $user_name = req.body.user_name;
	if(!$user_name){
		res.send({code:402,msg:'user_name required'});
		return;
	}
	var $gender = req.body.gender;
	if(!$gender){
		res.send({code:403,msg:'gender required'});
		return;
	}
	var $phone = req.body.phone;
	if(!$phone){
		res.send({code:404,msg:'phone required'});
		return;
	}
	var $email = req.body.email;
	if(!$email){
		res.send({code:405,msg:'email required'});
		return;
	}
	var sql = `UPDATE xz_user SET user_name=?,gender=?,phone=?,email=? WHERE uid=?`;
	pool.query(sql,[$user_name,$gender,$phone,$email,$uid],(err,result)=>{
		if(err){
			throw error;
		}
		res.send({code:200,msg:'update success'});
		console.log(result);
	});
});

//导出
module.exports = router; 
