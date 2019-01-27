const express=require("express");
const router=express.Router();
const pool=require("../pool");
//添加路由
router.get("/",(req,res)=>{
	var sql="SELECT * FROM novel_banner";
	pool.query(sql,[],(err,result)=>{
		if(err) console.log(err);
		// res.send(result);
		res.writeHead(200,{
			"Access-Control-Allow-Origin":"*"
		});
		res.write(JSON.stringify(result));
		res.end();
	})
})

module.exports=router;

