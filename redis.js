const redis = require('redis');


// create client
const redisClient = redis.createClient(6379, '127.0.0.1');
redisClient.on('error', err => {
	console.log(err);
});

// 测试
redisClient.set('myname', 'wangcha2', redis.print);
redisClient.get('myname', (err, val) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log('value:', val)
	// 推出
	redisClient.quit();
});

redisClient.get('mykey', (err, val) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log('value:', val)
	// 推出
	redisClient.quit();
});

redisClient.get('mykey2', (err, val) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log('value:', val)
	// 推出
	redisClient.quit();
});
