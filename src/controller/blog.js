const { execSql } = require('../db/mysql');

const getList = (author, keyword) => {
	// 先返回假数据 || temporarily return mock data
	let sql = `select * from blogs where 1 = 1 `;
	if (author) {
		sql += `and author = '${author}' `;
	}
	if (keyword) {
		sql += `and title like '%${keyword}%' `;
	}
	sql += `order by createtime desc;`;
	return execSql(sql);
};

const getDetail = (id) => {
	let sql = `select * from blogs where id = ${id};`
	return execSql(sql).then(rows => rows[0]);
};

const newBlog = (blogData = {}) => {
	const { title, content, author } = blogData;
	const createtime = Date.now();
	let sql = `
		insert into blogs (title, content, createtime, author)
		values ("${title}","${content}","${createtime}","${author}");`;
		console.log('sql:----', sql);
	// blogData is an object of blog, include content and title
	return execSql(sql).then(insertData => {
		return {
			id: insertData.insertId
		};
	});
};

const updateBlog = (id, blogData = {}) => {
	// update blog based id
	// blogData is an object of blog, include content and title
	const { title, content, author } = blogData;
	let sql = `
		update blogs set title = '${title}', content = '${content}', author = '${author}' where id = ${id} and author = "${author}";`;
	return execSql(sql).then(updateData => {
		if (updateData.affectedRows > 0) {
			return true;
		} else {
			return false;
		}
	});
};

const delBlog = (id, blogData = {}) => {
	const { author } = blogData;
	let sql = `delete from blogs where id = "${id}" and author = "${author}";`;
	return execSql(sql).then(deleData => {
		if (deleData.affectedRows > 0) {
			return true;
		} else {
			return false;
		}
	});
};

module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	delBlog
}
