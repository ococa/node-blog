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
		const blogResult = handleBlogRouter(req, res);
		if (blogResult) {
			blogResult.then(blogData => {
				if (blogData) {
					res.end(
						JSON.stringify(blogData)
					)
				}
			}).catch(err=> {
				console.log('err:  ', err, '\n')
			})
			return;
		}


		// deal with blog router
		// const userData = handleUserRouter(req, res);
		// if (userData) {
		// 	res.end(
		// 		JSON.stringify(userData)
		// 	)
		// }
		const userResult = handleUserRouter(req, res);
		if (userResult) {
			userResult.then(userData => {
				res.end(
					JSON.stringify(userData)
				)
			})
			return;
		}

	})


	// deal with default
	// res.writeHead(404, {'Content-type': 'text/plain'})
	// res.write('404 Not Found\n');
	// res.end();

}

module.exports = serverHandle;
