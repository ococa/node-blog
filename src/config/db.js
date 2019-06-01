const env = process.env.NODE_ENV; 		// get node enviroment 获取环境
const mysql_server_config = require('./config');

let MYSQL_CONFIG = null;

switch(env) {
	case 'production':
			MYSQL_CONFIG = mysql_server_config.production;
			break;
	case 'dev':
			MYSQL_CONFIG = mysql_server_config.dev;
			break;
	default:
			MYSQL_CONFIG = mysql_server_config.dev;
}

module.exports = {
	MYSQL_CONFIG
}
