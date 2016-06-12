import React from 'react';

export default React.createClass({
	render() {
		const { list, defaultHead } = this.props;

		let heads = [], users = [];

		const len = list.length;

		list.forEach((item, index) => {
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

		let cls = len > 4 ? 'nine' : len == 4 ? 'four' : len == 3 ? 'three' : 'two';
		
		return (
			<div className='users'>
				<ul className='userlist'>
					<li className={'item hall' + (len > 1 ? '' : ' none')}>
						<div className={'head ' + cls}>{heads}</div>
						大厅（{len}）
					</li>
					{users}
				</ul>
			</div>
		);
	}
});