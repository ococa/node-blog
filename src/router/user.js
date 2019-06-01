const { loginController } = require('../controller/user');
const { ErrorModel, SuccessModel } = require('../model/resModel');

const handleUserRouter = (req, res) => {

	const { method, path } = req;

	// login
	if (method === 'POST' && path === '/api/user/login') {
		const { username, password } = req.body;

		const result = loginController(username, password);
		if (result) {
			return new SuccessModel(result);
		} else {
			return new ErrorModel('login failed');
		}
	}

}

module.exports = handleUserRouter;
