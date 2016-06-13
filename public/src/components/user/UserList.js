import React from 'react';

export default React.createClass({
	render() {
		const { list, defaultHead } = this.props;

		let heads = [], users = [];

		let count = 0;

		list.forEach((item, index) => {
			if(!item.active)return;

			count++;

			users.push(
				<li className='item' key={index}>
					<img className='head' src={item.head || defaultHead}/>
					{item.nickname}
				</li>
			);

			if(index < 9){
				heads.push(
					<img key={index} className='hall-head' src={item.head || defaultHead}/>
				);
			}
		});

		let cls = count > 4 ? 'nine' : count == 4 ? 'four' : count == 3 ? 'three' : 'two';
		
		return (
			<div className='users'>
				<ul className='userlist'>
					<li className={'item hall' + (count > 1 ? '' : ' none')}>
						<div className={'head ' + cls}>{heads}</div>
						大厅（{count}）
					</li>
					{users}
				</ul>
			</div>
		);
	}
});