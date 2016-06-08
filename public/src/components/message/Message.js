import React from 'react';

export default React.createClass({
	render() {
		const { user, message } = this.props;
		const { currentId, list } = message;
		const myself = user.myself;
		const userObj = user.list.find(o => o.id == currentId);

		let msgList = list[currentId] && list[currentId].msg;
		msgList = msgList || [];

		return (
			<div className='message'>
				<ul className='chatbox'>
					{
						msgList.map(msg => {
							let cls;

							switch(msg.type) {
								case 'msg':
									cls = msg.id === myself.id ? 'other' : 'myself';
									return <li className={'chatitem ' + cls}>
										<p className='username'>{userObj.name}</p>
										<p className='msg'>{msg.content}</p>
									</li>
							}
						})
					}
				</ul>
			</div>
		);
	}
});