import React       from 'react';
import Head        from './Head';
import Message     from './Message';
import Send        from './Send';

export default React.createClass({
	render() {
		const { user, message, send, dispatch } = this.props;

		return (
			<div className='right'>
				<Head user={user} currentId={message.currentId}/>
				<Message user={user} message={message} dispatch={dispatch}/>
				<Send dispatch={dispatch} send={send} currentId={message.currentId} socket={user.socket} myself={user.myself}/>
			</div>
		);
	}
});