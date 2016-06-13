import React           from 'react';
import { connect }     from 'react-redux';

import User            from './components/user';
import Message         from './components/message';
import Login           from './components/Login';

import actions         from './actions';

const App =  React.createClass({
	render() {
		const { user, message, send, dispatch } = this.props;

		return(
			this.props.user.isLogin ? 
			<div>
				<div className='main'>
					<User user={user}/>
					<Message user={user} message={message} />
				</div>
			</div>
			:
			<div>
				<Login dispatch={dispatch} socket={user.socket} defaultHead={user.defaultHead}/>
			</div>
		)
	},

	componentWillMount() {
		console.log('1111111111');
		const { dispatch } = this.props;

		let socket = io();

		dispatch(actions.initSocket(socket));

		this.socket = socket;

		socket.on('connect', ()=> {

			socket.on('logined', user => dispatch(actions.userJoin(user, true)));

			socket.on('userJoin', user => this.props.user.isLogin && dispatch(actions.userJoin(user)));

			socket.on('chat', obj => this.props.user.isLogin && dispatch(actions.receiveMsg(obj)));

			socket.on('userOut', id => this.props.user.isLogin && dispatch(actions.userOut(id)));
		})
	}
});

const mapStateToProps = function(state) {
	return state;
}

export default connect(mapStateToProps)(App);