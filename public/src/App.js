import React           from 'react';
import { connect }     from 'react-redux';

import User            from './components/user';
import Message         from './components/message';
import Login           from './components/Login';
import HeartDialog     from './components/HeartDialog';

import actions         from './actions';

const App =  React.createClass({
	render() {
		const { user, message, send, dispatch } = this.props;

		return(
			<div>
				<HeartDialog favor={send.favor} dispatch={dispatch} />
				{	
					this.props.user.isLogin ?
					<div className='main'>
						<User user={user} message={message} dispatch={dispatch}/>
						<Message dispatch={dispatch} user={user} message={message} send={send} />
					</div> :
					<Login dispatch={dispatch} socket={user.socket} defaultHead={user.defaultHead}/>
				}
			</div>
		)
	},

	componentWillMount() {
		const { dispatch } = this.props;

		let socket = io();

		dispatch(actions.initSocket(socket));

		this.socket = socket;

		socket.on('connect', ()=> {

			socket.on('logined', user => dispatch(actions.userJoin(user, true)));

			socket.on('userJoin', user => this.props.user.isLogin && dispatch(actions.userJoin(user)));

			socket.on('chat', obj => this.props.user.isLogin && dispatch(actions.receiveMsg(obj, this.props.user.myself.id)));

			socket.on('userOut', id => {
				this.props.user.isLogin && dispatch(actions.userOut(id));
				id === this.props.message.currentId && dispatch(actions.changeCurrentId('HALL'));
			});
		})
	}

});

const mapStateToProps = function(state) {
	return state;
}

export default connect(mapStateToProps)(App);