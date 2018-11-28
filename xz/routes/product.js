//product模块
const express = require('express');
//使用express下的路由功能
var router = express.Router();
//引入连接池
var pool = require('../pool.js');
//1.获取商品数据
router.get('/list',(req,res)=>{
	//如果页码为空，默认为1
	var $pno = req.query.pno;
	if(!$pno){
		$pno=1;
	}
	//获取每页大小，如果为空，默认为10
	var $pageSize = req.query.pageSize;
	if(!$pageSize){
		$pageSize=10;
	}else{
		//在分页查询中
		//1不允许输入小数
		//2在表单中输入的值，传递到服务器，是字符串的形式的值
		$pageSize=parseInt($pageSize);
	}
	//开始 = (当前页码-1)*每页大小
	var sql = `SELECT * FROM xz_laptop ORDER BY lid ASC LIMIT ?,?`;
	pool.query(sql,[($pno-1)*$pageSize,$pageSize],(err,result)=>{
		if(err){
			throw error;
		}
		res.send(result);
	});
});
//2.商品详情
router.get('/query',(req,res)=>{
	//获取用户的编号，进行检测是否为空
	var $lid = req.query.lid;
	if(!$lid){
		res.send({code:401,msg:'lid required'});
		return;
	}
	//查询编号所对应的商品
	var sql = `SELECT * FROM xz_laptop WHERE lid=? `;
	pool.query(sql,[$lid],(err,result)=>{
		if(err){
			throw error;
		}
		//查看返回的结果是否存在
		if(result.length>0){
			res.send(result[0]);
		}else{
			res.send({code:401,msg:'the product is not exist'});
		}
	});
});
//3.删除商品
router.post('/delete',(req,res)=>{
	//获取商品编号
	var $lid = req.body.lid;
	if(!$lid){
		res.send({code:401,msg:'lid required'});
		return;
	}
	//删除所对应的商品
	var sql = `DELETE FROM xz_laptop WHERE lid=?`;
	pool.query(sql,[$lid],(err,result)=>{
		if(err){
			throw error;
		}
		console.log(result);
	});
});
//4添加商品
router.post('/add',(req,res)=>{
	//简化方法
	var Obj = req.body;
	//检测是否为空
	var i=400;
	for(var proName in Obj){
		i++;
		//proName属性名 
		//Obj[proName]属性值
		//判断属性值是否为空
		if(!Obj[proName]){
			res.send({code:i,msg:`${proName} required`});
			return;
		}
	}
	Obj.lid=null;
	var sql = `INSERT INTO xz_laptop SET ?`;
	pool.query(sql,[Obj],(err,result)=>{
		if(err){
			throw error;
		}
		res.send({code:200,msg:'success'});
	});
	//常规方法
	/*
	var $family_id = req.body.famliy_id;
	var $title = req.body.title;
	var $subtitle = req.body.subtitle;
	var $price = req.body.price;
	var $promise = req.body.promise;
	var $spec = req.body.spec;
	var $lname = req.body.lname;
	var $os = req.body.os;
	var $memory = req.body.memory;
	var $resolution = req.body.resolution;
	var $video_card = req.body.video_card;
	var $cpu = req.body.cpu;
	var $video_memory = req.body.video_memory;
	var $category = req.body.category;
	var $disk = req.body.disk;
	var $details = req.body.details;
	var $shelf_time = req.body.shelf_time;
	var $sold_count = req.body.sold_count;
	var $is_onsale = req.body.is_onsale;


	
	var sql=`INSERT INTO xz_laptop VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
	pool.query(sql,[$family_id,$title,$subtitle,$price,$promise,$spec,$lname,$os,$memory,$resolution,$video_card,$cpu,$video_memory,$category,$disk,$details,$shelf_time,$sold_count,$is_onsale],(err,result)=>{
		if(err){
			throw error;
		}
		res.send(result);
	});
	*/
});


//导出路由对象
module.exports = router;
