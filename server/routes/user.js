const express = require('express');
var router = express.Router();
//引入连接池
var pool = require('../pool.js');

//添加路由
//1.用户注册
router.post('/register',(req,res)=>{
	//res.send('注册成功');
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	var $email=req.body.email;
	var $phone=req.body.phone;
	
	if(!$uname){
		res.send({code:401,msg:'uname required'});
		return;
	}
	if(!$upwd){
		res.send({code:401,msg:'uname required'});
		return;
	}
	if(!$email){
		res.send({code:401,msg:'uname required'});
		return;
	}
	if(!$phone){
		res.send({code:401,msg:'uname required'});
		return;
	}
	//插入数据
	var sql = `INSERT INTO xz_user VALUES(null,?,?,?,?,NULL,NULL,NULL)`;
	pool.query(sql,[$uname,$upwd,$email,$phone],(err,result)=>{
		if(err) throw err;
		//console.log(result);
		if(result.affectedRows>0){
			res.send({code:200,msg:'register success'});
		}else{
			res.send({code:401,msg:'register success'});
		}
	});
});
//2.创建登录路由
router.post('/login',(req,res)=>{
	var obj=req.body;
	var $uname = obj.uname;
	var $upwd = obj.upwd;
	if(!$uname){
		res.send({code:401,msg:'uname required'});
		return;
	}
	if(!$upwd){
		res.send({code:401,msg:'upwd required'});
		return;
	}
	var sql = `SELECT * FROM xz_user WHERE uname=? AND upwd=?`;
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.length>0){
			res.send({code:200,msg:'登陆成功'});
		}else{
			res.send({code:301,msg:'登录失败'});
		}
	});
});
//3.用户检索
router.get('/detail',(req,res)=>{
	var obj = req.query;
	var $uid=obj.uid;
	if(!$uid){
		res.send({code:401,msg:'uid required'});
	}
	var sql=`SELECT * FROM xz_user WHERE uid=?`;
	pool.query(sql,[$uid],(err,result)=>{
		if(err) throw err;
		//console.log(result);
		if(result.length>0){
			res.send(result);
		}else{
			res.send({code:301,msg:'检索失败'});
		}
	});
});
//4.用户修改
router.post('/update',(req,res)=>{
	var obj = req.body;
	var $uid=obj.uid;
	var $email=obj.email;
	var $phone = obj.phone;
	var $user_name=obj.user_name;
	var $gender=obj.gender;
	//console.log(obj);
	var j=400;
	for(var proName in obj){
		j++;
		if(!obj[proName]){
			res.send({code:j,msg:`${proName} required`});
			return;
		}
	}
	var sql = `UPDATE xz_user SET email=?,phone=?,user_name=?,gender=? WHERE uid=?`;
	pool.query(sql,[$email,$phone,$user_name,$gender,$uid],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.affectedRows>0){
			res.send(result);
		}else{
			res.send({code:301,msg:'修改失败'});
		}
	});
});
//5.用户列表
router.get('/list',(req,res)=>{
	var obj=req.query;
	var $pno=parseInt(obj.pno);
	var $count=parseInt(obj.count);
	if(!$pno){
		$pno=1;
	}
	if(!$count){
		$count=7;
	}
	var sql = `SELECT * FROM xz_user ORDER BY uid ASC LIMIT ?,?`;
	pool.query(sql,[($pno-1)*$count,$count],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.length>0){
			res.send(result);
		}
	});
});
//6.用户删除
router.get('/delete',(req,res)=>{
	var $uid=req.query.uid;
	if(!$uid){
		res.send({code:200,msg:'uid required'});
		return;
	}
	var sql = `DELETE FROM xz_user WHERE uid=?`;
	pool.query(sql,[$uid],(err,result)=>{
		if(err) throw err;
		//console.log(result);
		if(result.affectedRows>0){
			res.send('删除成功');
		}else{
			res.send({code:301,msg:'delete false'});
		}
	});
});

module.exports = router;
