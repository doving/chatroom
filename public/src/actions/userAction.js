import TYPE from '../config/ACTIONTYPE';

export default {
	initSocket(socket = null){
		return {
			type: TYPE.INIT_SOCKET,
			socket
		}
	},

	userJoin(user, isMyself = false) {
		return {
			type: TYPE.USER_JOIN,
			user,
			isMyself
		}
	},

	userOut(id) {
		return {
			type: TYPE.USER_OUT,
			id
		}
	}
}