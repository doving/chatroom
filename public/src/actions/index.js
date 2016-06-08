import userAction       from './userAction';
import messageAction    from './messageAction';
import sendAction       from './sendAction';

export default Object.freeze(Object.assign(
	{},
	userAction,
	messageAction,
	sendAction
));