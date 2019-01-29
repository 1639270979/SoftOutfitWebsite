const express=require("express");
const router=express.Router();
const pool=require("../pool");
//添加路由
router.get("/",(req,res)=>{
	var output={
		banners:[],
		recs:[]
	}
	var sql="SELECT * FROM novel_banner";
	res.writeHead(200,{
		"Access-Control-Allow-Origin":"*"
	});
	pool.query(sql,[],(err,result)=>{
		if(err) console.log(err);
		// res.send(result);
		output.banners=result;
		var sql="SELECT * FROM novel_recommend";
		pool.query(sql,[],(err,result)=>{
			if(err) console.log(err);
			output.recs=result;
			res.write(JSON.stringify(output));
			res.end();
		})
	})
})

module.exports=router;

