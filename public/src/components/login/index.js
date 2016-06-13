import React       from 'react';
import actions     from '../../actions';

export default React.createClass({
	socket: null,
	getInitialState() {
		return {
			head: this.props.defaultHead,
			placeholder: '请输入昵称',
			conflict: false
		}
	},

	render() {
		const { isLogin } = this.props;
		return (
			<div className={isLogin ? 'none' : 'login'}>
				<div className='upload'>
					<input className='none' ref='upload' type='file' accept='image/*;capture=camera' onChange={this.uploadHandler}/>
					<img className='head' src={this.state.head} onClick={e => this.refs.upload.click()} title='上传头像' />
				</div>
				<div className='shade-input'>
					<input ref='nickname' className={'inputname' + (this.state.conflict ? ' conflict' : '')} 
					maxLength='20' placeholder={this.state.placeholder} onKeyDown={this.keyDownHandler}/>
					<button className='confirm' onClick={this.loginHandler}>确定</button>
				</div>
			</div>
		);
	},

	componentDidMount() {
		const { dispatch } = this.props;

		let socket = io();

		dispatch(actions.initSocket(socket));

		this.socket = socket;

		socket.on('connect', ()=> {

			socket.on('logined', user => dispatch(actions.userJoin(user, true)));

			socket.on('userJoin', user => this.props.isLogin && dispatch(actions.userJoin(user)));

			socket.on('conflict', nickname => {
				if(!this.props.isLogin)return;

				this.setState({placeholder: '该用户名已被占用', conflict: true});
				this.refs.nickname.value = '';
			})

			socket.on('chat', obj => this.props.isLogin && dispatch(actions.receiveMsg(obj)));

			socket.on('userOut', id => this.props.isLogin && dispatch(actions.userOut(id)));
		})
	},

	keyDownHandler(e) {
		if(e.keyCode === 13){
			this.loginHandler();
		}
	},

	uploadHandler(e) {
		let file = e.target.files[0];
		if(!file)return;
		let unit = 40;
		let img = document.createElement('img');

		img.src = URL.createObjectURL(file);
		img.onload = () => {
			let can = document.createElement('canvas');
			can.height = can.width = unit;

			let ctx = can.getContext('2d');

			ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, unit, unit);
			let url = can.toDataURL('image/jpeg', 0.6);

			this.setState({head: url});
			URL.revokeObjectURL(img.src);
		}
		
	},

	loginHandler() {
		let nickname = this.refs.nickname.value.trim();
		let head = this.state.head;

		nickname ? this.socket.emit('login', {nickname, head}) : this.refs.nickname.focus();
	}
});