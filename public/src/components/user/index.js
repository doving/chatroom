import React       from 'react';
import MyselfInfo  from './MyselfInfo';
import UserList    from './UserList';

export default React.createClass({
	render() {
		const { myself, list } = this.props.user;

		return (
			<div className='left'>
				<MyselfInfo myself={myself}/>
				<UserList list={list}/>
			</div>
		);
	}
});