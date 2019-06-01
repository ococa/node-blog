const mysql = require('mysql');
const { MYSQL_CONFIG } = require('../config/db');



// create connection objec 创建连接对象
const con = mysql.createConnection(MYSQL_CONFIG);

// start connect 开始连接
con.connect();

const sql = 'select * from users where id = "1" ;';

// exec mysql statement 执行mysql 语句
function execSql(sql) {
	return new Promise((resolve, reject) => {
		con.query(sql, (err, result) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(result);
		});
	})
}

// close connect 关闭链接
// con.end();
module.exports = {
	execSql
}
