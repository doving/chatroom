import React       from 'react';
import Head        from './Head';
import Message     from './Message';
import Send        from './Send';

export default React.createClass({
	render() {
		const { user, message } = this.props;

		return (
			<div className='right'>
				<Head user={user} currentId={message.currentId}/>
				<Message user={user} message={message}/>
				<Send socket={user.socket} currentId={message.currentId} user={user}/>
			</div>
		);
	}
});