import React from 'react';

export default React.createClass({
	render() {
		const { name, head } = this.props.myself;

		return (
			<div className='myself-info'>
				<div className='info'>
					<img className='head' src={head} />
					<span className='name'>{name}</span>
				</div>
			</div>
		);
	}
});