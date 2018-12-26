const express = require('express');
var router = express.Router();
//引入连接池
var pool = require('../pool.js');
//创建路由
//1.商品列表
router.get('/list',(req,res)=>{
	var $pno = parseInt(req.query.pno);
	var $count = parseInt(req.query.count);
	if(!$pno){
		$pno=1;
	}
	if(!$count){
		$count=5;
	}
	var sql = `SELECT * FROM xz_laptop ORDER BY lid ASC LIMIT ?,? `;
	pool.query(sql,[($pno-1)*$count,$count],(err,result)=>{
		if(err) throw err;
		console.log(result);
		res.send(result);
	});
});
//2.商品详情
router.get('/detail',(req,res)=>{
	var $lid=req.query.lid;
	if(!$lid){
		res.send({code:401,msg:'err'});
		return;
	}
	var sql = `SELECT * FROM xz_laptop WHERE lid=?`;
	pool.query(sql,[$lid],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.length>0){
			res.send(result);
		}else{
			res.send('查询失败');
		}
	});
});
//3.删除商品
router.get('/delete',(req,res)=>{
	var $lid=req.query.lid;
	if(!$lid){
		res.send({code:401,msg:'err'});
		return;
	}
	var sql = `DELETE FROM xz_laptop WHERE lid=?`;
	pool.query(sql,[$lid],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.affectedRows>0){
			res.send('删除成功');
		}else{
			res.send('删除失败');
		}
	});
});
//4.添加商品
router.post('/add',(req,res)=>{
	var obj=req.body;
	var i=400;
	for(var proName in obj){
		i++;
		if(!obj[proName]){
			res.send({code:i,msg:`${proName} err`});
			return;
		}
	}
	var sql = `INSERT INTO xz_laptop SET ?`;
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

//导出路由
module.exports = router;