import TYPE from '../config/ACTIONTYPE';

export default function (state = {}, action = {}) {
	switch(action.type) {

		case TYPE.USER_JOIN:
			let myself, userlist, obj;
			if(action.isMyself){
				let user = action.user;
				myself = user.myself;
				userlist = user.users;
				obj = {myself, isLogin: true, list: userlist};
			}else{
				userlist = Array.from(state.list);
				userlist.push(action.user);
				obj = {list: userlist};
			} 
			return Object.assign({}, state, obj);

		default:
			return state;
	}
}