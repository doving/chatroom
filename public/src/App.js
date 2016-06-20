import React           from 'react';
import { connect }     from 'react-redux';

import User            from './components/user';
import Message         from './components/message';
import Login           from './components/Login';
import HeartDialog     from './components/HeartDialog';

import ForkMe          from './components/ForkMe';

import actions         from './actions';

const App =  React.createClass({
	render() {
		const { user, message, send, dispatch } = this.props;

		return(
			<div>
				<ForkMe />
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

	componentDidMount() {
		const { dispatch } = this.props;

		let socket = io();

		dispatch(actions.initSocket(socket));

		this.socket = socket;

		socket.on('connect', ()=> {

			socket.on('logined', user => dispatch(actions.userJoin(user, true)));

			socket.on('userJoin', userObj => {
				const { user } = this.props;

				if(user.isLogin){
					dispatch(actions.userJoin(userObj));

					this.showTip(`${userObj.nickname} 加入群聊`);
				}
			});

			socket.on('chat', obj => {
				const { user } = this.props;

				const { myself, list } = user;

				if(user.isLogin){
					let o =list.find(u => u.id === obj.id);

					dispatch(actions.receiveMsg(obj, myself.id));

					document.hidden && Notification && Notification.requestPermission(permission => {
						if(permission == 'granted'){
							let notification = new Notification(
								obj.target == 'HALL' ? `大厅-${o.nickname}` : o.nickname ,
								{
									icon: o.head,
									body: obj.content,
									tag: obj.target
								});

							notification.addEventListener('click', e => {
								window.focus();
								dispatch(actions.changeCurrentId(obj.target === myself.id ? obj.id : obj.target));
								notification.close();
							});
						}
					});
				}
			});

			socket.on('userOut', id => {
				const { user } = this.props;

				if(user.isLogin){
					dispatch(actions.userOut(id));

					id === this.props.message.currentId && dispatch(actions.changeCurrentId('HALL'));

					this.showTip(`${user.list.find(u => u.id == id).nickname} 退出群聊`);
				}
			});
		})

		document.addEventListener('touchmove', e => {
			//e.preventDefault();
		});
	},

	showTip(content) {
		const { dispatch, user } = this.props;

		dispatch(actions.receiveMsg({
			type: 'tip',
			content: content,
			id: user.myself.id,
			target: 'HALL'
		}));
	}

});

const mapStateToProps = function(state) {
	return state;
}

export default connect(mapStateToProps)(App);