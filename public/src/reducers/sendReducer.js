import TYPE        from '../config/ACTIONTYPE';
import INITSTATE   from '../config/INITSTATE';

export default function (state = INITSTATE.send, action = {}) {
	switch(action.type) {
		case TYPE.CHANGE_FAVOR:
			localStorage.setItem('pics', JSON.stringify(action.favor));
			return Object.assign({}, state, {favor: action.favor});

		default:
			return state;
	}
}