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
		if(result.length>0){
			res.send('login success');
		}else{
			res.send('uname or upwd is error');
		}
	});
});

//导出
module.exports = router;

