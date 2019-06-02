const queryString = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');


// 设置cookie过期时间
const getCookieExpires = () => {
	const d = new Date();
	d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
	return d.toGMTString();
}

// session数据
const SESSION_DATA = {};

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

	// 解析cookie 	    || resolve cookie
	req.cookie = {};
	const cookieStr = req.headers.cookie || '' ;
	// req.cookie = {};
	cookieStr.split(';').forEach(element => {
		if (!element) {
			return;
		}
		const arr = element.split('=');
		const key = arr[0].trim();
		const value = arr[1].trim();
		req.cookie[key] = value;
	});

	// resolve session 解析session
	let needSetCookie = false;
	let userId = req.cookie.userid;
	// 如果cookie中有userid则
	if (userId) {
		if (!SESSION_DATA[userId]) {
			// 如果cookie中有userid 但是session没有设置，则初始化session[userid]
			SESSION_DATA[userId] = {};
		}
	} else {
		// 如果cookie中没有userid 则需要设置cookie的userid以及初始化session[userid]
		needSetCookie = true;
		userId = `${Date.now()}_${Math.random()}`;
		SESSION_DATA[userId] = {};
	}
	// 将session挂在req.session上面
	req.session = SESSION_DATA[userId];


	// 处理post的data
	getPostData(req).then(postData => {
		req.body = postData;
		// deal with blog router
		const blogResult = handleBlogRouter(req, res);
		if (blogResult) {
			blogResult.then(blogData => {
				if (blogData) {
					if (needSetCookie) {
						res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
					}
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
				if (needSetCookie) {
					res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
				}
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
