import TYPE from '../config/ACTIONTYPE';

export default {
	userJoin(user, isMyself = false) {
		return {
			type: TYPE.USER_JOIN,
			user,
			isMyself
		}
	},
}