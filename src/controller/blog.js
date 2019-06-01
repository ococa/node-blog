const getList = (author, keyword) => {
	// 先返回假数据 || temporarily return mock data
	return [
		{
			id: 1,
			title: 'title-a',
			content: 'content-1',
			createTime: 1559369163855,
			author: 'zhangsan'
		},
		{
			id: 2,
			title: 'title-2',
			content: 'content-2',
			createTime: 1559369163855,
			author: 'zhangsan2'
		}
	]
};

const getDetail = () => {
	return {
		id: 2,
		title: 'title-2',
		content: 'content-2',
		createTime: 1559369163855,
		author: 'zhangsan2'
	}
};

const newBlog = (blogData = {}) => {
	// blogData is an object of blog, include content and title
	return {
		id: 3
	}
};

const updateBlog = (id, blogData = {}) => {
	// update blog based id
	// blogData is an object of blog, include content and title
	console.log(id, '\n', blogData)
	return true;
};

const delBlog = (id) => {
	return true;
};

module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	delBlog
}
