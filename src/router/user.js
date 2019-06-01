const { loginController } = require('../controller/user');
const { ErrorModel, SuccessModel } = require('../model/resModel');

const handleUserRouter = (req, res) => {

	const { method, path } = req;

	// login
	if (method === 'POST' && path === '/api/user/login/') {
		const { username, password } = req.body;
		console.log('hhhh')
		const result = loginController(username, password);
		return result.then(res => {
			if (res.username) {
				return new SuccessModel(res);
			} else {
				return new ErrorModel(res);
			}
		})

	}



}

module.exports = handleUserRouter;
