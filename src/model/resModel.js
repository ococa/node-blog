/**
 * 如果data不是字符串则赋值data和message
 * 如果data是字符串，丢弃message
 */
class BaseModel {
	constructor(data, message) {
		if (typeof data === 'string') {
			this.message = data;
			data = null;
			message = null;
		}
		//
		if (data || data === false) {
			console.log(data);
			this.data = data;
		}
		if (message) {
			this.message = message;
		}
	}
}

class SuccessModel extends BaseModel {
	constructor(data, message) {
		super(data, message);
		this.code = 0;
	}
}

class ErrorModel extends BaseModel {
	constructor(data, message) {
		super(data, message);
		this.errorCode = -1;
	}
}

module.exports = {
	ErrorModel,
	SuccessModel
}
