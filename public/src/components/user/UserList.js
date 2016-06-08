import React from 'react';

export default React.createClass({
	render() {
		const { list } = this.props;
		
		return (
			<div className='users'>
				<ul className='userlist'>
					{
						list.map((item, index) => 
							<li className='item' key={index}>
								<img className='head' src={item.head}/>
								{item.name}
							</li>
						)
					}
				</ul>
			</div>
		);
	}
});