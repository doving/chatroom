import { combineReducers } from 'redux';

import user       from './userReducer';
import message    from './messageReducer';
import send       from './sendReducer';

export default combineReducers({
	user,
	message,
	send
})