const handleBlogRouter = (req, res) => {

	const { method,path } = req;

	// 获取博客列表
	if (method === 'GET' && path === '/api/blog/list') {
		return {
			msg: 'get blog list api'
		}
	}

	// get blog detail
	if (method === 'GET' && path === '/api/blog/detail') {
		return {
			msg: 'get blog detail api'
		}
	}

	// create a blog
	if (method === 'POST' && path === '/api/blog/new') {
		return {
			msg: 'create blog detail api'
		}
	}

	// delete a blog
	if (method === 'POST' && path === '/api/blog/del') {
		return {
			msg: 'del blog detail api'
		}
	}
}
module.exports = handleBlogRouter;
