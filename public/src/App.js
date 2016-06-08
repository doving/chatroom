import React        from 'react';
import { connect }  from 'react-redux';

import User            from './components/user';
import Message         from './components/message';
import Send            from './components/send';

const App =  React.createClass({
	render() {
		const { user, message, send } = this.props;

		return(
			<div>
				<User user={user}/>
				<Message user={user} message={message}>
					<Send />
				</Message>
			</div>
		)
	}
});

const mapStateToProps = function(state) {
	return state;
}

export default connect(mapStateToProps)(App);