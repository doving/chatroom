import React     from 'react';
import actions   from '../../actions';
import isOutSide from '../../util/isOutSide';

export default React.createClass({
	render() {
		const { user, message } = this.props;
		const { currentId, list } = message;
		const myself = user.myself;
		

		let msgList = list[currentId] && list[currentId].msg;
		msgList = msgList || [];

		return (
			<div ref='message' className='message' onContextMenu={this.contextMenu}>
				<p ref='clear' className='clear none' onClick={this.clearHandler}>清屏</p>
				<ul className='chatbox' ref='chatbox'>
					{
						msgList.map((msg, index) => {
							const userObj = msg.id === myself.id ? myself : user.list.find(o => o.id == msg.id);
							let cls, isMyself = msg.id === myself.id;

							switch(msg.type) {
								case 'msg':
									let username = isMyself ?
										<p className='username'>
											<span className="time">({this.timeformat(msg.time)})</span>
											{userObj.nickname}
										</p> :
										<p className='username'>
											{userObj.nickname}
											<span className="time">({this.timeformat(msg.time)})</span>
										</p>;
									cls = isMyself ? 'myself' : 'other';
									return <li key={index} className={'chatitem ' + cls}>
										<img className='head' src={userObj.head} />
										{username}<p style={{clear: 'both'}}></p>
										<p className='msg' dangerouslySetInnerHTML={{__html: msg.content}} />
									</li>
							}
						})
					}
				</ul>
			</div>
		);
	},

	componentDidMount() {
		document.addEventListener('click', e => {
			const clear = this.refs.clear;

			if(isOutSide(e.clientX, e.clientY, clear.getBoundingClientRect())){
				this.refs.clear.classList.add('none');
			}
		});
	},

	contextMenu(e) {
		this.refs.clear.classList.add('none');
		
		const{ message, clear } = this.refs;
		const { top, left } = message.getBoundingClientRect();
		const { clientX: x, clientY: y } = e;

		if(/ul|li/i.test(e.target.tagName)){
			Object.assign(this.refs.clear.style, {
				left: `${x - left}px`,
				top: `${y - top}px`
			});

			clear.classList.remove('none');
			
		}
	},

	clearHandler() {
		this.props.dispatch(actions.clearScreen());
		this.refs.clear.classList.add('none');
	},

	componentDidUpdate() {
		let last = this.refs.chatbox.lastElementChild;
		last && last.scrollIntoView(false);
	},

	timeformat(nums) {
        let d = new Date(nums);
        let m = d.getMonth() + 1;
        let day = d.getDate();
        let h = d.getHours();
        let mi = d.getMinutes();
        let s = d.getSeconds();
        m = m > 9 ? m : '0' + m;
        day = day > 9 ? day : '0' + day;
        h = h > 9 ? h : '0' + h;
        mi = mi > 9 ? mi : '0' + mi;
        s = s > 9 ? s : '0' + s;

        return m + '-' + day + ' ' + h + ':' + mi + ':' + s;
    },
});