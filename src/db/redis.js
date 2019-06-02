/**
 * redis 操作封装
 * 返回execRedis Function
 */

const redis = require('redis');
const { REDIS_CONFIG } = require('../config/db');

const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);
redisClient.on('error', err => {
	console.log(err);
});


function set(key, value) {
	if (typeof value === 'object') {
		value = JSON.stringify(value);
	}
	return redisClient.set(key, value, redis.print);
}

function get(key) {
 return new Promise((resovle, reject) => {
	redisClient.get(key, (err, val) => {
		if (err) {
			reject(err);
			return;
		}
		if (value === null) {
			resovle(null);
			return;
		}
		// 如果是json则转换，否则直接resolve
		try {
			resovle(
				JSON.parse(val)
			)
		} catch (error) {
			resovle(val)
		}
	});
 })
}

module.exports = {
	get,
	set
}
