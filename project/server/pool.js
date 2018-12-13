//引入mysql模块
const mysql = require('mysql'); 
var pool = mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	port:3306,
	database:'xz',
	password:'',
	connectionLimit:10
});
module.exports = pool;