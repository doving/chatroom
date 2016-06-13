import React       from 'react';
import MyselfInfo  from './MyselfInfo';
import UserList    from './UserList';

export default React.createClass({
	render() {
		const { user, message, dispatch } = this.props; 
		const { myself, list, defaultHead } = user;

		return (
			<div className='left'>
				<MyselfInfo myself={myself} defaultHead={defaultHead}/>
				<UserList user={user} message={message} dispatch={dispatch}/>
			</div>
		);
	}
});