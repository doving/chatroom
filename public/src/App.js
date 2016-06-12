import React           from 'react';
import { connect }     from 'react-redux';

import User            from './components/user';
import Message         from './components/message';
import Login           from './components/Login';

const App =  React.createClass({
	render() {
		const { user, message, send, dispatch } = this.props;

		return(
			<div>
				<Login dispatch={dispatch} isLogin={user.isLogin} defaultHead={user.defaultHead}/>
				<div className='main'>
					<User user={user}/>
					<Message user={user} message={message} />
				</div>
			</div>
		)
	}
});

const mapStateToProps = function(state) {
	return state;
}

export default connect(mapStateToProps)(App);