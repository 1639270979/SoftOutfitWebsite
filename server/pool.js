//引入mysql模块
const mysql = require('mysql'); 
var pool = mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	database:'novel',
	password:'',
	connectionLimit:10
});
module.exports = pool;