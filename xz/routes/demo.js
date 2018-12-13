//引入express
const express=require('express');
var router=express.Router();
//引入连接池
var pool = require('../pool.js');
router.get('/ajaxDemo',(req,res)=>{
	res.send('这是我的第一个AJAX程序');
});

router.get('/ajaxExer',(req,res)=>{
	res.send('这是我的第一个ajax练习');
});
//3.get-paras
router.get('/ajaxlogin',(req,res)=>{
	//获取用户名称
	var $uname=req.query.uname;
	var $upwd=req.query.upwd;
	console.log($uname);
	if(!$uname){
		res.send('$uname requireed');
		return;
	}
	
	if(!$upwd){
		res.send("$upwd reuqired");
		return;
	}
	var sql=`SELECT * FROM xz_user WHERE uname=? AND upwd=?`;
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		console.log(result);
		if(result.length>0){
			res.send('登录成功');
		}else{
			res.send('uname or upwd is error');
		}
	});
});
router.get("/ajaxList",(req,res)=>{
	var sql=`SELECT * FROM xz_user`;
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result);
		}else{
			res.send("获取失败");
		}
	});
});
router.get("/checkUname",(req,res)=>{
	
});
//post方法登录
router.post("/post_login",(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	if(!$uname){
		res.send({code:401,msg:"用户名不存在"});
		return;
	}
	if(!$upwd){
		res.send("密码不存在");
		return;
	}
	//res.send('success');
	var sql=`SELECT * FROM xz_user WHERE uname=? AND upwd=?`;
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send('登录成功');
		}else{
			res.send('uname or upwd is error');
		}
	});
});

//导出
module.exports = router;

