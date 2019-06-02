const { loginController } = require('../controller/user');
const { ErrorModel, SuccessModel } = require('../model/resModel');


const handleUserRouter = (req, res) => {

	const { method, path } = req;

	// login
	if (method === 'POST' && path === '/api/user/login') {
		const { username, password } = req.body;
		const result = loginController(username, password);
		return result.then(loginResult => {
			if (loginResult.username) {
				// 设置session
				req.session.username = loginResult.username;
				req.session.realname = loginResult.realname;
				console.log('session', req.session)

				return new SuccessModel(loginResult);
			} else {
				return new ErrorModel("login failed");
			}
		})
	}

	// login check
	if (method === 'GET' && path === '/api/user/login-test') {
		console.log('session', req.session)
		if (req.session.username) {
			return Promise.resolve(new SuccessModel(req.session))
		} else {
			return Promise.resolve(new ErrorModel('error'))
		}
	}



}

module.exports = handleUserRouter;
