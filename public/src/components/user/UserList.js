import React from 'react';

export default React.createClass({
	render() {
		const { myself, list, defaultHead, currentId } = this.props.user;

		let heads = [<img key='0' className='hall-head' src={myself.head}/>];
		let users = [];

		let count = 1;

		list.forEach((item, index) => {
			if(!item.active)return;

			let cls = item.id === currentId ? 'item active' : 'item';

			users.push(
				<li className={cls} key={index}>
					<img className='head' src={item.head || defaultHead}/>
					{item.nickname}
				</li>
			);

			if(count < 9){
				heads.push(
					<img key={count} className='hall-head' src={item.head || defaultHead}/>
				);
			}
			count++;
		});

		let headClass = count > 4 ? 'nine' : count == 4 ? 'four' : count == 3 ? 'three' : 'two';

		let hallClass = currentId === 'HALL' ? 'item hall active' : 'item hall';
		
		return (
			<div className='users'>
				<ul className='userlist'>
					<li className={hallClass}>
						<div className={'head ' + headClass}>{heads}</div>
						大厅（{count}）
					</li>
					{users}
				</ul>
			</div>
		);
	}
});