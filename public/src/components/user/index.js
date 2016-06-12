import React       from 'react';
import MyselfInfo  from './MyselfInfo';
import UserList    from './UserList';

export default React.createClass({
	render() {
		const { myself, list, defaultHead } = this.props.user;

		return (
			<div className='left'>
				<MyselfInfo myself={myself} defaultHead={defaultHead}/>
				<UserList list={list} defaultHead={defaultHead}/>
			</div>
		);
	}
});