//引入express
const express=require('express');
var router=express.Router();
//引入连接池
var pool = require('../pool.js');
//1.添加路由
router.post('/login',(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	if(!$uname){
		res.send('401');
		return;
	}
	if(!$upwd){
		res.send('402');
		return;
	}
	var sql=`SELECT * FROM xz_user WHERE uname=? AND upwd=?`;
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send("登录成功");
		}else{
			res.send("登录失败");
		}

	})
});
//2.查询所有用户数据
router.get('/list',(req,res)=>{
	pool.query("SELECT * FROM xz_user",(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result);
		}else{
			res.send('err');
		}
	});
});
//3.删除数据
router.post('/delete',(req,res)=>{
	var $uid=req.body.uid;
	console.log($uid);
	if(!$uid){
		res.send('401');
		return;
	}
	var sql=`DELETE FROM xz_user WHERE uid=?`;
	pool.query(sql,[$uid],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.affectedRows>0){
			res.send('1');
		}else{
			res.send('2');
		}
	});
});
//4.查询数据
router.get('/userUpdate',(req,res)=>{
	var $uid=req.query.uid;
	//console.log($uid);
	if(!$uid){
		res.send('401');
		return;
	}
	var sql=`SELECT * FROM xz_user WHERE uid`;
	pool.query(sql,[$uid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result);
		}else{
			res.send("获取失败");
		}
	});
});
/*
	//5.id查询数据
router.get('/userUpdate',(req,res)=>{
	var $uid=req.query.uid;
	//console.log($uid);
	if(!$uid){
		res.send('401');
		return;
	}
	var sql=`SELECT * FROM xz_user WHERE uid`;
	pool.query(sql,[$uid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result);
		}else{
			res.send("获取失败");
		}
	});
});
*/
//6.表单修改数据
router.post('/update',(req,res)=>{
	var obj = req.body;
	var $uid=obj.uid;
	var $uname=obj.uname;
	var $upwd=obj.upwd;
	var $email=obj.email;
	var $phone=obj.phone;
	var $avatar=obj.avatar;
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
	var sql = `UPDATE xz_user SET uname=?,upwd=?,email=?,phone=?,avatar=?,user_name=?,gender=? WHERE uid=?`;
	pool.query(sql,[$uname,$upwd,$email,$phone,$avatar,$user_name,$gender,$uid],(err,result)=>{
		if(err) throw err;
		//console.log(result);
		if(result.affectedRows>0){	
			res.send("1");
		}else{
			res.send("2");
		}
	});
});
//7.检验用户名是否存在
router.get('/checkUname',(req,res)=>{
	var $uname=req.query.uname;
	if(!$uname){
		res.send('用户名不存在');
		return;
	}
	var sql=`SELECT * FROM xz_user WHERE uname=?`;
	pool.query(sql,[$uname],(err,result)=>{
		if(err) throw err;
		//console.log(result);
		if(result.length>0){
			res.send('1');
		}else{
			res.send('0');
		}
	});
});
//8.注册接口
router.post('/register',(req,res)=>{
	var obj=req.body;
	var i=400;
	for(var proName in obj){
		i++;
		if(!obj[proName]){
			res.send({code:i,msg:`${proName} err`});
			return;
		}
	}
	var sql = `INSERT INTO xz_user SET ?`;
	pool.query(sql,[obj],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.affectedRows>0){
			res.send(result);
		}else{
			res.send({code:301,msg:'添加失败'});
		}
	});
});

//导出
module.exports = router;

