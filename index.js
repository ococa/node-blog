const queryString = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

/**
 * 用于处理post的data
 * @param {*} req request
 * @param {*} res response
 */
const getPostData = (req, res) => {
	return new Promise((resolve, reject) => {
		if (req.method !== 'POST') {
			resolve({});
			return;
		}
		if (req.headers['content-type'] !== 'application/json') {
			resolve({});
			return;
		}
		// 拼接数据
		let postData = '';
		req.on('data', chunk => {
			postData += chunk.toString();
		})
		req.on('end', () => {
			if (!postData) {
				resolve({});
				return;
			}
			console.log('typeof postdata', typeof postData);
			console.log(' postdata', postData);
			console.log('stringify postdata', JSON.parse(postData))

			resolve(
				JSON.parse(postData)
			)
		})

	})
}


const serverHandle = (req, res) => {
	// 设置返回格式 json
	res.setHeader('Content-type', 'application/json');

	// get url path
	const url = req.url;
	req.path = url.split('?')[0];

	// 解析query params || resovle query params
	req.query = queryString.parse(url.split('?')[1])

	// 处理post的data
	getPostData(req).then(postData => {
		req.body = postData;
		// deal with blog router
		const blogData = handleBlogRouter(req, res);
		if (blogData) {
			res.end(
				JSON.stringify(blogData)
			)
		}

		// deal with blog router
		const userData = handleUserRouter(req, res);
		if (userData) {
			res.end(
				JSON.stringify(userData)
			)
		}

	})


	// deal with default
	// res.writeHead(404, {'Content-type': 'text/plain'})
	// res.write('404 Not Found\n');
	// res.end();

}

module.exports = serverHandle;
