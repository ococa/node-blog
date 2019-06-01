const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const {ErrorModel, SuccessModel } = require('../model/resModel');

const handleBlogRouter = (req, res) => {

	const { method,path } = req;
	const id = req.query.id;

	// 获取博客列表
	if (method === 'GET' && path === '/api/blog/list') {
		const {author, keyword} = req.query || '';
		const listData = getList(author, keyword);
		return new SuccessModel(listData);
	}

	// get blog detail
	if (method === 'GET' && path === '/api/blog/detail') {
		const data = getDetail(id);
		return new SuccessModel(data)
	}

	// create a blog
	if (method === 'POST' && path === '/api/blog/new') {
		const blogData = req.body;
		const blog = newBlog(blogData);
		return new SuccessModel(blog);
	}


	// update a blog
	if (method === 'POST' && path === '/api/blog/update') {
		const result = updateBlog(id, req.body);
		if (result) {
			return new SuccessModel(result);
		} else {
			return new ErrorModel('update failed');
		}
	}

	// delete a blog
	if (method === 'POST' && path === '/api/blog/del') {
		const result = delBlog(id);
		if (result) {
			return new SuccessModel(result)
		} else {
			return new ErrorModel('delete blog failed');
		}
	}
}
module.exports = handleBlogRouter;
