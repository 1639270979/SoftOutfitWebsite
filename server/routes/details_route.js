const express=require("express");
const router=express.Router();
const pool=require("../pool");
//添加路由
router.get("/",(req,res)=>{
    var did=req.query.did;
    res.writeHead(200,{
        "Access-Control-Allow-Origin":"*"
    });
    var sql = "SELECT * FROM novel_details WHERE did=?";
    pool.query(sql,[did],(err,result)=>{
        if(err) console.log(err);
        res.write(JSON.stringify(result));
		res.end();
    })
})

module.exports=router;