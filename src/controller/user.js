const { execSql } = require('../db/mysql');
const loginController = (username, password) => {
	let sql = `select username from users where username="${username}" and \`password\` = "${password}"`;
	return execSql(sql).then(data => {
		return data[0] || {};
	})
}

module.exports = {
	loginController,
}
