const express = require('express');
var router = express.Router();
var pool = require('../pool.js');
//1.商品添加购物车
router.post('/add',(req,res)=>{
	var Obj = req.body;
	//key键值对
	var i=400;
	for(var key in Obj){
		i++;
		if(!Obj[key]){
			res.send({code:i,msg:`${key} required`});
			return;
		}
	}
	Obj.iid=null;
	var sql = `INSERT INTO xz_shoppingcart_item SET ?`;
	pool.query(sql,[Obj],(err,result)=>{
		if(err){
			throw error;
		}
		res.send({code:200,msg:'add suc'});
	});
});
//2.删除购物车
router.post('/delete',(req,res)=>{
	var $iid = req.body.iid;
	if(!$iid){
		res.send({code:401,msg:'iid required'});
		return;
	}
	var sql = `DELETE FROM xz_shoppingcart_item WHERE iid=?`;
	pool.query(sql,[$iid],(err,result)=>{
		if(err){
			throw error;
		}
		res.send(result);
	});
});

module.exports = router;