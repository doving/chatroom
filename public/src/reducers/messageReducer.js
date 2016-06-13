import TYPE      from '../config/ACTIONTYPE';
import INITSTATE from '../config/INITSTATE';

export default function (state = INITSTATE.message, action = {}) {
	let msgs = Object.assign({}, state.list);
	let news = [], msg = [], msgObj = {};

	switch(action.type) {
		case TYPE.RECEIVE_MSG:
			let owner = action.msgObj[action.msgObj.target === action.myselfId ? 'id' : 'target'];

			msgObj = Object.assign({}, msgs[owner] || {news: [], msg: []});

			news = [...msgObj.news];
			msg = [...msgObj.msg];

			if(state.currentId === owner){
				msg.push(action.msgObj);
			}else{
				news.push(action.msgObj);
			}
			
			Object.assign(msgObj, {news, msg});

			msgs[owner] = msgObj;


			return Object.assign({}, state, {list: msgs});
		
		case TYPE.CHANGE_CURRENT_ID:
			msgObj = Object.assign({}, msgs[action.id] || {news: [], msg: []});

			msg = [...msgObj.msg, ...msgObj.news];

			Object.assign(msgObj, {news: [], msg});
			msgs[action.id] = msgObj;

			return Object.assign({}, state, {list: msgs, currentId: action.id});

		default:
			return state;
	}
}