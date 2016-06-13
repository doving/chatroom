import TYPE      from '../config/ACTIONTYPE';
import INITSTATE from '../config/INITSTATE';

export default function (state = INITSTATE.message, action = {}) {
	let msgs = Object.assign({}, state.list);
	let news = [], msg = [];

	switch(action.type) {
		case TYPE.RECEIVE_MSG:
			let target = action.msgObj.target;
			let msgObj = Object.assign({}, msgs[target] || {news: [], msg: []});

			news = [...msgObj.news];
			msg = [...msgObj.msg];

			if(state.currentId === target){
				msg.push(action.msgObj);
			}else{
				news.push(action.msgObj);
			}
			
			Object.assign(msgObj, {news, msg});

			msgs[target] = msgObj;

			return Object.assign({}, state, {list: msgs});
		default:
			return state;
	}
}