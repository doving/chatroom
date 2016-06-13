import TYPE from '../config/ACTIONTYPE';
import INITSTATE from '../config/INITSTATE';

export default function (state = INITSTATE.user, action = {}) {
	let userlist = [...state.list];

	switch(action.type) {

		case TYPE.USER_JOIN:
			let myself, obj;

			if(action.isMyself){
				let user = action.user;

				myself = user.myself;
				userlist = user.users;
				obj = {myself, isLogin: true, list: userlist};
			}else{
				userlist.push(action.user);
				obj = {list: userlist};
			} 
			return Object.assign({}, state, obj);

		case TYPE.USER_OUT:
			let outIndex = userlist.findIndex(o => o.id == action.id);
			let outUser = Object.assign({active: false}, userlist[outIndex]);

			userlist[outIndex] = outUser;
			return Object.assign({}, {list: userlist});

		case TYPE.INIT_SOCKET:
			return Object.assign({}, state, {socket: action.socket});
		default:
			return state;
	}
}