const handleUserRouter = (req, res) => {

	const { method,path } = req;

	// 获取博客列表
	if (method === 'POST' && path === '/api/user/login') {
		return {
			msg: 'LOGIN API'
		}
	}

}

module.exports = handleUserRouter;
