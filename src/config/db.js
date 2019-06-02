const env = process.env.NODE_ENV; 		// get node enviroment 获取环境
const mysql_server_config = require('./config');

let MYSQL_CONFIG = null;
let REDIS_CONFIG = null;

switch(env) {
	case 'production':
			MYSQL_CONFIG = mysql_server_config.MYSQL_CONF.production;
			REDIS_CONFIG = mysql_server_config.REDIS_CONF.production;

			break;
	case 'dev':
			MYSQL_CONFIG = mysql_server_config.MYSQL_CONF.dev;
			REDIS_CONFIG = mysql_server_config.REDIS_CONF.dev;
			break;
	default:
			MYSQL_CONFIG = mysql_server_config.MYSQL_CONF.dev;
			REDIS_CONFIG = mysql_server_config.REDIS_CONF.dev;
}

module.exports = {
	MYSQL_CONFIG,
	REDIS_CONFIG
}
