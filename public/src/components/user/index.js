import React       from 'react';
import MyselfInfo  from './MyselfInfo';
import UserList    from './UserList';

export default React.createClass({
	render() {
		const { user } = this.props; 
		const { myself, list, defaultHead, currentId } = user;

		return (
			<div className='left'>
				<MyselfInfo myself={myself} defaultHead={defaultHead}/>
				<UserList user={user}/>
			</div>
		);
	}
});