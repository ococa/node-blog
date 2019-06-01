const loginController = (username, password) => {
	console.log(username, password)
	if (username === 'name' && password === 'false' ) {
		return false;
	}
	return true;
}

module.exports = {
	loginController,
}
