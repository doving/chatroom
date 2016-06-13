import TYPE from '../config/ACTIONTYPE';

export default {
	receiveMsg(msgObj) {
		return {
			type: TYPE.RECEIVE_MSG,
			msgObj
		}
	},
}