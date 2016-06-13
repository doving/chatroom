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
				<ul className='chatbox'>
					{
						msgList.map((msg, index) => {
							const userObj = msg.id === myself.id ? myself : user.list.find(o => o.id == msg.id);
							let cls;

							switch(msg.type) {
								case 'msg':
									cls = msg.id === myself.id ? 'myself' : 'other';
									return <li key={index} className={'chatitem ' + cls}>
										<p className='username'>{userObj.nickname}</p>
										<p className='msg' dangerouslySetInnerHTML={{__html: msg.content}} />
									</li>
							}
						})
					}
				</ul>
			</div>
		);
	}
});