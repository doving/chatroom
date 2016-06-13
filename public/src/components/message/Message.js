import React from 'react';

export default React.createClass({
	render() {
		const { user, message } = this.props;
		const { currentId, list } = message;
		const myself = user.myself;
		

		let msgList = list[currentId] && list[currentId].msg;
		msgList = msgList || [];

		return (
			<div className='message'>
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
										{username}
										<p className='msg' dangerouslySetInnerHTML={{__html: msg.content}} />
									</li>
							}
						})
					}
				</ul>
			</div>
		);
	},

	componentDidUpdate() {
		this.refs.chatbox.lastElementChild.scrollIntoView(false);
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