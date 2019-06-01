const queryString = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');


const serverHandle = (req, res) => {
	// 设置返回格式 json
	res.setHeader('Content-type', 'application/json');

	// get url path
	const url = req.url;
	req.path = url.split('?')[0];

	// 解析query params || resovle query params
	req.query = queryString.parse(url.split('?')[1])

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

	// deal with default
	// res.writeHead(404, {'Content-type': 'text/plain'})
	// res.write('404 Not Found\n');
	// res.end();

}

module.exports = serverHandle;
