const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const {ErrorModel, SuccessModel } = require('../model/resModel');

const handleBlogRouter = (req, res) => {

	const { method,path } = req;
	const id = req.query.id;

	// 获取博客列表
	if (method === 'GET' && path === '/api/blog/list') {
		const {author, keyword} = req.query || '';
		// result is promise object
		const result = getList(author, keyword);

		return result.then(listData => {
			return new SuccessModel(listData);
		})
	}

	// get blog detail
	if (method === 'GET' && path === '/api/blog/detail') {
		const result = getDetail(id);
		return result.then(data => {
			return new SuccessModel(data);
		})
	}

	// create a blog
	if (method === 'POST' && path === '/api/blog/new') {
		req.body.author = 'author_1';	// TODO 假数据，待开发登录功能是改为真
		const blogData = req.body;
		const result = newBlog(blogData);
		return result.then(data => {
			return new SuccessModel(data);
		})
	}


	// update a blog
	if (method === 'POST' && path === '/api/blog/update') {
		req.body.author = 'author_1'; // TODO 假数据，待开发登录功能是改为真
		const result = updateBlog(id, req.body);
		return result.then(res => {
			if (res) {
				return new SuccessModel(res);
			} else {
				return new ErrorModel(res);
			}
		})

	}

	// delete a blog
	if (method === 'POST' && path === '/api/blog/del') {
		req.body.author = 'author_1'; // TODO 假数据，待开发登录功能是改为真

		const result = delBlog(id, req.body);
		return result.then(res => {
			if (res) {
				return new SuccessModel(res);
			} else {
				return new ErrorModel(res);
			}
		})
	}
}
module.exports = handleBlogRouter;
